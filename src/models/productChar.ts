import { type Ref } from '@/lib/types/ref';

export interface ProductChar {
	id: number;
	title: string;
	prompt: string | null;
	comment_text: string | null;
	enabled: boolean | null;
	visible: boolean | null;
	ref_1c: Ref | null;
}

export interface ProductCharDetail {
	id: number;
	title: string;
	prompt: string | null;
	comment_text: string | null;
	enabled: boolean | null;
	visible: boolean | null;
	ref_1c: Ref | null;
}

//new data: insert, update
//validation?
export interface ProductCharNew {
	id?: number;
	title: string;
	prompt: string | null;
	comment_text: string | null;
	enabled: boolean | null;
	visible: boolean | null;
	ref_1c: Ref | null;
}

//key model for update, delete
export interface ProductCharKey {
	id: number;
}

//update model
export interface ProductCharUpdate {
	keys: ProductCharKey;
	model: ProductCharNew;
}

export type ProductCharDataType = 'product_chars';

export interface ProductCharRef {
	keys: ProductCharKey;
	descr: string;
	dataType?: ProductCharDataType;
}
