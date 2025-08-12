import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';

export const productCertificateFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	date_from: {
		dataType: DataType.date,
	},
	date_to: {
		dataType: DataType.date,
	},
	unlimited: {
		dataType: DataType.bool,
	},
	issue_body: {
		dataType: DataType.text,
	},
	cert_type: {
		dataType: DataType.text,
	},
	num: {
		dataType: DataType.text,
	},
	descr: {
		dataType: DataType.text,
	},
	status: {
		dataType: DataType.text,
	},
	pictures: {
		dataType: DataType.json,
	},
};
