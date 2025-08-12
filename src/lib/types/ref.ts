import { type FormKeys } from "./form";

export interface Ref {
	keys: FormKeys;
	descr: string;
	dataType?: string;
}

//Possible select types:
//		model, needs component with props
//		view, needs routeName
export enum RefSelectType {
	modal,
	view,
}
