import type { I18n, Composer } from "vue-i18n";

let i18nInstance: I18n | null = null;

export function setI18n(instance: I18n) {
	i18nInstance = instance;
}

export function t(key: string, params: Record<string, any> = {}): string {
	if (!i18nInstance) {
		console.warn("[Library] i18n instance is not set. Returning the key.");
		return key;
	}

	// ✅ Cast global to Composer type
	const composer = i18nInstance.global as Composer;
	return composer.t(key, params);
}

