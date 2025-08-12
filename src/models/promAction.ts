import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface PromAction {
	id: number;
	name: string;
	comment_text: string;
	created_at: Date;
	updated_at: Date;
	expir_at: Date;
	user_id: number;
}

//new data: insert, update
//validation?
export interface PromActionNew {
	id?: number;
	name: string;
	comment_text: string;
	expir_at?: Date;
}

//key model for update, delete
export interface PromActionKey {
	id: number;
}

//update model
export interface PromActionUpdate {
	keys: PromActionKey;
	model: PromActionNew;
}

export type PromActionDataType = 'prom_actions';

export interface PromActionRef {
	keys: PromActionKey;
	descr: string;
	dataType?: PromActionDataType;
}

export const promActionFields: DataFields = {
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
