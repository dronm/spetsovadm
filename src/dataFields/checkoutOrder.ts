import { DataType } from '../lib/types/dataTypes';
import { type DataFields } from '../lib/types/dataField';
import {
	ValidationConstraint,
	type ValidationRule,
} from '@/lib/types/validation';

import { checkout_order_status_typesFixList } from '@/enums/checkout_order_status_types';

export const checkoutOrderFields: DataFields = {
	id: {
		dataType: DataType.int,
		pKey: true,
		srvCalc: true,
	},
	user: {
		dataType: DataType.json,
	},
	store: {
		dataType: DataType.json,
	},
	create_at: {
		dataType: DataType.datetime,
	},
	last_status: {
		dataType: DataType.text,
		validRules: [
			<ValidationRule>{
				constraint: ValidationConstraint.fixList,
				value: checkout_order_status_typesFixList,
			},
		],
	},
};
