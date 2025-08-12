import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';
import { type Ref } from '@/lib/types/ref';

export interface ConfirmationStatus {
	id: number;
	field: string;
	ref: Ref;
	secret: string;
	date_time: Date;
	try_date_time: Date;
	tries: number;
}

//new data: insert, update
//validation?
export interface ConfirmationStatusNew {
	id?: number;
	tel: string;
	field: string;
	ref: Ref;
	secret: string;
	date_time: Date;
	try_date_time: Date;
	tries: number;
}

//key model for update, delete
export interface ConfirmationStatusKey {
	id: number;
}

//update model
export interface ConfirmationStatusUpdate {
	keys: ConfirmationStatusKey;
	model: ConfirmationStatusNew;
}

export type ConfirmationStatusDataType = 'verif_codes';

export interface ConfirmationStatusRef {
	keys: ConfirmationStatusKey;
	descr: string;
	dataType?: ConfirmationStatusDataType;
}

export const confirmationStatusFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	field: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 50 }],
	},
	ref: {
		dataType: DataType.json,
	},
	secret: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 10 }],
	},
	tries: {
		dataType: DataType.int,
	},
	try_date_time: {
		dataType: DataType.datetime,
	},
	date_time: {
		dataType: DataType.datetime,
	},
};
