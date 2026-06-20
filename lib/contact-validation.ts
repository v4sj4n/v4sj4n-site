export const CONTACT_VALIDATION = {
	MIN_NAME_LENGTH: 2,
	MIN_MESSAGE_WORDS: 4,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactValidationError =
	| "missing_fields"
	| "invalid_name"
	| "invalid_email"
	| "message_too_short";

export function countWords(text: string): number {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

export function validateContactInput({
	name,
	email,
	message,
}: {
	name: string;
	email: string;
	message: string;
}): ContactValidationError | null {
	const trimmedName = name.trim();
	const trimmedEmail = email.trim();
	const trimmedMessage = message.trim();

	if (!trimmedName || !trimmedEmail || !trimmedMessage) {
		return "missing_fields";
	}

	if (trimmedName.length < CONTACT_VALIDATION.MIN_NAME_LENGTH) {
		return "invalid_name";
	}

	if (!EMAIL_PATTERN.test(trimmedEmail)) {
		return "invalid_email";
	}

	if (countWords(trimmedMessage) < CONTACT_VALIDATION.MIN_MESSAGE_WORDS) {
		return "message_too_short";
	}

	return null;
}
