import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface Store {
	id: number;
	address: string;
	email: string;
	work_hours: string;
	tels: string;
	pos_lat: string;
	pos_lon: string;
}

export interface StoreDetail {
	id: number;
	address: string;
	email: string;
	work_hours: string;
	tels: string;
	pos_lat: string;
	pos_lon: string;
}

//new data: insert, update
//validation?
export interface StoreNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface StoreKey {
	id: number;
}

//update model
export interface StoreUpdate {
	keys: StoreKey;
	model: StoreNew;
}

export type StoreDataType = 'stores';

export interface StoreRef {
	keys: StoreKey;
	descr: string;
	dataType?: StoreDataType;
}

export const storeFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	address: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 500 }],
	},
	email: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 50 }],
	},
	work_hours: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 50 }],
	},
	tels: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 50 }],
	},
	pos_lat: {
		dataType: DataType.text,
	},
	pos_lon: {
		dataType: DataType.text,
	},
};

//************************************
export interface StorePublicList {
	id: number;
	address: string;
	email: string;
	work_hours: string;
	tels: string;
	pos_lat: string;
	pos_lon: string;
}
