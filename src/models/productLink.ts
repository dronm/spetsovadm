import { type Ref } from '@/lib/types/ref';

export interface ProductLink {
	id: number;
	product_id: number;
	product_cat_id: number;
	updated_at: Date;
}

export interface ProductLinkDetail {
	id: number;
	product_id: number;
	products_ref: Ref;
	product_cat_id: number;
	product_cats_ref: Ref;
	updated_at: Date;
}

export interface ProductLinkList {
	id: number;
	product_id: number;
	products_ref: Ref;
	product_cat_id: number;
	product_cats_ref: Ref;
	updated_at: Date;
}

//new data: insert, update
//validation?
export interface ProductLinkNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface ProductLinkKey {
	id: number;
}

//update model
export interface ProductLinkUpdate {
	keys: ProductLinkKey;
	model: ProductLinkNew;
}

export type ProductLinkDataType = 'product_links';

export interface ProductLinkRef {
	keys: ProductLinkKey;
	descr: string;
	dataType?: ProductLinkDataType;
}
