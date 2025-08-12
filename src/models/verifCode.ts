import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface VerifCode {
	id: number;
	tel: string;
	secret: string;
	date_time: Date;
	try_date_time: Date;
	tries: number;
}

//new data: insert, update
//validation?
export interface VerifCodeNew {
	id?: number;
	tel: string;
	secret: string;
	date_time: Date;
	try_date_time: Date;
	tries: number;
}

//key model for update, delete
export interface VerifCodeKey {
	id: number;
}

//update model
export interface VerifCodeUpdate {
	keys: VerifCodeKey;
	model: VerifCodeNew;
}

export type VerifCodeDataType = 'verif_codes';

export interface VerifCodeRef {
	keys: VerifCodeKey;
	descr: string;
	dataType?: VerifCodeDataType;
}

export const verifCodeFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	tel: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 15 }],
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
