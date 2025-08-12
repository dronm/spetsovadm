import { type EditAutocomplete } from '@/lib/types/editAutocomplete';
import {
	FilterOperatorParam,
	type CollectionParams,
} from '@/lib/types/collection';
import { type APICall } from '@/lib/types/apiCall';

export const editAutocompleteEq = (
	searchField: string,
	descriptionFields: string[],
	api: APICall,
) => {
	return <EditAutocomplete>{
		descrFields: descriptionFields,
		apiCall: api,
		apiCallParams: function (search: string): CollectionParams {
			return {
				filter: [
					{
						f: {
							[searchField]: {
								o: FilterOperatorParam.ILK,
								v: `%${search}%`,
							},
						},
					},
				],
			};
		},
	};
};
