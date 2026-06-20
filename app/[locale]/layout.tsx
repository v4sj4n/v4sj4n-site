import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getMessages, getTimeZone, setRequestLocale } from "next-intl/server";
import { LocaleProvider } from "@/components/LocaleProvider";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { routing } from "@/i18n/routing";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();
	const timeZone = await getTimeZone();

	return (
		<LocaleProvider locale={locale} messages={messages} timeZone={timeZone}>
			<SetHtmlLang locale={locale} />
			{children}
		</LocaleProvider>
	);
}
