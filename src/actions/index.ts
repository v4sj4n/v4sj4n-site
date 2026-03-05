import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { notion } from "@/lib/notion";

export const server = {
    contact: defineAction({
        accept: "json",
        input: z.object({
            name: z.string().min(1),
            email: z.string().email(),
            message: z.string().min(1),
        }),
        handler: async (input) => {
            try {
                await notion.pages.create({
                    parent: {
                        database_id: import.meta.env.NOTION_DB_ID,
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
            } catch (error) {
                console.error("Action error:", error);
                throw new ActionError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to submit message",
                });
            }
        },
    }),
};
