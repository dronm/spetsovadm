import type { VueComponent, VueComponentProps } from "./comp";
import type { TypeFormatter, FormatControlTypeOpts, ControlType } from "./controlTypes.ts";
import { type DataFieldValue, type DataField } from "./dataField";
import type { FormData, FormEdit } from "./form.ts";
import { type EventSubscription } from "../services/wsManager";
import { type PopoverItem } from "./popover";
import { DataType } from "./dataTypes";

export enum GridEditMode {
	inline, //inline grid mode
	modal, //modal form edit mode
	view, //standalone window
	router, //same form
}

export enum GridInlineInsertPlace {
	first,
	last,
}

export enum GridColTextAlign {
	left = "left",
	right = "right",
	center = "center",
}

export enum GridColSortOrder {
	asc,
	desc,
}

export interface GridCol {
	id: string; //unique column ID
	header?: string;
	rowspan?: number;
	colspan?: number;
	editClass?: string | ((row: any) => string); //editClass
	headClass?: string;
	visible?: boolean;
	defaultValue?: DataFieldValue;
	formatOpts?: FormatControlTypeOpts; //options for formatControl/controlType
	textAlign?: GridColTextAlign;
	focus?: boolean; //clicked cell will be focused anyway
	editable?: boolean;
	controlType?: ControlType; // field.dataType|contolType|editControl|formatFunction
	// is used in backward order to resolve data rendering
	editControl?: FormEdit;
	formatControl?: FormEdit;
	formatFunction?: (row: any) => string; // can be a string with html if formatResultHtml=true
	formatClass?: string | ((row: any) => string);
	formatResultHtml?: boolean;
	sort?: GridColSortOrder | boolean;
	sortColumnId?: string;
	field?: DataField;
	search?: boolean; //if false - no search
	searchColumnId?: string; //search column substitution
	expand?: boolean; //column is used for expanding detail data
	searchColumnKeys?: Record<string, string>; //for object filtering
}

export interface GridFootCol {
	id: string; //unique column ID
	rowspan?: number;
	colspan?: number;
	visible?: boolean;
	colClass?: string;
	formatOpts?: FormatControlTypeOpts; //options for formatControl/controlType
	textAlign?: GridColTextAlign;
	controlType?: ControlType; // static value|dataType|contolType|formatFunction
	// is used in backward order to resolve data rendering
	formatControl?: FormEdit;
	formatFunction?: (row: any) => string; // can be a string with html if formatResultHtml=true
	formatClass?: string | ((row: any) => string);
	formatResultHtml?: boolean;
	field?: DataField;
	value?: any; //static value
}

export enum GridFootCalcOperation {
	sum,
	avg,
}

export type GridData = FormData[];

//if undefined then defaults are used.
export interface GridCommand {
	id: string;
	btn?: boolean; //show in control panel
	comp?: VueComponent; //component
	compProps?: VueComponentProps; //component properties
}

export interface GridEditForm {
	comp: VueComponent; //component
	compProps?: VueComponentProps; //component properties
	modalProps?: any;
	viewProps?: any;
}

export interface GridNavigate {
	mouse?: boolean;
	keyboard?: boolean;
}

export interface GridEdit {
	mode?: GridEditMode;
	routeName?: string;
	routeCollectionName?: string;
	form?: GridEditForm;
}

export type GridEditCommand = "add" | "edit" | "del";

export interface GridProps {
	gridKey: string;
	keyFields?: string[]; //in case key field is not in columns, should use this prop

	edit?: GridEdit | boolean; //
	editCommands?: GridEditCommand[];

	showHeader?: boolean;
	forSelect?: boolean; //opened for making selection of a row (cell)
	multySelect?: boolean; //multyrow selection
	rowSelect?: boolean; //row selection otherwise cell
	navigate?: GridNavigate; //
	draggable?: boolean;
	mousePopup?: PopoverItem[]; //context popup menu
	title?: string; //grid title
	commands?: GridCommand[]; //commands used for grid command panel and for context menu
	columns: GridCol[][]; //initial column list with headers
	footColumns?: GridFootCol[][]; //initial foot column list
	sort?: GridCurrentSorting;
	inlineInsertPlace?: GridInlineInsertPlace;
	typeFormatter: TypeFormatter;
	refreshInterval?: number;
	editRow?: FormData;
	store: any; //CollectionStore;
	showPages?: number; //how many pages to show in pagination
	error?: string;
	formatRowClass?: string | ((row: any) => string);
	expand?: FormEdit; //can be expanded to show row detail data
	data?: any;
	srvEvents?: EventSubscription; //custom events
	defSrvEvents?: boolean; //use default events
	expandRowComponent?: { comp: VueComponent, compProps?: VueComponentProps};
	expandedClass?: string;
}

export interface GridCurrentCell {
	row: number;
	col: number;
}

export interface GridCurrentSorting {
	col: string; //grid column
	sortCol?: string; //actual sorting column
	order: GridColSortOrder;
}

export interface GridCmdProps {
	cell: GridCurrentCell;
}

export interface GridPaginationProps {
	showPages: number;
	rowsPerPage: number;
}

export type GridCommandResolve = (err: string) => void;

export type GridDetailState = {
	mode?: string;
	defaultValues?: Record<string, any>;
	collectionRoute?: string;
};

export type GridRowDrag = {
	source: {
		gridKey: string;
		index: number;
		data: FormData;
	};
	target?: {
		gridKey: string;
		index: number;
		data: FormData;
	};
};
