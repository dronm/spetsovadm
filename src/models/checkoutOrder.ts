import { type Ref } from '@/lib/types/ref';

import { type DocAttachment } from './docAttachment';
import { type DocRef1c } from './docRef1c';

export interface CheckoutOrderDelivery {}

export interface CheckoutOrderProduct {
	product_id: number;
	product_descr: string;
	char_id: string;
	char_descr: string;
	quant: number;
	price: number;
	total: number;
}

export interface CheckoutOrder {
	id?: number;
	user_id: number;
	store_id: number;
	delivery: CheckoutOrderDelivery;
	products: CheckoutOrderProduct[];
	attachments: DocAttachment[];
	create_at: Date;
	order_ref_1c: DocRef1c;
	upd_ref_1c: DocRef1c;
}

export interface CheckoutOrderDetail extends CheckoutOrder {}

export interface CheckoutOrderList {
	id: number;
	user_id: number;
	store: Ref;
	delivery: CheckoutOrderDelivery;
	attachments: DocAttachment[];
	create_at: Date;
	order_ref_1c: string;
	upd_ref_1c: string;
}

//new data: insert, update
//validation?
export interface CheckoutOrderNew {
	id?: number;
	user_id: number;
	store_id: number;
	delivery: CheckoutOrderDelivery;
	products: CheckoutOrderProduct[];
	attachments: DocAttachment[];
	create_at: Date;
	order_ref_1c: string;
	upd_ref_1c: string;
}

//key model for update, delete
export interface CheckoutOrderKey {
	id: number;
}

//update model
export interface CheckoutOrderUpdate {
	keys: CheckoutOrderKey;
	model: CheckoutOrderNew;
}

export type CheckoutOrderDataType = 'checkout_orders';

export interface CheckoutOrderRef {
	keys: CheckoutOrderKey;
	descr: string;
	dataType?: CheckoutOrderDataType;
}
