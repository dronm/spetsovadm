import { createI18n } from 'vue-i18n';

import ru from './locales/ru.json'; //common json
import ruUILib from './lib/locales/ru.json'; //UI library

const i18n = createI18n({
	locale: 'ru',
	fallbackLocale: 'ru',
	messages: {
		ru: {
			...ru,
			...ruUILib,
		},
	},
});

export default i18n;
