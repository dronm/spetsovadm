export interface Client {
	id?: number;
	name: string;
	name_full?: string;
	inn: string;
	kpp?: string;
	ogrn: string;
	okved?: string;
	okpo?: string;
	address_legal?: string;
	address_fact?: string;
	tels?: string;
	emails?: string;
	boss_name?: string;
	boss_post?: string;
}

export interface ClientDetail extends Client {}

//new data: insert, update
//validation?
export interface ClientNew {
	id?: number;
	name: string;
	name_full?: string;
	inn: string;
	kpp?: string;
	ogrn: string;
	okved?: string;
	okpo?: string;
	address_legal?: string;
	address_fact?: string;
	tels?: string;
	emails?: string;
	boss_name?: string;
	boss_post?: string;
}

//key model for update, delete
export interface ClientKey {
	id: number;
}

//update model
export interface ClientUpdate {
	keys: ClientKey;
	model: ClientNew;
}

export type ClientDataType = 'clients';

export interface ClientRef {
	keys: ClientKey;
	descr: string;
	dataType?: ClientDataType;
}
