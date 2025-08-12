import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface Producer {
	id: number;
	name: string;
}

export interface ProducerDetail {
	id: number;
	name: string;
}

//new data: insert, update
//validation?
export interface ProducerNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface ProducerKey {
	id: number;
}

//update model
export interface ProducerUpdate {
	keys: ProducerKey;
	model: ProducerNew;
}

export type ProducerDataType = 'producers';

export interface ProducerRef {
	keys: ProducerKey;
	descr: string;
	dataType?: ProducerDataType;
}

export const producerFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 500 }],
	},
};
