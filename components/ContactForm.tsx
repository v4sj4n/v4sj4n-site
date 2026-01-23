"use client";

import { Send } from "lucide-react";
import { submitContact } from "@/app/actions/contact";

const borderColor = "border-neutral-950 dark:border-white";

export default function ContactForm() {
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="mb-12">
                <p className="text-xl font-medium max-w-xs">
                    Have a project in mind? <br />
                    Let's build something{" "}
                    <span className="italic font-serif">timeless</span>.
                </p>
            </div>

            <form
                action={submitContact}
                className="space-y-8"
            >
                <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest block opacity-50">
                        Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        required
                        className={`w-full bg-transparent border-b ${borderColor} py-2 focus:outline-none`}
                        placeholder="YOUR NAME"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest block opacity-50">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        required
                        className={`w-full bg-transparent border-b ${borderColor} py-2 focus:outline-none`}
                        placeholder="EMAIL ADDRESS"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest block opacity-50">
                        Message
                    </label>
                    <textarea
                        name="message"
                        rows={4}
                        required
                        className={`w-full bg-transparent border-b ${borderColor} py-2 focus:outline-none resize-none`}
                        placeholder="HOW CAN I HELP?"
                    />
                </div>

                <button
                    type="submit"
                    className={`group w-full py-4 mt-8 flex justify-between items-center border ${borderColor} px-4 hover:bg-white hover:text-red-600 hover:border-transparent transition-all`}
                >
                    <span className="text-sm font-bold uppercase tracking-widest">
                        Send Message
                    </span>
                    <Send size={16} className="group-hover:scale-125 transition-transform" />
                </button>
            </form>
        </div>
    );
}
