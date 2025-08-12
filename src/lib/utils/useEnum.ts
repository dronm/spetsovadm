import { Locale } from "../types/locale";
import { Enum } from "../types/enum";

//returns enum with values for a given locale.
export function transformEnumToLocale(enumObj: Enum, locale: Locale): Record<string, string> {
	return Object.entries(enumObj).reduce(
		(acc, [key, value]) => {
			acc[key] = value[locale] || "";
			return acc;
		},
		{} as Record<string, string>,
	);
}
