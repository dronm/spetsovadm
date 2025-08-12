export interface ClientPay {
	id?: number;
	client_id: number;
	ref_1c: string;
	date_1c: Date;
	num_1c: String;
	total: number;
}

//key model for update, delete
export interface ClientPayKey {
	id: number;
}

export type ClientPayDataType = 'client_pays';

export interface ClientPayRef {
	keys: ClientPayKey;
	descr: string;
	dataType?: ClientPayDataType;
}
