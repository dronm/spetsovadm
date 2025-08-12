import { type DataFields } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';
import { DataType } from '@/lib/types/dataTypes';
import { type Ref } from '@/lib/types/ref';

import type { ProductDetailCertificate } from './certificate';
import type { Picture } from './picture';

export interface Product {
	id: number;
	name: string;
	product_cat_id?: number;
	name_lat: string;
	code_1c: string;
	artikul: string | null;
	name_full: string;
	measure_unit: ProductMeasureUnit;
	brand_id?: number;
	producer_id?: number;
	country_id?: number;
	price_group_id?: number;
	description?: string;
	product_type: string | null;
	specification: string | null;
	use_marking: boolean;
	use_certif: boolean;
	use_gtd: boolean;
	use_pack: boolean;
	excisable: boolean;
	popularity: number | null;
}

export interface ProductDetail {
	id: number;
	name: string;
	name_lat: string;
	code_1c: string;
	artikul: string | null;
	name_full: string;
	measure_unit: ProductMeasureUnit;
	brands_ref: Ref | null;
	producers_ref: Ref | null;
	countries_ref: Ref | null;
	price_groups_ref: Ref | null;
	product_cats_ref: Ref | null;
	description: string | null;
	product_type: string | null;
	specification: string | null;
	use_marking: boolean;
	use_certif: boolean;
	use_gtd: boolean;
	use_pack: boolean;
	product_cat_path?: ProductCatParent[];
	excisable: boolean;
	popularity: number | null;
	pictures?: Picture[];
	preview_path: string | null;
	product_attr_vals?: ProductAttrVal[];
	char_details?: ProductCharDetail[];
}

export interface ProductList {
	id: number;
	name: string;
	code_1c: string;
	preview_path?: string;
	artikul?: string;
	// product_cat_id?: number;
	// product_cats_ref?: string;
	product_cat_descrs?: string;
}

//new data: insert, update
//validation?
export interface ProductNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface ProductKey {
	id: number;
}

//update model
export interface ProductUpdate {
	keys: ProductKey;
	model: ProductNew;
}

export type ProductDataType = 'brands';

export interface ProductRef {
	keys: ProductKey;
	descr: string;
	dataType?: ProductDataType;
}

//********************************************
export interface ProductSearchResult {
	id: number;
	date_type: string;
	name: string;
	name_lat: string;
	preview_path: string;
}

export interface ProductCharDetail {
	char_id: number;
	char_name: string;
	quant: number;
	price: number;
}

export interface ProductAttrVal {
	title?: string;
	value: string;
	prompt?: string;
	visible: boolean;
	comment_text?: string;
}

export interface ProductCatParent {
	id: number;
	name: string;
	name_lat: string;
}

export interface ProductPublicDetail {
	id: number;
	name: string;
	code_1c: string;
	name_lat: string;
	measure_unit: string;
	artikul?: string;
	name_full?: string;
	brand?: string;
	producer?: string;
	description?: string;
	product_type?: string;
	specification?: string;
	use_marking?: boolean;
	country?: string;
	price?: number;
	product_cat_path?: ProductCatParent[];
	available: boolean;
	char_details?: ProductCharDetail[];
	product_attr_vals?: ProductAttrVal[];
	pictures?: Picture[];
	excisable: boolean;
	certificates: ProductDetailCertificate[];
	default_char_id?: number;
	preview_path?: string;
	quant: number;
}

export interface ProductPreview {
	id: number;
	name: string;
	code_1c: string;
	name_lat: string;
	price?: number;
	available: boolean;
	preview_path?: string | null;
	product_attr_vals?: ProductAttrVal[];
	quant: number;
	default_char?: ProductCharDetail;
	attr_filter?: string[];
}

export interface ProductForCart extends ProductPreview {
	quantity: number; //number added to cart
	selected_char?: ProductCharDetail | null; //added to cart
}

export interface ProductPreviewFilter {
	min_price: number | undefined;
	max_price: number | undefined;
	brand_id: number | undefined;
	country_id: number | undefined;
	product_attr_vals: Record<string, string> | undefined;
}

export const productFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 250 }],
	},
	code_1c: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 250 }],
	},
	artikul: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 250 }],
	},
	description: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 5000 }],
	},
	preview_path: {
		dataType: DataType.text,
	},
	product_type: {
		dataType: DataType.text,
	},
	specification: {
		dataType: DataType.text,
	},
	use_pack: {
		dataType: DataType.bool,
	},
	use_gtd: {
		dataType: DataType.bool,
	},
	use_marking: {
		dataType: DataType.bool,
	},
	excisable: {
		dataType: DataType.bool,
	},
	popularity: {
		dataType: DataType.int,
	},
	measure_unit: {
		dataType: DataType.json,
	},
	product_attr_vals: {
		dataType: DataType.json,
	},
	product_cat_descrs: {
		dataType: DataType.text,
	},
};

export interface ProductMeasureUnit {
	name: string;
	depth?: number;
	width?: number;
	height?: number;
	name_full?: string;
	name_short_intern?: string;
}
