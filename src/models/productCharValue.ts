import { type Ref } from '@/lib/types/ref';

export interface ProductCharValue {
	id: number;
	product_char_id: number;
	value: number;
	ref_1c: Ref;
}

//new data: insert, update
//validation?
export interface ProductCharValueNew {
	id?: number;
	product_char_id: number;
	value: number;
}

//key model for update, delete
export interface ProductCharValueKey {
	id: number;
}

//update model
export interface ProductCharValueUpdate {
	keys: ProductCharValueKey;
	model: ProductCharValueNew;
}

export type ProductCharValueDataType = 'brands';

export interface ProductCharValueRef {
	keys: ProductCharValueKey;
	descr: string;
	dataType?: ProductCharValueDataType;
}
