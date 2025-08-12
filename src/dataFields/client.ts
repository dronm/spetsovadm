import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';
import { ValidationConstraint } from '../lib/types/validation';

export const clientFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	name: {
		dataType: DataType.text,
		validRules: [
			{ constraint: ValidationConstraint.maxLen, value: 500 },
			{ constraint: ValidationConstraint.required },
		],
	},
	name_full: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 5000 }],
	},
	inn: {
		dataType: DataType.text,
		validRules: [
			{ constraint: ValidationConstraint.maxLen, value: 12 },
			{ constraint: ValidationConstraint.required },
		],
	},
	ogrn: {
		dataType: DataType.text,
		validRules: [
			{ constraint: ValidationConstraint.maxLen, value: 15 },
			{ constraint: ValidationConstraint.required },
		],
	},
	okpo: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 20 }],
	},
	kpp: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 10 }],
	},
	okved: {
		dataType: DataType.text,
	},
	tels: {
		dataType: DataType.text,
	},
	email: {
		dataType: DataType.text,
	},
	address_legal: {
		dataType: DataType.text,
	},
	address_fact: {
		dataType: DataType.text,
	},
	boss_name: {
		dataType: DataType.text,
	},
	boss_post: {
		dataType: DataType.text,
	},
	clients_ref: {
		dataType: DataType.ref,
		writeBind: 'client_id',
	},
};
