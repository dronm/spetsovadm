export interface MainMenuForUser extends MainMenu {}

export interface MainMenu {
	id: number;
	icon?: string;
	caption: string;
	route?: string;
	children?: MainMenu[];
}

export interface MainMenuDetail extends MainMenu {}

//new data: insert, update
//validation?
export interface MainMenuNew {
	id?: number;
	caption: string;
	route: string | null;
	children: MainMenu[] | null;
}

//key model for update, delete
export interface MainMenuKey {
	id: number;
}

//update model
export interface MainMenuUpdate {
	keys: MainMenuKey;
	model: MainMenuNew;
}

export type MainMenuDataType = 'main_menu';

export interface MainMenuRef {
	keys: MainMenuKey;
	descr: string;
	dataType?: MainMenuDataType;
}
