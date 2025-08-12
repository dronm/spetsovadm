import {
	type GridEdit,
	type GridEditCommand,
	type GridCommand,
	type GridCol,
	type GridNavigate,
} from "./grid";
import type { TypeFormatter } from "./controlTypes.ts";

export interface TreeProps {
	treeKey: string;
	keyFields?: string[]; //in case key field is not in columns, should use this prop
	childrenField: string;

	edit?: GridEdit | boolean; //
	editCommands?: GridEditCommand[];

	forSelect?: boolean; //opened for making selection of a row (cell)
	multySelect?: boolean; //multyrow selection
	rowSelect?: boolean; //row selection otherwise cell
	navigate?: GridNavigate; //
	mousePopup?: any; //context popup menu
	title?: string; //grid title
	commands?: GridCommand[]; //commands used for grid command panel and for context menu
	column: GridCol; //initial column list with headers
	typeFormatter: TypeFormatter;
	refreshInterval?: number;
	editRow?: FormData;
	store: any; //CollectionStore;
	showPages?: number; //how many pages to show in pagination
	error?: string;
	formatRowClass?: string | ((row: any) => string);
	data?: any;
}
