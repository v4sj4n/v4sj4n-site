import {
	type ContactEnv,
	handleContactOptions,
	handleContactPost,
} from "../../lib/contact-handler";

export const onRequestOptions: PagesFunction<ContactEnv> = async ({
	request,
	env,
}) => handleContactOptions(request, env);

export const onRequestPost: PagesFunction<ContactEnv> = async ({
	request,
	env,
}) => handleContactPost(request, env);
