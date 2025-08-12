import { DataType } from '../lib/types/dataTypes';
import { type DataFields, type DataField } from '../lib/types/dataField';
import { ValidationConstraint } from '../lib/types/validation';
import { role_typesEnumField } from '@/dataFields/role_typesEnum';

export const userFields: DataFields = {
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
	// name_full: {
	// 	dataType: DataType.text,
	// 	validRules: [
	// 		{ constraint: ValidationConstraint.maxLen, value: 255 },
	// 		{ constraint: ValidationConstraint.required },
	// 	],
	// },
	role_id: role_typesEnumField,
	email: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 50 }],
	},
	tel: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 11 }],
	},
	tel_verified: {
		dataType: DataType.bool,
	},
	email_verified: {
		dataType: DataType.bool,
	},
	is_enterprise: {
		dataType: DataType.bool,
	},
	send_action_inf: {
		dataType: DataType.bool,
	},
	client: {
		dataType: DataType.json,
	},
};

export const userFieldsAssert = function (id: string): DataField {
	if (!userFields[id]) {
		throw new Error(`userFieldsAssert() failed for field: ${id}`);
	}
	return userFields[id];
};
