export interface ProductCatFilterValue {
	ref_1c: string;
	name: string;
}

export interface ProductCatFilter {
	ref_1c: string;
	name: string;
	values?: ProductCatFilterValue[];
}

export interface ProductCatFilterDetail {
	ref_1c: string;
	name: string;
	values?: ProductCatFilterValue[];
}

//new data: insert, update
//validation?
export interface ProductCatFilterNew {
	ref_1c?: string;
	name: string;
	values?: ProductCatFilterValue[];
}

//key model for update, delete
export interface ProductCatFilterKey {
	ref_1c: string;
}

//update model
export interface ProductCatFilterUpdate {
	keys: ProductCatFilterKey;
	model: ProductCatFilterNew;
}

export type ProductCatFilterDataType = 'product_cat_filters';

export interface ProductCatFilterRef {
	keys: ProductCatFilterKey;
	descr: string;
	dataType?: ProductCatFilterDataType;
}
