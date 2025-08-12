import { type ModalTypeProps, type ViewTypeProps } from "./btnOpen";

export enum BtnSelectType {
	modal,
	view,
}

export interface BtnSelectProps {
	selectType: BtnSelectType;
	selectProps?: ModalTypeProps | ViewTypeProps;
}
