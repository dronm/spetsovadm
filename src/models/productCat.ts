import { DataType } from '@/lib/types/dataTypes';
import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';
import type { ProductDetail } from './product';

export interface ProductCat {
	id: number;
	name: string;
	description: string;
	name_lat: string;
	// is_group: boolean;
	// picture_path?: string;
	// preview_path?: string;
	// icon?: string;
	popularity: number;
	order_position: number;
	filter_attrs?: ProductCatFilterAttr[];
	// product_count: number;
}

export interface ProductCatList {
	id: number;
	name: string;
	description: string;
	name_lat: string;
	is_group: boolean;
	preview_path?: string;
	icon?: string;
	popularity: number;
	order_position: number;
	parents_descr: string;
	product_count: number;
}

export interface ProductCatDetail {
	id: number;
	name: string;
	description: string | null;
	name_lat: string;
	is_group: boolean;
	picture_path: string | null;
	preview_path: string | null;
	icon: string | null;
	popularity: number;
	product_count: number;
	parents: ProductDetail[] | null;
	order_position: number;
	filter_attrs?: ProductCatFilterAttr[];
}

//new data: insert, update
//validation?
export interface ProductCatNew {
	id?: number;
	description?: string;
	name?: string;
	parent_id?: number;
	order_position?: number;
	filter_attrs?: ProductCatFilterAttr[];
	popularity?: number;
}

//key model for update, delete
export interface ProductCatKey {
	id: number;
}

//update model
export interface ProductCatUpdate {
	keys: ProductCatKey;
	model: ProductCatNew;
}

export type ProductCatDataType = 'product_cats';

export interface ProductCatRef {
	keys: ProductCatKey;
	descr: string;
	dataType?: ProductCatDataType;
}

//****************************
export interface ProductCatFilterAttrValue {
	ref_1c: string;
	name: string;
}

export interface ProductCatFilterAttr {
	ref_1c: string;
	line: number;
	name: string;
	values: ProductCatFilterAttrValue[];
}

export interface ProductCatAttrVal {
	id: number;
	name: string;
}

export interface ProductCatPublicList {
	id: number;
	name: string;
	description?: string;
	name_lat: string;
	is_group: boolean;
	picture_path?: string;
	product_count: number;
	icon: string;
	children?: ProductCatPublicList[];
	parents?: ProductCatPublicList[];
	popularity: number;
	filter_attrs?: ProductCatFilterAttr[];
	brand_values?: ProductCatAttrVal[];
	country_values?: ProductCatAttrVal[];
}

export interface ProductCatPicture {
	ref_1c: string;
	size: number;
	ext: string;
	preview_ext: string;
	description: string | null;
}

export const productCatFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 500 }],
	},
	name_lat: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 500 }],
	},
	description: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 5000 }],
	},
	popularity: {
		dataType: DataType.int,
	},
	order_position: {
		dataType: DataType.int,
	},
	parents_descr: {
		dataType: DataType.text,
	},
	parent_id: {
		dataType: DataType.int,
	},
	product_count: {
		dataType: DataType.int,
	},
	filter_attrs: {
		dataType: DataType.json,
	},
};
