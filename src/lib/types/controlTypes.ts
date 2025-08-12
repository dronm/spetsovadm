import { type FormDataValue } from "./form";
import { Locale } from "./locale";

export enum ControlType {
	text, //opts: length
	num,
	currency,
	tel,
	pwd,
	email,
	date,
	ref,
	check,
	appEnum,
}

export type TypeFormatter = (
	val: FormDataValue,
	controlType: ControlType,
	controlTypeOpts: FormatControlTypeOpts | undefined,
) => string;

export type FormatControlTypeOpts =
	| FormatTextOpts
	| FormatNumOpts
	| FormatCurrencyOpts
	| FormatTelOpts
	| FormatCheckOpts
	| FormatDateOpts
	| FormatRefOpts
	| FormatAppEnumOpts;

export interface FormatTextOpts {
	maxLength?: number; //maximum length, the rest is trimmed.
}

export interface FormatRefOpts {
	detailRoute?: string; //vue-touter name for detail view
}

export interface FormatNumOpts {
	precision?: number;
	useGrouping?: boolean;
}

export interface FormatCurrencyOpts {
	useGrouping?: boolean;
}

export interface FormatTelOpts {}

export interface FormatCheckOpts {
	showFalse?: boolean;
	trueValue?: string;
	falseValue?: string;
}

export interface FormatAppEnumOpts {
	locale: Locale;
	enumId: string;
}

export interface FormatDateOpts {
	hour12?: boolean; //is 12 format or 24
	timeZone?: string;
	weekday?: "narrow" | "short" | "long";
	year?: "numeric" | "2-digit";
	month?: "numeric" | "2-digit" | "short" | "long" | "narrow";
	day?: "numeric" | "2-digit";
	hour?: "numeric" | "2-digit";
	minute?: "numeric" | "2-digit";
	second?: "numeric" | "2-digit";
	dateStyle?: "full" | "long" | "medium" | "short";
	timeStyle?: "full" | "long" | "medium" | "short";
}
