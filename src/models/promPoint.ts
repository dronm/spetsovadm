import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface PromPoint {
	id: number;
	name: string;
	comment_text: string;
	created_at: Date;
	updated_at: Date;
	user_id: number;
}

//new data: insert, update
//validation?
export interface PromPointNew {
	id?: number;
	name: string;
	comment_text: string;
}

//key model for update, delete
export interface PromPointKey {
	id: number;
}

//update model
export interface PromPointUpdate {
	keys: PromPointKey;
	model: PromPointNew;
}

export type PromPointDataType = 'prom_points';

export interface PromPointRef {
	keys: PromPointKey;
	descr: string;
	dataType?: PromPointDataType;
}

export const promPointFields: DataFields = {
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
};
