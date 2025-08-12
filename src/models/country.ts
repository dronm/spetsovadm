import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface Country {
	id: number;
	name: string;
}

export interface CountryDetail {
	id: number;
	name: string;
}

//new data: insert, update
//validation?
export interface CountryNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface CountryKey {
	id: number;
}

//update model
export interface CountryUpdate {
	keys: CountryKey;
	model: CountryNew;
}

export type CountryDataType = 'countries';

export interface CountryRef {
	keys: CountryKey;
	descr: string;
	dataType?: CountryDataType;
}

export const countryFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 500 }],
	},
};
