"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteInfo } from "@/lib/info";

interface ContactLink {
	title: string;
	href: string;
	description: string;
	icon: React.ComponentType<{ size: number; className?: string }>;
}

function ContactLinkCard({ link }: { link: ContactLink }) {
	const Icon = link.icon;

	return (
		<Link
			href={link.href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex flex-col justify-between rounded-lg border bg-card 
                 p-6 transition-all duration-300 ease-in-out
                 hover:bg-accent hover:shadow-lg"
		>
			<div>
				<div className="flex items-center justify-between">
					<h4 className="text-2xl font-bold">{link.title}</h4>
					<Icon
						size={32}
						className="text-muted-foreground group-hover:text-foreground"
					/>
				</div>
				<p className="mt-3 text-balance text-muted-foreground">
					{link.description}
				</p>
			</div>
			<div className="mt-4 flex justify-end">
				<ArrowUpRightIcon
					size={24}
					className="text-muted-foreground transition-transform duration-300 
                     group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground"
				/>
			</div>
		</Link>
	);
}

export default function ContactPage() {
	return (
		<main className="mt-8 lg:mt-20 py-4 md:py-8">
			<h3 className="mb-8 text-2xl font-bold">contact.</h3>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
				<div className="lg:col-span-3">
					<h4 className="mb-6 text-xl font-semibold">Get in touch directly</h4>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						{siteInfo.contactLinks.map((link) => (
							<ContactLinkCard key={link.href} link={link} />
						))}
					</div>
				</div>

				<div className="lg:col-span-2">
					<h4 className="mb-6 text-xl font-semibold">Or fill out this form</h4>
					<div className="rounded-lg border bg-card p-6 md:p-8">
						<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Your Name" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="your.email@example.com"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="message">Message</Label>
								<Textarea
									id="message"
									placeholder="Hi Vasjan, let's talk about..."
								/>
							</div>

							<Button type="submit" className="w-full">
								Send Message
							</Button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
