export interface ContactEnv {
	TURNSTILE_SECRET_KEY?: string;
	CLOUDFLARE_SECRET?: string;
	NOTION_SECRET?: string;
	NOTION_DB_ID?: string;
	CONTACT_EMAIL?: string;
	ALLOWED_ORIGIN?: string;
}

function resolveEnv(env: ContactEnv) {
	return {
		turnstileSecret: env.TURNSTILE_SECRET_KEY ?? env.CLOUDFLARE_SECRET ?? "",
		notionSecret: env.NOTION_SECRET ?? "",
		notionDbId: env.NOTION_DB_ID ?? "",
		contactEmail: env.CONTACT_EMAIL,
		allowedOrigin: env.ALLOWED_ORIGIN,
	};
}

type ContactPayload = {
	name?: string;
	email?: string;
	message?: string;
	consent?: boolean;
	token?: string;
};

type TurnstileVerifyResponse = {
	success: boolean;
	"error-codes"?: string[];
};

function corsHeaders(origin: string | null, env: ContactEnv): HeadersInit {
	const allowed = env.ALLOWED_ORIGIN ?? origin ?? "*";
	return {
		"Access-Control-Allow-Origin": allowed,
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": "86400",
		Vary: "Origin",
	};
}

function jsonResponse(
	body: unknown,
	status: number,
	origin: string | null,
	env: ContactEnv,
): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			...corsHeaders(origin, env),
		},
	});
}

async function verifyTurnstile(
	token: string,
	remoteip: string | null,
	secret: string,
): Promise<TurnstileVerifyResponse> {
	const form = new URLSearchParams();
	form.set("secret", secret);
	form.set("response", token);
	if (remoteip) {
		form.set("remoteip", remoteip);
	}

	const response = await fetch(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: form.toString(),
		},
	);

	return (await response.json()) as TurnstileVerifyResponse;
}

async function sendContactEmail(
	resolved: ReturnType<typeof resolveEnv>,
	{ name, email, message }: { name: string; email: string; message: string },
): Promise<Response | null> {
	if (!resolved.contactEmail) {
		return null;
	}

	return fetch("https://api.mailchannels.net/tx/v1/send", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			personalizations: [{ to: [{ email: resolved.contactEmail }] }],
			from: {
				email: "noreply@v4sj4n.com",
				name: "v4sj4n.com Contact Form",
			},
			reply_to: { email, name },
			subject: `New contact form message from ${name}`,
			content: [
				{
					type: "text/plain",
					value: `Name: ${name}\nEmail: ${email}\n\n${message}`,
				},
			],
		}),
	});
}

function notionRichText(content: string) {
	const chunks: { text: { content: string } }[] = [];
	for (let i = 0; i < content.length; i += 2000) {
		chunks.push({ text: { content: content.slice(i, i + 2000) } });
	}
	return chunks.length > 0 ? chunks : [{ text: { content: "" } }];
}

async function saveToNotion(
	resolved: ReturnType<typeof resolveEnv>,
	{ name, email, message }: { name: string; email: string; message: string },
): Promise<Response> {
	return fetch("https://api.notion.com/v1/pages", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${resolved.notionSecret}`,
			"Notion-Version": "2022-06-28",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			parent: { database_id: resolved.notionDbId },
			properties: {
				Name: {
					title: [{ text: { content: name.slice(0, 2000) } }],
				},
				Email: {
					email,
				},
				Message: {
					rich_text: notionRichText(message),
				},
			},
		}),
	});
}

export function handleContactOptions(
	request: Request,
	env: ContactEnv,
): Response {
	return new Response(null, {
		status: 204,
		headers: corsHeaders(request.headers.get("Origin"), env),
	});
}

export async function handleContactPost(
	request: Request,
	env: ContactEnv,
): Promise<Response> {
	const origin = request.headers.get("Origin");
	const resolved = resolveEnv(env);

	if (!resolved.turnstileSecret || !resolved.notionSecret || !resolved.notionDbId) {
		return jsonResponse(
			{ ok: false, error: "server_misconfigured" },
			500,
			origin,
			env,
		);
	}

	let payload: ContactPayload;
	try {
		payload = (await request.json()) as ContactPayload;
	} catch {
		return jsonResponse({ ok: false, error: "invalid_json" }, 400, origin, env);
	}

	const name = payload.name?.trim() ?? "";
	const email = payload.email?.trim() ?? "";
	const message = payload.message?.trim() ?? "";
	const token = payload.token?.trim() ?? "";

	if (!name || !email || !message) {
		return jsonResponse(
			{ ok: false, error: "missing_fields" },
			400,
			origin,
			env,
		);
	}

	if (!payload.consent) {
		return jsonResponse(
			{ ok: false, error: "consent_required" },
			400,
			origin,
			env,
		);
	}

	if (!token) {
		return jsonResponse(
			{ ok: false, error: "turnstile_required" },
			400,
			origin,
			env,
		);
	}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		return jsonResponse(
			{ ok: false, error: "invalid_email" },
			400,
			origin,
			env,
		);
	}

	const turnstile = await verifyTurnstile(
		token,
		request.headers.get("CF-Connecting-IP"),
		resolved.turnstileSecret,
	);

	if (!turnstile.success) {
		return jsonResponse(
			{
				ok: false,
				error: "turnstile_failed",
				codes: turnstile["error-codes"] ?? [],
			},
			403,
			origin,
			env,
		);
	}

	const notionResponse = await saveToNotion(resolved, { name, email, message });
	if (!notionResponse.ok) {
		return jsonResponse(
			{ ok: false, error: "delivery_failed" },
			502,
			origin,
			env,
		);
	}

	const mailResponse = await sendContactEmail(resolved, { name, email, message });
	if (mailResponse && !mailResponse.ok) {
		return jsonResponse(
			{ ok: false, error: "delivery_failed" },
			502,
			origin,
			env,
		);
	}

	return jsonResponse({ ok: true }, 200, origin, env);
}
