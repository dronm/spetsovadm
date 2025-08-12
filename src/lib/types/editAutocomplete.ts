import { type APICall } from "./apiCall";

export interface EditAutocomplete {
	apiCall?: APICall; //api resource to call

	apiCallParams?: (search: string) => any; //Function to make query parameters.
	//The returned value will be directly passed to apiCall as a parameter
	/*
	 * Example of such a function:
		apiCallParams: function(search: string): CollectionParams {
			return { filter: [ { f: {name: {o: FilterOperatorParam.ILK, v: encodeURIComponent(`%${search}%`)}} } ] }
		}
	*/

	rows?: Record<string, any>[]; //result rows of objects. Can be filled at setup, if static list of values is used,
	//not api calls.

	descrFields?: string[]; //which fields from rows should be visible in resutl list.
	//if not set, all fields will be shown, except for keyFields.

	dataFields?: string[]; //other fields in result set

	descrFieldConcat?: string; //concatination of description fields, default=space.
	//It is possible to make a custom format without using a
	//formatFunction by concatinating fields.

	formatFunction?: (row: any) => string; //how to format output. If set, this function is called istead of
	//default formatting.

	formatResultHtml?: boolean; //treat returned value from  formatFunction as html instead of text

	minLenForQuery?: number; //minimal char length for sending queries.
	//if empty or undefined, then a query will be send immedeately
	open?: boolean;
	current?: number;
}
