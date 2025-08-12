import type { Ref } from '@/lib/types/ref';

export interface ProductCertificateUseRange {
	product_id: number;
	product_cat_id: number;
	product_certificate_id: number;
}

export interface ProductCertificateUseRangeDetail {
	product_id: number;
	product_cat_id: number;
	product_certificates_ref: Ref;
}

//new data: insert, update
//validation?
export interface ProductCertificateUseRangeNew {
	product_id: number;
	product_cat_id: number;
	product_certificate_id: number;
}

//key model for update, delete
export interface ProductCertificateUseRangeKey {
	product_id: number;
	product_cat_id: number;
}

//update model
export interface ProductCertificateUseRangeUpdate {
	keys: ProductCertificateUseRangeKey;
	model: ProductCertificateUseRangeNew;
}

export type ProductCertificateUseRangeDataType =
	'product_certificate_use_ranges';

export interface ProductCertificateUseRangeRef {
	keys: ProductCertificateUseRangeKey;
	descr: string;
	dataType?: ProductCertificateUseRangeDataType;
}
