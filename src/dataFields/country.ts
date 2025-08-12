import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';
import { ValidationConstraint } from '../lib/types/validation';

export const countryFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [
			{ constraint: ValidationConstraint.maxLen, value: 255 },
			{ constraint: ValidationConstraint.required },
		],
	},
	countries_ref: {
		dataType: DataType.ref,
		writeBind: 'country_id',
	},
};
