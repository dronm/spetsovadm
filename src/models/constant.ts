export interface ConstantList {
	id: string;
	name: string;
	descr: string;
	val: string;
	ctrl_class: string;
	ctrl_options: string;
	view_class: string;
	view_options: string;
}

export interface ConstantValList {
	id: string;
	val: string;
}

export interface Constant_set {
	val: string;
}
