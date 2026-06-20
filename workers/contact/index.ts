import {
	handleContactOptions,
	handleContactPost,
	type ContactEnv,
} from "../../lib/contact-handler";

export default {
	async fetch(request: Request, env: ContactEnv): Promise<Response> {
		const { pathname } = new URL(request.url);

		if (pathname !== "/api/contact" && pathname !== "/api/contact/") {
			return new Response("Not found", { status: 404 });
		}

		if (request.method === "OPTIONS") {
			return handleContactOptions(request, env);
		}

		if (request.method === "POST") {
			return handleContactPost(request, env);
		}

		return new Response("Method not allowed", { status: 405 });
	},
} satisfies ExportedHandler<ContactEnv>;
