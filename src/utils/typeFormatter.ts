import i18n from '@/i18n';

import type { FormDataValue } from '@/lib/types/form';
import { LOCALE, CURRENCY } from '@/config/constants';
import { appEnums } from '@/enums/appEnum';
import { ControlType, type TypeFormatter } from '@/lib/types/controlTypes';
import type {
	FormatControlTypeOpts,
	FormatNumOpts,
	FormatCurrencyOpts,
	FormatTextOpts,
	FormatTelOpts,
	FormatCheckOpts,
	FormatRefOpts,
	FormatDateOpts,
	FormatAppEnumOpts,
} from '@/lib/types/controlTypes';

export const typeFormatter: TypeFormatter = (
	val: FormDataValue,
	controlType: ControlType,
	controlTypeOpts?: FormatControlTypeOpts | undefined,
): string => {
	let result = '';
	if (val === undefined || val === null) {
		return result;
	}
	switch (controlType) {
		case ControlType.text:
			if (typeof val !== 'string') {
				val = val.toString();
			}
			result = formatText(val, controlTypeOpts as FormatTextOpts);
			break;

		case ControlType.tel:
			if (typeof val !== 'string') {
				val = val.toString();
			}
			result = formatTel(val, controlTypeOpts as FormatTelOpts);
			break;

		case ControlType.num:
			if (typeof val !== 'string' && typeof val !== 'number') {
				val = val.toString();
			}
			const tOpts = controlTypeOpts as FormatNumOpts;
			result =
				!tOpts || !tOpts.precision
					? formatInt(val, tOpts)
					: formatFloat(val, tOpts);
			break;

		case ControlType.currency:
			if (typeof val !== 'string' && typeof val !== 'number') {
				val = val.toString();
			}
			result = formatCurrency(val, controlTypeOpts as FormatCurrencyOpts);
			break;

		case ControlType.date:
			if (typeof val !== 'string' && !(val instanceof Date)) {
				val = val.toString();
			}
			result = formatDate(val, controlTypeOpts as FormatDateOpts);
			break;

		case ControlType.check:
			result = formatBool(
				val.toString(),
				controlTypeOpts as FormatCheckOpts,
			);
			break;

		case ControlType.appEnum:
			result = formatAppEnum(
				val.toString(),
				controlTypeOpts as FormatAppEnumOpts,
			);
			break;

		case ControlType.ref:
			result = formatRef(val, controlTypeOpts as FormatRefOpts);
			break;

		default:
			result = val.toString();
			break;
	}

	return result;
};

export const formatInt = (
	val: string | number,
	opts?: FormatNumOpts,
): string => {
	if (typeof val === 'string') {
		val = Number.parseInt(val);
	}
	let formatter = new Intl.NumberFormat(LOCALE, {
		useGrouping: opts && opts.useGrouping ? opts.useGrouping : true,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
	return formatter.format(val);
};

export const formatFloat = (
	val: string | number,
	opts?: FormatNumOpts,
): string => {
	const DEF_PRECISION = 2;
	if (typeof val === 'string') {
		val = Number.parseFloat(val);
	}
	let formatter = new Intl.NumberFormat(LOCALE, {
		useGrouping: opts && opts.useGrouping ? opts.useGrouping : true,
		minimumFractionDigits: opts ? opts.precision : DEF_PRECISION,
	});
	return formatter.format(val);
};

export const formatText = (val: string, opts?: FormatTextOpts): string => {
	if (opts && opts.maxLength !== undefined) {
		return val.substring(0, opts.maxLength);
	}
	return val;
};

export const formatTel = (val: string, opts?: FormatTelOpts): string => {
	let pref = '';
	if (val.length == 10) {
		pref = '+7';
	} else if (val.length == 11) {
		pref = '+';
	}
	return (
		pref +
		('(' +
			val.substring(0, 3) +
			') ' +
			val.substring(3, 6) +
			'-' +
			val.substring(6, 8) +
			'-' +
			val.substring(8, 10))
	);
};

export const formatBool = (
	val: string | boolean,
	opts?: FormatCheckOpts,
): string => {
	if (typeof val === 'string') {
		val = val === 'true' || val === '1';
	}
	if (opts?.showFalse === false && val === false) {
		return '';
	} else if (opts?.trueValue && val === true) {
		return opts.trueValue;
	} else if (opts?.falseValue && val === false) {
		return opts.falseValue;
	}

	if (val === false) {
		return i18n.global.t('Enum.falseValue');
	}
	return i18n.global.t('Enum.trueValue');
};

export const formatRef = (val: any, opts?: FormatRefOpts): string => {
	if (val === undefined || val === null) {
		return '';
	}
	if (typeof val !== 'object') {
		val = JSON.parse(val);
	}
	if (val.descr === null) {
		return '';
	}
	return val.descr ? val.descr : JSON.stringify(val); //if no descr, show as is
};

export const formatDate = (
	val: string | Date,
	opts?: FormatDateOpts,
): string => {
	if (typeof val === 'string' && val.length) {
		val = new Date(val); //from ISO string
	}
	if (isNaN((val as Date).getTime())) {
		return '';
	}
	let formatter = new Intl.DateTimeFormat(
		LOCALE,
		opts as Intl.DateTimeFormatOptions,
	);
	return formatter.format(val as Date);
};

export const formatAppEnum = (val: string, opts: FormatAppEnumOpts): string => {
	if (
		!appEnums[opts.enumId] ||
		!appEnums[opts.enumId][val] ||
		!appEnums[opts.enumId][val][opts.locale]
	) {
		return '';
	}
	return appEnums[opts.enumId][val][opts.locale] ?? '';
};

export const formatCurrency = (
	val: string | number,
	opts?: FormatCurrencyOpts,
): string => {
	if (typeof val === 'string') {
		val = Number.parseFloat(val);
	}
	let formatter = new Intl.NumberFormat(LOCALE, {
		style: 'currency',
		currency: CURRENCY,
		useGrouping: opts && opts.useGrouping ? opts.useGrouping : true,
		//currencyDisplay: symbol
	});
	return formatter.format(val);
};
