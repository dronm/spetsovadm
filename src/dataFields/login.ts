import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';

export const loginFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	date_time_in: {
		dataType: DataType.date,
	},
	date_time_out: {
		dataType: DataType.date,
	},
	set_date_time: {
		dataType: DataType.date,
	},
	users_ref: {
		dataType: DataType.ref,
		writeBind: 'user_id',
	},
	user_agent_descr: {
		dataType: DataType.text,
	},
};
