import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';

export const productLinkFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	product_id: {
		dataType: DataType.int,
	},
	products_ref: {
		dataType: DataType.ref,
		writeBind: 'product_id',
	},
	product_cat_id: {
		dataType: DataType.int,
	},
	product_cats_ref: {
		dataType: DataType.ref,
		writeBind: 'product_cat_id',
	},
	updated_at: {
		dataType: DataType.date,
	},
};
