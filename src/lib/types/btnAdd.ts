import { type ModalTypeProps, type ViewTypeProps } from "./btnOpen";

export enum BtnAddType {
	modal,
	view,
	inline, //for one field add
}

export interface BtnAddProps {
	addType: BtnAddType;
	addProps?: ModalTypeProps | ViewTypeProps;
}
