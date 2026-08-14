import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const contactWorkerDevUrl =
	process.env.CONTACT_WORKER_DEV_URL ?? "http://127.0.0.1:8787";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	...(isDev
		? {
				async rewrites() {
					return [
						{
							source: "/api/contact",
							destination: `${contactWorkerDevUrl}/api/contact`,
						},
					];
				},
			}
		: {}),
};

export default withNextIntl(nextConfig);
