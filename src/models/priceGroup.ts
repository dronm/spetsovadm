import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export interface PriceGroup {
	id: number;
	name: string;
}

export interface PriceGroupDetail {
	id: number;
	name: string;
}

//new data: insert, update
//validation?
export interface PriceGroupNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface PriceGroupKey {
	id: number;
}

//update model
export interface PriceGroupUpdate {
	keys: PriceGroupKey;
	model: PriceGroupNew;
}

export type PriceGroupDataType = 'price_groups';

export interface PriceGroupRef {
	keys: PriceGroupKey;
	descr: string;
	dataType?: PriceGroupDataType;
}

export const priceGroupFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 500 }],
	},
};
