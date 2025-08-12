/*
 * MIT License
 *
 * Copyright (c) 2025 Andrey Mikhalevich
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 */

//----- imports -----
import { ref, computed, toRaw } from "vue";

import {
	type GridCommandResolve,
	type GridCol,
	type GridCurrentSorting,
	GridColSortOrder,
} from "../types/grid";
import { GridSrvOperation, type GridSrvOperations } from "../types/gridSrv";
import { APIError } from "../services/Conn";
import {
	type AggData,
	type CollectionParams,
	type CollectionFilter,
	SortDirect,
	FilterOperatorParam,
} from "../types/collection";
import type { APICall } from "../types/apiCall";
import { flattenColumnList } from "../utils/useGrid";
import { type FormData } from "../types/form";
import { type SortColumnList } from "../types/collectionStore";
import { type FetchArgsFunc, type CollectionAPI } from "../types/collectionAPI";
import { DataType } from "../types/dataTypes";

//----- main -----
export function useCollectionAPI(): CollectionAPI {
	const editRow = ref<FormData>({});
	const currentPage = ref(1);
	const rowsPerPage = ref(0);
	const currentSort = ref<GridCurrentSorting | undefined>(undefined);
	const srvOperations = ref<GridSrvOperations | undefined>();

	const columnSorting = ref<SortColumnList>({});
	const columnList = ref<GridCol[]>([]); //could contain vue components in editControl!
	const keyFields = ref<string[]>([]);

	const fetchParams = ref<CollectionParams>({}); //these params are added to insert/update/delete queries
	const filters = ref<Record<string, CollectionFilter> | undefined>(undefined); //dynamic filters

	const displayedData = ref<FormData[] | undefined>(undefined);
	const aggData = ref<AggData | undefined>(undefined);
	const fetchLoading = ref<boolean>(false);

	const fetchArgs = ref<null | FetchArgsFunc>(null);

	const setColumns = (columns: GridCol[][] | GridCol[], kFields: string[]) => {
		if (columns.length && Array.isArray(columns[0])) {
			columnList.value = flattenColumnList(columns as GridCol[][]); //flatten list
		} else {
			columnList.value = columns as GridCol[];
		}
		keyFields.value = kFields;

		columnSorting.value = {};
		columnList.value.forEach((col: GridCol) => {
			if (col.sort === false) {
				return;
			}
			columnSorting.value[col.id] =
				currentSort.value && currentSort.value.col === col.id
					? currentSort.value.order
					: (col.sort as GridColSortOrder) || GridColSortOrder.asc; //default
		});
	};

	const operationError = (e: any, resolve: GridCommandResolve) => {
		let msg = "";
		if (e instanceof APIError) {
			msg = e.message || "unknown HTTP error";
		} else if (e.message) {
			msg = e.message;
		} else {
			msg = "unknown error";
		}
		resolve(msg);
	};

	//returns fucntion for server operation.
	//throws error if no function exists.
	const checkOperation = (oper: GridSrvOperation): APICall => {
		if (!srvOperations.value || srvOperations.value[oper] === undefined) {
			throw new Error(`operation ${oper} is not defined on grid component`);
		}
		//how to check if it is a function
		// console.log(srvOperations.value[oper] instanceof Function) // instanceof Function
		// console.log(typeof srvOperations.value[oper]) // instanceof Function
		return srvOperations.value[oper];
	};

	//this call uses a different composable function for fetching collections.
	const fetchCollection = async () => {
		// +filters, sortings
		const params = fetchParams.value;
		if (rowsPerPage.value) {
			params.from = fromRow.value;
			params.count = rowsPerPage.value;
		}
		if (currentSort.value != undefined) {
			params.sorter = [
				{
					f: currentSort.value.sortCol ?? currentSort.value.col,
					d:
						currentSort.value.order == GridColSortOrder.asc
							? SortDirect.ASC
							: SortDirect.DESC,
				},
			];
		}
		const apiCall = checkOperation(GridSrvOperation.list);
		fetchLoading.value = true;
		try {
			let args: any[] = [];
			if (fetchArgs.value !== null) {
				args = fetchArgs.value(params);
			} else {
				args.push(params);
			}

			const result = await apiCall.func(...args);

			displayedData.value = result?.data;
			aggData.value = result?.agg;
		} finally {
			fetchLoading.value = false;
		}
	};

	const setFetchArgs = (f: FetchArgsFunc) => {
		fetchArgs.value = f;
	};

	const setRowsPerPage = (rows: number) => {
		rowsPerPage.value = rows;
	};

	const setSrvOperations = (operations: GridSrvOperations) => {
		srvOperations.value = operations;
	};

	const setCurrentSort = (sort: GridCurrentSorting) => {
		currentSort.value = sort;
	};

	const setFetchParams = (params: CollectionParams) => {
		fetchParams.value = params;
		filters.value = undefined; //unset
	};

	const getFetchParams = () => fetchParams.value;

	const addFilter = (filter: CollectionFilter): string => {
		const newFilterId =
			Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
		setFilter(newFilterId, filter);
		return newFilterId;
	};

	const setFilter = (id: string, filter: CollectionFilter): void => {
		if (!fetchParams.value.filter) {
			fetchParams.value.filter = <CollectionFilter[]>[];
		}
		fetchParams.value.filter.push(filter);
		if (!filters.value) {
			filters.value = {};
		}
		filters.value[id] = filter;
	};

	const removeFilter = (filterId: string): void => {
		if (filters.value && filters.value[filterId]) {
			const filter = filters.value[filterId];
			if (fetchParams.value && fetchParams.value.filter) {
				fetchParams.value.filter = fetchParams.value.filter.filter(
					(f:CollectionFilter) => f !== filter,
				);
			}
			delete filters.value[filterId];
		}
	};

	const getFilters = (): Record<string, CollectionFilter> | undefined => {
		return filters.value;
	};

	const setFilters = (f: Record<string, CollectionFilter> | undefined): void => {
		filters.value = f;
	};

	const setEditRowDefaults = () => {
		columnList.value.forEach((col:GridCol) => {
			if (
				(col.editable === undefined || col.editable !== false) &&
				(!editRow.value[col.id] || editRow.value[col.id] === undefined)
			) {
				// const fld = (col.field && col.field.writeBind)? col.field?.writeBind : col.id;
				if (
					col.defaultValue != undefined &&
					typeof col.defaultValue == "function"
				) {
					editRow.value[col.id] = col.defaultValue();
				} else {
					editRow.value[col.id] = col.defaultValue;
				}
			}
		});
	};

	const setInsertRowMode = () => {
		Object.keys(editRow.value).forEach((key) => delete editRow.value[key]);
		setEditRowDefaults();
		//+fetch params
		if (fetchParams.value?.filter) {
			// type oKeys = <Record<string, {keys: Record<string, string|number|Date|undefined> }>>;
			// const refFields = <oKeys>{};
			// columnList.value.filter(
			// 	(col: GridCol) => col.field?.dataType === DataType.ref && col.field?.writeBind
			// ).forEach(
			// 	(col:GridCol) => {
			// 		if(typeof col.field?.writeBind === "string"){
			// 			return { [col.field?.writeBind]: {keys: <oKeys>{}} };
			// 		}else{
			// 			//object with key mappings
			// 			const o = col.field?.writeBind as Record<string,string>;
			// 			const fieldRef = { keys: <oKeys>{}  };
			// 			for (const key of Object.keys(o)) {
			// 				fieldRef.keys[key] = undefined;
			// 			}
			// 			return fieldRef;
			// 		}
			// 		// <Record<string,string>>{ [col.field?.writeBind]: "" }
			// 	}
			// );
			// console.log("refFields",refFields)

			fetchParams.value.filter.forEach((filter:CollectionFilter) => {
				Object.entries(filter.f).forEach(([key, field]) => {
					if (field.o === FilterOperatorParam.E) {
						//key is a fieldID and column can be a Ref with writeBind:fieldID || keyMaps
						// editRow.value[key] = (refFields[key])? refFields[key] : field.v;
						editRow.value[key] = field.v;
					}
				});
			});
		}
	};

	const setUpdateRowMode = (rowIndex: number) => {
		if (!displayedData.value) {
			return;
		}
		editRow.value = structuredClone(toRaw(displayedData.value[rowIndex]));
	};

	const setCopyRowMode = (sourceRowIndex: number) => {
		if (!displayedData.value) {
			return;
		}
		editRow.value = structuredClone(toRaw(displayedData.value[sourceRowIndex]));
		columnList.value.forEach((col: GridCol) => {
			if (col.field?.srvCalc === true) {
				delete editRow.value[col.id];
			} else if (col.defaultValue !== undefined) {
				if (typeof col.defaultValue == "function") {
					editRow.value[col.id] = col.defaultValue();
				} else {
					editRow.value[col.id] = col.defaultValue;
				}
			}
		});
	};

	const updateRow = async (
		submitData: FormData,
		editData: FormData,
		rowIndex: number,
		resolve: GridCommandResolve,
	) => {
		try {
			const apiCall = checkOperation(GridSrvOperation.update);
			const keys = getRowKeys(rowIndex);
			await apiCall.func(keys, submitData); //server update
			//no refesh, just copy data to all data
			let needResort = false;
			// Object.keys(editRow.value).forEach((f: string) => {
			Object.keys(editData).forEach((f: string) => {
				if (displayedData.value) {
					//in case of inline edit
					displayedData.value[rowIndex][f] = editData[f]; //in case of inline edit
				}
				//in case of not closing edit form ??? check
				editRow.value[f] = editData[f];

				//if sort column has changed, then should resort!!!
				if (currentSort.value?.col === f) {
					needResort = true;
				}
			});
			if (displayedData.value) {
				displayedData.value = [...displayedData.value];
			}
			if (needResort) {
				// await fetchCollection();
				localSort();
			}
			resolve("");
		} catch (e) {
			operationError(e, resolve);
		}
	};

	const insertRow = async (
		submitData: FormData,
		editData: FormData,
		resolve: GridCommandResolve,
	) => {
		try {
			const apiCall = checkOperation(GridSrvOperation.insert);
			const srvFields = await apiCall.func(submitData); //server insert, get server calculated fields
			if(srvFields){
				Object.keys(srvFields).forEach(
					(f: string) => {
						editData[f] = srvFields[f];
					}
				);
			}
			if (!displayedData.value) {
				displayedData.value = [];
			}
			displayedData.value.push(editData); //submitData
			if (aggData.value && aggData.value.tot_count !== undefined) {
				aggData.value.tot_count++;
			}
			//for save case without closing edit form
			Object.keys(editData).forEach(
				(f: string) => (editRow.value[f] = editData[f]),
			);

			//resorting!!!
			localSort();
			// await fetchCollection();
			resolve("");
		} catch (e) {
			operationError(e, resolve);
		}
	};

	const deleteRows = async (rowIndexes: number[], resolve: GridCommandResolve) => {
		try {
			const keyList = [];
			for (let i = 0; i < rowIndexes.length; i++) {
				// const keys = useRowKeys(rowIndexes[i], columnList.value, displayedData.value);
				const keys = getRowKeys(rowIndexes[i]);
				keyList.push(keys);
			}
			const apiCall = checkOperation(GridSrvOperation.delete);
			await apiCall.func(keyList); //api call
			// await fetchCollection();
			const indexesSet = new Set(rowIndexes);
			if (displayedData.value) {
				displayedData.value = displayedData.value.filter(
					(_:any, index: number) => !indexesSet.has(index),
				);
			}
			if (aggData.value && aggData.value.tot_count !== undefined) {
				aggData.value.tot_count--;
			}
			localSort();
			resolve("");
		} catch (e) {
			operationError(e, resolve);
		}
	};

	const localSort = () => {
		if (!displayedData.value || !currentSort.value) {
			return;
		}
		const key = currentSort.value.col;
		const asc = currentSort.value.order === GridColSortOrder.asc;

		displayedData.value = [...displayedData.value].sort((a, b) => {
			const valA = a[key];
			const valB = b[key];

			// Handle null or undefined values
			if (valA == null) return asc ? 1 : -1;
			if (valB == null) return asc ? -1 : 1;

			if (typeof valA === "string" && typeof valB === "string") {
				return asc
					? valA.localeCompare(valB, "en", { sensitivity: "base" })
					: valB.localeCompare(valA, "en", { sensitivity: "base" });
			}

			// Sort numbers properly
			if (typeof valA === "number" && typeof valB === "number") {
				return asc ? valA - valB : valB - valA;
			}

			return 0; // Default case if types do not match
		});
	};

	const applySort = async (resolve: GridCommandResolve) => {
		refresh(resolve);
	};

	const refresh = async (resolve: GridCommandResolve) => {
		try {
			await fetchCollection();
			resolve("");
		} catch (e) {
			operationError(e, resolve);
		}
	};

	const printCollection = (resolve: GridCommandResolve) => {
		console.log("print collection stub");
	};

	const getRow = (index: number) =>
		displayedData.value ? displayedData.value[index] : undefined;

	//getRowKeys returns keys for a given row index. Keys is a structure
	//where name is a key and value is a key value.
	const getRowKeys = (index: number) => {
		const keys = <FormData>{};
		if (!displayedData.value) {
			return;
		}
		if (keyFields.value) {
			keyFields.value.forEach((f: string) => {
				if (displayedData.value) {
					keys[f] = displayedData.value[index][f];
				}
			});
		} else {
			columnList.value.forEach((col: GridCol) => {
				if (col.field?.pKey === true && displayedData.value) {
					keys[col.id] = displayedData.value[index][col.id];
				}
			});
		}
		return keys;
	};

	const rowCount = computed<number | undefined>(() => aggData.value?.tot_count);

	const totalPages = computed<number | undefined>(() =>
		rowsPerPage.value && rowCount.value
			? Math.ceil(rowCount.value / rowsPerPage.value)
			: 1,
	);

	const fromRow = computed<number | undefined>(() =>
		rowsPerPage.value ? (currentPage.value - 1) * rowsPerPage.value : 0,
	);

	// const setCurrentPage = (page: number, resolve: GridCommandResolve) => {
	// 	currentPage.value = page;
	// 	refresh(resolve);
	// };
	const setCurrentPage = (page: number) => {
		currentPage.value = page;
	};

	const setData = (newData: any) => {};

	return {
		editRow,
		currentPage,
		rowsPerPage,
		srvOperations,
		currentSort,
		columnList,
		columnSorting,
		setCurrentPage,
		setRowsPerPage,
		setSrvOperations,
		setCurrentSort,
		setFetchParams,
		getFetchParams,
		setInsertRowMode,
		setUpdateRowMode,
		setCopyRowMode,
		setColumns,
		updateRow,
		insertRow,
		deleteRows,
		applySort,
		refresh,
		printCollection,
		rowCount,
		getRow,
		getRowKeys,
		displayedData,
		fetchLoading,
		aggData,
		totalPages,
		fromRow,
		setFetchArgs,
		addFilter,
		setFilter,
		removeFilter,
		getFilters,
		setFilters,
		setData,
	};
}
