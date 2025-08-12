import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';
import { ValidationConstraint } from '../lib/types/validation';

export const productFields: DataFields = {
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
	code_1c: {
		dataType: DataType.text,
		validRules: [
			{ constraint: ValidationConstraint.maxLen, value: 255 },
			{ constraint: ValidationConstraint.required },
		],
	},
	name_full: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 1000 }],
	},
	artikul: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 255 }],
	},
	description: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 5000 }],
	},
	product_type: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 255 }],
	},
	specification: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 5000 }],
	},
	ref_1c: {
		dataType: DataType.text,
		validRules: [{ constraint: ValidationConstraint.maxLen, value: 36 }],
	},
	popularity: {
		dataType: DataType.int,
	},
	use_gtd: {
		dataType: DataType.bool,
	},
	use_certif: {
		dataType: DataType.bool,
	},
	use_marking: {
		dataType: DataType.bool,
	},
	use_pack: {
		dataType: DataType.bool,
	},
	excisable: {
		dataType: DataType.bool,
	},
	countries_ref: {
		dataType: DataType.ref,
		writeBind: 'country_id',
	},
	brands_ref: {
		dataType: DataType.ref,
		writeBind: 'brand_id',
	},
	producers_ref: {
		dataType: DataType.ref,
		writeBind: 'producer_id',
	},
	price_groups_ref: {
		dataType: DataType.ref,
		writeBind: 'producer_id',
	},
	product_cats_ref: {
		dataType: DataType.ref,
		writeBind: 'product_cat_id',
	},
};
