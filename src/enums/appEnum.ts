import { type Enum } from '../lib/types/enum';

import { localesEnum } from './locales';
import { notif_providersEnum } from './notif_providers';
import { notif_typesEnum } from './notif_types';
import { role_typesEnum } from './role_types';
import type { Locale } from '@/lib/types/locale';

export const appEnums = <Record<string, Enum>>{
	locales: localesEnum,
	role_types: role_typesEnum,
	notif_prvoders: notif_providersEnum,
	notif_types: notif_typesEnum,
};

export const enumDescriptions = (
	enumId: string,
	locale: Locale,
): Record<string, string> => {
	const enumData = appEnums[enumId];
	if (!enumData) {
		throw new Error(`Enum ID "${enumId}" not found`);
	}

	return Object.keys(enumData).reduce(
		(acc, key) => {
			acc[key] = enumData[key][locale] || '';
			return acc;
		},
		{} as Record<string, string>,
	);
};
