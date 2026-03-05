import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { actions } from "astro:actions";

const ease = [0.32, 0.72, 0, 1] as const;

export default function ContactForm() {
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };

        try {
            const { data: resData, error } = await actions.contact(data);

            if (error) {
                console.error("Action error:", error);
                throw new Error("Failed");
            }

            setStatus("success");
            (e.target as HTMLFormElement).reset();

            // Reset status after a few seconds
            setTimeout(() => setStatus("idle"), 3000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <div className="relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/50 p-8 md:p-10">
            <div className="mb-10">
                <p className="text-lg font-medium mb-2">Send a message</p>
                <p className="text-sm text-neutral-400 dark:text-neutral-500">
                    I&apos;ll get back to you within 24 hours.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {[
                    {
                        label: "Name",
                        name: "name",
                        type: "text",
                        placeholder: "Your name",
                    },
                    {
                        label: "Email",
                        name: "email",
                        type: "email",
                        placeholder: "your@email.com",
                    },
                ].map((field, i) => (
                    <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.08 }}
                        className="group"
                    >
                        <label className="text-[11px] font-mono uppercase tracking-[0.15em] block mb-2 text-neutral-400 dark:text-neutral-500 group-focus-within:text-primary transition-colors duration-300">
                            {field.label}
                        </label>
                        <input
                            name={field.name}
                            type={field.type}
                            required
                            className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-700 py-3 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors duration-300 text-sm placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                            placeholder={field.placeholder}
                        />
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.46 }}
                    className="group"
                >
                    <label className="text-[11px] font-mono uppercase tracking-[0.15em] block mb-2 text-neutral-400 dark:text-neutral-500 group-focus-within:text-primary transition-colors duration-300">
                        Message
                    </label>
                    <textarea
                        name="message"
                        rows={4}
                        required
                        className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-700 py-3 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors duration-300 resize-none text-sm placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                        placeholder="Tell me about your project..."
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.54 }}
                >
                    <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="group w-full py-4 mt-4 flex justify-center items-center gap-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-xl text-[13px] font-semibold tracking-wide hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-500 disabled:opacity-60"
                    >
                        {status === "submitting"
                            ? "Sending..."
                            : status === "success"
                                ? "Message Sent ✓"
                                : status === "error"
                                    ? "Failed — Try Again"
                                    : "Send Message"}
                        {status === "idle" && (
                            <Send
                                size={14}
                                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                            />
                        )}
                    </motion.button>
                </motion.div>
            </form>
        </div>
    );
}
