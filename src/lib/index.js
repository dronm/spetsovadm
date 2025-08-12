import { setI18n } from "./i18n";

export default {
	install(app, options = {}) {
		if (options.i18n) {
			setI18n(options.i18n); // Store the user-provided i18n instance
		}
	},
};
