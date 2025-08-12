import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';

export const loginDeviceFields: DataFields = {
	date_time_in: {
		dataType: DataType.datetime,
	},
	banned: {
		dataType: DataType.bool,
	},
	user_agent: {
		dataType: DataType.text,
	},
};
