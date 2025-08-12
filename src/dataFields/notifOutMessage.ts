import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';

export const notifOutMessageFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	providers: {
		dataType: DataType.text,
	},
	created_at: {
		dataType: DataType.date,
	},
	message: {
		dataType: DataType.text,
	},
	status: {
		dataType: DataType.int,
	},
	callback: {
		dataType: DataType.bool,
	},
	closed: {
		dataType: DataType.bool,
	},
};
