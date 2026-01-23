// app/actions/contact.ts
"use server";

import { notion } from "@/lib/notion";

export async function submitContact(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        throw new Error("Missing fields");
    }

    await notion.pages.create({
        parent: {
            database_id: process.env.NEXT_PUBLIC_NOTION_DB_ID!,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: { content: name },
                    },
                ],
            },
            Email: {
                email: email,
            },
            Message: {
                rich_text: [
                    {
                        text: { content: message },
                    },
                ],
            },
        },
    });
}
