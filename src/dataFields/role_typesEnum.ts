import { DataType } from '@/lib/types/dataTypes';
import { type DataField } from '@/lib/types/dataField';
import { ValidationConstraint } from '@/lib/types/validation';

export const role_typesEnumField = <DataField>{
	dataType: DataType.text,
	validRules: [
		{
			constraint: ValidationConstraint.fixList,
			value: ['admin', 'customer'],
		},
	],
};
