"use client";

import { NextIntlClientProvider } from "next-intl";

type Props = {
	locale: string;
	messages: Record<string, unknown>;
	timeZone: string;
	children: React.ReactNode;
};

export function LocaleProvider({
	locale,
	messages,
	timeZone,
	children,
}: Props) {
	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages}
			timeZone={timeZone}
		>
			{children}
		</NextIntlClientProvider>
	);
}
