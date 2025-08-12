import type { Ref, ShallowRef, ComputedRef } from "vue";

import {
	type GridCol,
	type GridCommandResolve,
	type GridCurrentSorting,
	GridColSortOrder,
} from "./grid";
import { type FormData } from "./form";
import { type CollectionFilter } from "../types/collection";
import { type SortColumnList } from "./collectionStore";

export interface CollectionLocal {
	editRow: Ref<FormData>;
	currentPage: Ref<number>;
	rowsPerPage: Ref<number>;
	// srvOperations: Ref<GridSrvOperations | undefined>;
	currentSort: Ref<GridCurrentSorting | undefined>;
	columnSorting: Ref<SortColumnList>;
	columnList: ShallowRef<GridCol[]>;

	fetchLoading: Ref<boolean>;

	// setCurrentPage(page: number, resolve: GridCommandResolve): void;
	setCurrentPage(page: number): void;
	setRowsPerPage(size: number): void;
	// setSrvOperations(operations: GridSrvOperations): void;
	setCurrentSort(sort: GridCurrentSorting): void;
	setInsertRowMode(): void;
	setUpdateRowMode(rowIndex: number): void;
	setCopyRowMode(sourceRowIndex: number): void;
	setColumns(columns: GridCol[][] | GridCol[], kFields: string[]): void;
	updateRow(
		submitRow: FormData,
		editRow: FormData,
		rowIndex: number,
		resolve: GridCommandResolve,
	): void;
	insertRow(submitRow: FormData, editRow: FormData, resolve: GridCommandResolve): void;
	deleteRows(rowIndexes: number[], resolve: GridCommandResolve): void;
	applySort(resolve: GridCommandResolve): void;
	refresh(resolve: GridCommandResolve): void;
	printCollection(resolve: GridCommandResolve): void;
	rowCount: ComputedRef<number | undefined>;
	getRow(index: number): FormData | undefined;
	getRowKeys(index: number): any; //keys pairs: key:value
	displayedData: Ref<FormData[] | undefined>;
	totalPages: ComputedRef<number | undefined>;
	fromRow: ComputedRef<number | undefined>;
	setData(data: any): void;
	addFilter(filter: CollectionFilter): string;
	setFilter(id: string, filter: CollectionFilter): void;
	removeFilter(filterId: string): void;
	getFilters(): Record<string, CollectionFilter> | undefined;
	setFilters(f: Record<string, CollectionFilter> | undefined): void;
}
