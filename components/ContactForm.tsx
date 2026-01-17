"use client"
import { Send } from 'lucide-react';

const borderColor = "border-neutral-950 dark:border-white";

export default function ContactForm() {
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="mb-12">
                <p className="text-xl font-medium max-w-xs">
                    Have a project in mind? <br />
                    Let's build something <span className="italic font-serif">timeless</span>.
                </p>
            </div>

            <form className="space-y-8">
                <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest block opacity-50">Name</label>
                    <div className="relative group">
                        <input
                            type="text"
                            className={`peer w-full bg-transparent border-b ${borderColor} py-2 focus:outline-none rounded-none placeholder:opacity-20`}
                            placeholder="YOUR NAME"
                        />
                        <span className="absolute bottom-0 left-0 h-px w-0 bg-red-600 transition-all duration-300 ease-out peer-focus:w-full" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest block opacity-50">Email</label>
                    <div className="relative group">
                        <input
                            type="email"
                            className={`peer w-full bg-transparent border-b ${borderColor} py-2 focus:outline-none rounded-none placeholder:opacity-20`}
                            placeholder="EMAIL ADDRESS"
                        />
                        <span className="absolute bottom-0 left-0 h-px w-0 bg-red-600 transition-all duration-300 ease-out peer-focus:w-full" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest block opacity-50">Message</label>
                    <div className="relative">
                        <textarea
                            rows={4}
                            className={`peer w-full bg-transparent border-b ${borderColor} py-2 focus:outline-none rounded-none placeholder:opacity-20 resize-none block`}
                            placeholder="HOW CAN I HELP?"
                        />
                        <span className="absolute bottom-0 left-0 h-px w-0 bg-red-600 transition-all duration-300 ease-out peer-focus:w-full" />
                    </div>
                </div>

                <button className={`group w-full py-4 mt-8 flex justify-between items-center border ${borderColor}  px-4 hover:bg-white hover:text-red-600 hover:border-transparent transition-all`}>
                    <span className="text-sm font-bold uppercase tracking-widest">Send Message</span>
                    <Send size={16} className="transform group-hover:scale-125 transition-transform" />
                </button>
            </form>
        </div>
    );
}
