export interface ClientContract {
	id?: number;
	client_id: number;
	ref_1c: string;
	contract_date: Date;
	contract_num: String;
	pay_terms_set: boolean;
	pay_terms_days: number;
	allowed_debt: number;
}

//key model for update, delete
export interface ClientContractKey {
	id: number;
}

export type ClientContractDataType = 'client_pays';

export interface ClientContractRef {
	keys: ClientContractKey;
	descr: string;
	dataType?: ClientContractDataType;
}
