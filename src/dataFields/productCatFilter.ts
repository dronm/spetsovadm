import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';
import { ValidationConstraint } from '../lib/types/validation';

export const productCatFilterFields: DataFields = {
	ref_1c: {
		dataType: DataType.text,
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
	values: {
		dataType: DataType.json,
	},
};
