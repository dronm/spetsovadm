import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface PromCode {
	id: number;
	name: string;
	comment_text: string;
	code: string;
	created_at: Date;
	updated_at: Date;
	expir_at: Date;
	user_id: number;
}

//new data: insert, update
//validation?
export interface PromCodeNew {
	id?: number;
	name: string;
	comment_text: string;
	code: string;
	expir_at?: Date;
}

//key model for update, delete
export interface PromCodeKey {
	id: number;
}

//update model
export interface PromCodeUpdate {
	keys: PromCodeKey;
	model: PromCodeNew;
}

export type PromCodeDataType = 'prom_codes';

export interface PromCodeRef {
	keys: PromCodeKey;
	descr: string;
	dataType?: PromCodeDataType;
}

export const promCodeFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 250 }],
	},
	comment_text: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 5000 }],
	},
	code: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 10 }],
	},
	created_at: {
		dataType: DataType.datetime,
	},
	updated_at: {
		dataType: DataType.datetime,
	},
	expir_at: {
		dataType: DataType.datetime,
	},
};
