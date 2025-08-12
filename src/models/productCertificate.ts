import type { Picture } from './picture';

export interface ProductDetailCertificate {
	cert_type: string;
	date_from: string;
	descr: string;
	pictures: Picture[];
}

export interface ProductCertificateList {
	id: number;
	date_from: string;
	date_to: string;
	descr: string | null;
	status: string | null;
}

export interface ProductCertificate {
	id: number;
	date_from: string;
	date_to: string;
	unlimited: boolean;
	issue_body: string | null;
	cert_type: string | null;
	num: string | null;
	descr: string | null;
	status: string | null;
	ref_1c: string;
	pictures: Picture[];
}

//new data: insert, update
//validation?
export interface ProductCertificateNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface ProductCertificateKey {
	id: number;
}

//update model
export interface ProductCertificateUpdate {
	keys: ProductCertificateKey;
	model: ProductCertificateNew;
}

export type ProductCertificateDataType = 'product_certificates';

export interface ProductCertificateRef {
	keys: ProductCertificateKey;
	descr: string;
	dataType?: ProductCertificateDataType;
}
