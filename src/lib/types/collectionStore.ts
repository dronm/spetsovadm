import type { Ref, ShallowRef, ComputedRef } from "vue";

import {
	type GridCol,
	type GridCommandResolve,
	type GridCurrentSorting,
	GridColSortOrder,
} from "./grid";
import { type FormData } from "./form";
import { type GridSrvOperations } from "./gridSrv";
import { type AggData, type CollectionParams } from "./collection";

export interface CollectionStore {
	editRow: Ref<FormData>;
	currentPage: Ref<number>;
	rowsPerPage: Ref<number>;
	srvOperations: Ref<GridSrvOperations | undefined>;
	currentSort: Ref<GridCurrentSorting | undefined>;
	columnSorting: Ref<SortColumnList>;
	columnList: ShallowRef<GridCol[]>;
	fetchLoading: Ref<boolean>;

	setCurrentPage(page: number): void;
	setRowsPerPage(size: number): void;
	setSrvOperations(operations: GridSrvOperations): void;
	setCurrentSort(sort: GridCurrentSorting): void;
	setFetchParams(params: CollectionParams): void;
	setInsertRowMode(): void;
	setUpdateRowMode(rowIndex: number): void;
	setCopyRowMode(sourceRowIndex: number): void;
	setColumns(columns: GridCol[][], kFields: string[]): void;
	setData(newData: FormData[]): void;
	updateRow(newRow: FormData, rowIndex: number, resolve: GridCommandResolve): void;
	insertRow(newRow: FormData, resolve: GridCommandResolve): void;
	deleteRows(rowIndexes: number[], resolve: GridCommandResolve): void;
	applySort(resolve: GridCommandResolve): void;
	refresh(resolve: GridCommandResolve): void;
	printCollection(resolve: GridCommandResolve): void;
	rowCount: ComputedRef<number | undefined>;
	getRow(index: number): FormData | undefined;
	getRowKeys(index: number): any; //keys pairs: key:value
	displayedData: Ref<FormData[] | undefined>;
	aggData: Ref<AggData | undefined>;
	totalPages: ComputedRef<number | undefined>;
	fromRow: ComputedRef<number | undefined>;
}

export interface SortColumnList {
	[key: string]: GridColSortOrder;
}
