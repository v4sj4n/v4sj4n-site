import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import {
	NOTION_SECRET,
	NOTION_DB_ID,
	CLOUDFLARE_SECRET,
} from "astro:env/server";
import { Client } from "@notionhq/client";
export const server = {
	contact: defineAction({
		accept: "form",
		input: z.object({
			name: z.string().min(1),
			email: z.string().email(),
			message: z.string().min(1),
			"cf-turnstile-response": z.string().min(1),
		}),
		handler: async (input) => {
			try {
				// Verify Turnstile Token
				const turnstileRes = await fetch(
					"https://challenges.cloudflare.com/turnstile/v0/siteverify",
					{
						method: "POST",
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
						body: `secret=${encodeURIComponent(CLOUDFLARE_SECRET)}&response=${encodeURIComponent(input["cf-turnstile-response"])}`,
					},
				);

				const turnstileOutcome = await turnstileRes.json();

				if (!turnstileOutcome.success) {
					throw new Error("Captcha verification failed.");
				}
				const notion = new Client({
					auth: NOTION_SECRET,
					fetch: (url, init) => fetch(url, init as RequestInit),
				});
				await notion.pages.create({
					parent: {
						database_id: NOTION_DB_ID,
					},
					properties: {
						Name: {
							title: [
								{
									text: { content: input.name },
								},
							],
						},
						Email: {
							email: input.email,
						},
						Message: {
							rich_text: [
								{
									text: { content: input.message },
								},
							],
						},
					},
				});

				return { success: true };
			} catch (error: any) {
				console.error("Action error:", error);
				return { success: false, error: error.message || "Submit failed" };
			}
		},
	}),
};
