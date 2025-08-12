import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';

export const productStockFields: DataFields = {
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
	warehouses_ref: {
		dataType: DataType.ref,
	},
	quant: {
		dataType: DataType.float,
	},
	quant_available: {
		dataType: DataType.float,
	},
	update_at: {
		dataType: DataType.date,
	},
};
