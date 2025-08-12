export interface Supplier {
	id?: number;
	name: string;
	inn: string;
	ogrn: string;
}

export interface SupplierDetail extends Supplier {}

//new data: insert, update
//validation?
export interface SupplierNew {
	id?: number;
	name: string;
	inn: string;
	ogrn: string;
}

//key model for update, delete
export interface SupplierKey {
	id: number;
}

//update model
export interface SupplierUpdate {
	keys: SupplierKey;
	model: SupplierNew;
}

export type SupplierDataType = 'suppliers';

export interface SupplierRef {
	keys: SupplierKey;
	descr: string;
	dataType?: SupplierDataType;
}
