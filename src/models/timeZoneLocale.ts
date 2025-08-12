import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface TimeZoneLocale {
	id: number;
	name: string;
}

export interface TimeZoneLocaleDetail {
	id: number;
	name: string;
}

//new data: insert, update
//validation?
export interface TimeZoneLocaleNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface TimeZoneLocaleKey {
	id: number;
}

//update model
export interface TimeZoneLocaleUpdate {
	keys: TimeZoneLocaleKey;
	model: TimeZoneLocaleNew;
}

export type TimeZoneLocaleDataType = 'time_zone_locales';

export interface TimeZoneLocaleRef {
	keys: TimeZoneLocaleKey;
	descr: string;
	dataType?: TimeZoneLocaleDataType;
}

export const timeZoneLocaleFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 500 }],
	},
};
