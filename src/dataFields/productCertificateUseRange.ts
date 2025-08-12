import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';

export const productCertificateUseRangeFields: DataFields = {
	product_id: {
		dataType: DataType.int,
		pKey: true,
	},
	product_cat_id: {
		dataType: DataType.int,
		pKey: true,
	},
	product_certificates_ref: {
		dataType: DataType.ref,
		writeBind: 'product_certificate_id',
	},
	product_certificate_date_from: {
		dataType: DataType.date,
		writeBind: 'product_certificate_date_from',
	},
	product_certificate_status: {
		dataType: DataType.text,
		writeBind: 'product_certificate_status',
	},
	product_certificate_pictures: {
		dataType: DataType.json,
		writeBind: 'product_certificate_pictures',
	},
};
