import type { VueComponent, VueComponentEvents, VueComponentProps } from "./comp";
import type { APICall } from "./apiCall";
import type { DataField, DataFieldValue } from "./dataField";
import { ControlType } from "./controlTypes";
import { type Ref } from "./ref";

//FormEdit is used to resolve edit control.
//component is a priority. If not set dataType is used.
//Al least one value should be set: comp or dataType.
export interface FormEdit {
	comp?: VueComponent; // vue component
	compProps?: VueComponentProps;
	compEvents?: VueComponentEvents;
}

export interface DetailProps {
	data?: any;
	isNew?: boolean;
	error?: string;
	currentId?: string;
}

//form data structure
export type FormData = Record<string, any>;

export type FormDataValue = any;
// 	| string
// 	| number
// 	| Date
// 	| boolean
// 	| object
// 	| Array<any>
// 	| undefined
// 	| null
// 	| Ref
// ;

//
//update model
export interface FormUpdate {
	keys: FormData;
	model: FormData;
}

//detail view form key types
export interface FormKeyTypes {
	[key: string]: "number" | "string" | "boolean"; //undefined is for new element
}

export type KeyTypes = number | string | boolean | Date;

export type FormKeys = Record<string, KeyTypes>;
// export interface FormKeys {
// 	[key: string]: KeyTypes;
// }

export enum FormSrvOperation {
	insert,
	update,
	fetch,
}

//possible form operation
export type FormSrvOperations = Partial<Record<FormSrvOperation, APICall>>;
// export type FormSrvOperations = {
// 	[key in FormSrvOperation]: APICall;
// }

// form controls
export interface FormControl {
	id: string;
	field?: DataField;
	label?: string; //alias
	defaultValue?: DataFieldValue;
	focus?: boolean;
	controlType?: ControlType; //field.dataType|controlType|editControl in back order
	//is used to resolve Vue component for editing
	editControl?: FormEdit;
}

export interface FormConfirmation {
	show: boolean;
	confirmed?: () => void;
	rejected?: () => void;
	text: string;
}

//constructor
export const newFormSrvOperations = (opInsert: APICall, opUpdate: APICall, opFetch: APICall) => {
	const operations = <FormSrvOperations>{};
	operations[FormSrvOperation.insert] = opInsert;
	operations[FormSrvOperation.update] = opUpdate;
	operations[FormSrvOperation.fetch] = opFetch;

	return operations;
};
