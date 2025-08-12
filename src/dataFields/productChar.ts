import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';
import { ValidationConstraint } from '../lib/types/validation';

export const productCharFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	title: {
		dataType: DataType.text,
		validRules: [
			{ constraint: ValidationConstraint.maxLen, value: 255 },
			{ constraint: ValidationConstraint.required },
		],
	},
	prompt: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 255 }],
	},
	comment_text: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 5000 }],
	},
	ref_1c: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 36 }],
	},
	enabled: {
		dataType: DataType.bool,
	},
	visible: {
		dataType: DataType.bool,
	},
};
