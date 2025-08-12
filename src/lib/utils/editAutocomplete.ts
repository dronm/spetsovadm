import { type EditAutocomplete } from "../types/editAutocomplete";
import { FilterOperatorParam, type CollectionParams } from "../types/collection";
import { type APICall } from "../types/apiCall";

//helper function to construct EditAutocomplete
export const editAutocomplete = (
	api: APICall,
	searchField?: string,
	descriptionFields?: string | string[],
	filterOperator?: FilterOperatorParam,
) => {
	if (searchField === undefined) {
		searchField = "name";
	}
	if (descriptionFields === undefined) {
		descriptionFields = [searchField];
	}
	return <EditAutocomplete>{
		descrFields:
			typeof descriptionFields == "string"
				? [descriptionFields]
				: descriptionFields,
		apiCall: api,
		apiCallParams: function (search: string): CollectionParams {
			return {
				filter: [
					{
						f: {
							[searchField]: {
								o: filterOperator
									? filterOperator
									: FilterOperatorParam.ILK,
								v: `%${search}%`,
							},
						},
					},
				],
			};
		},
	};
};
