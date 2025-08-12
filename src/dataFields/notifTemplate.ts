import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';
import { ValidationConstraint } from '../lib/types/validation';

export const notifTemplateFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	notif_provider: {
		dataType: DataType.text,
		// validRules: [
		// 	{ constraint: ValidationConstraint.maxLen, value: 255 },
		// 	{ constraint: ValidationConstraint.required },
		// ],
	},
	notif_type: {
		dataType: DataType.text,
	},
	template: {
		dataType: DataType.text,
	},
	comment_text: {
		dataType: DataType.text,
	},
	fields: {
		dataType: DataType.text,
	},
	provider_values: {
		dataType: DataType.text,
	},
	notifTemplates_ref: {
		dataType: DataType.ref,
		writeBind: 'notifTemplate_id',
	},
};
