import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';

export const productPriceFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	product_id: {
		dataType: DataType.int,
	},
	characteristics_ref: {
		dataType: DataType.ref,
	},
	price_types_ref: {
		dataType: DataType.ref,
	},
	price: {
		dataType: DataType.float,
	},
	update_at: {
		dataType: DataType.date,
	},
};
