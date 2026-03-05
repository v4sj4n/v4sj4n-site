import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { NOTION_SECRET, NOTION_DB_ID } from "astro:env/server";
import { Client } from "@notionhq/client";
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
                const notion = new Client({ auth: NOTION_SECRET });
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
