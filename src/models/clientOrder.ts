export interface ClientOrder {
	id?: number;
	client_id: number;
	ref_1c: string;
	date_1c: Date;
	num_1c: String;
	total: number;
}

//key model for update, delete
export interface ClientOrderKey {
	id: number;
}

export type ClientOrderDataType = 'client_orders';

export interface ClientOrderRef {
	keys: ClientOrderKey;
	descr: string;
	dataType?: ClientOrderDataType;
}
