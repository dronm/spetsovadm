export interface Brand {
	id: number;
	name: string;
}

export interface BrandDetail {
	id: number;
	name: string;
}

//new data: insert, update
//validation?
export interface BrandNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface BrandKey {
	id: number;
}

//update model
export interface BrandUpdate {
	keys: BrandKey;
	model: BrandNew;
}

export type BrandDataType = 'brands';

export interface BrandRef {
	keys: BrandKey;
	descr: string;
	dataType?: BrandDataType;
}
