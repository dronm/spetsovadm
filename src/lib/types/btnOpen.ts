import type { VueComponent, VueComponentProps } from "./comp";
import { type FormKeys } from "./form";

export enum BtnOpenType {
	modal,
	view,
	router,
}

export interface ModalTypeProps {
	comp: VueComponent; //component
	compProps?: VueComponentProps; //component properties
	modalProps?: any;
}

export interface ViewTypeProps {
	routeName: string;
	winProps?: Record<string, number | string>;
}

export interface BtnOpenProps {
	openType: BtnOpenType;
	keys?: FormKeys; //KeyTypes, added in EditRef component
	openProps?: ModalTypeProps | ViewTypeProps | string;
}
