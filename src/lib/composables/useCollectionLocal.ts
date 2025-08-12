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
import { ref, computed, shallowRef, toRaw, watch } from "vue";
// import { Ref } from 'vue';

import {
	type GridCommandResolve,
	type GridCol,
	type GridCurrentSorting,
	GridColSortOrder,
} from "../types/grid";
import { flattenColumnList } from "../utils/useGrid";
import { type FormData } from "../types/form";
import { type CollectionLocal  } from "../types/collectionLocal";
import { SortColumnList } from "../types/collectionStore";
import { type CollectionFilter } from "../types/collection";
//----- main -----
//Ref<FormData[]|undefined>
export function useCollectionLocal(data: any): CollectionLocal {
	// if (!data || !Array.isArray(data.value)) {
	// 	data = ref([]);
	// }
	// Ensure data stays an array when updated from API
	watch(
		data,
		(newValue) => {
			console.log("data is changed to", newValue);
			if (!newValue || !Array.isArray(newValue)) {
				data.value = []; // Convert `null` or other invalid values to an array
			}
		},
		{ immediate: true },
	);

	const editRow = ref<FormData>({});
	const currentPage = ref(1);
	const rowsPerPage = ref(0);
	const currentSort = ref<GridCurrentSorting | undefined>(undefined);

	const columnSorting = ref<SortColumnList>({});
	const columnList = shallowRef<GridCol[]>([]); //could contain vue components in editControl!
	const keyFields = ref<string[]>([]);

	const fetchLoading = ref<boolean>(false); //just a stub in local grid

	const displayedData = computed<FormData[]>(() => {
		if (!data.value) return undefined;
		if (!rowsPerPage.value) return data.value;

		const start = fromRow.value ?? 0; // Ensure start is at least 0
		return data.value.slice(start, start + rowsPerPage.value);
	});

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

	const setCurrentPage = (page: number) => {
		currentPage.value = page;
	};

	const setRowsPerPage = (rows: number) => {
		rowsPerPage.value = rows;
	};

	const setCurrentSort = (sort: GridCurrentSorting) => {
		currentSort.value = sort;
	};

	const setEditRowDefaults = () => {
		columnList.value.forEach((col) => {
			if (
				(col.editable === undefined || col.editable !== false) &&
				(!editRow.value[col.id] || editRow.value[col.id] === undefined)
			) {
				if (
					col.defaultValue != undefined &&
					typeof col.defaultValue == "function"
				) {
					editRow.value[col.id] = col.defaultValue(data.value);
				} else {
					editRow.value[col.id] = col.defaultValue;
				}
			}
		});
	};

	const setInsertRowMode = () => {
		Object.keys(editRow.value).forEach((key) => delete editRow.value[key]);
		setEditRowDefaults();
	};

	const setUpdateRowMode = (rowIndex: number) => {
		editRow.value = structuredClone(toRaw(displayedData.value[rowIndex]));
	};

	const setCopyRowMode = (sourceRowIndex: number) => {
		// Object.assign(editRow.value, displayedData.value[sourceRowIndex]);
		editRow.value = structuredClone(toRaw(displayedData.value[sourceRowIndex]));
		columnList.value.forEach((col: GridCol) => {
			if (col.field?.srvCalc === true) {
				delete editRow.value[col.id];
			} else if (col.defaultValue !== undefined) {
				if (typeof col.defaultValue == "function") {
					editRow.value[col.id] = col.defaultValue(data.value);
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
		if (!data.value) return;

		// Find the actual index in data.value
		const globalIndex = (fromRow.value ?? 0) + rowIndex;
		if (globalIndex >= 0 && globalIndex < data.value.length) {
			//newRow has only modified data, we need all!
			data.value[globalIndex] = { ...editRow.value, ...editData };
		}

		resolve("");
	};

	const insertRow = async (
		submitData: FormData,
		editData: FormData,
		resolve: GridCommandResolve,
	) => {
		if (!Array.isArray(data.value)) {
			data.value = []; // Convert `null` or `undefined` to an empty array
		}

		data.value.push(editData);
		localSort(); // Re-sort after insertion
		resolve("");
	};

	const deleteRows = async (rowIndexes: number[], resolve: GridCommandResolve) => {
		if (!data.value) return;

		// Convert local rowIndexes to global indexes
		const globalIndexes = rowIndexes.map((i) => (fromRow.value ?? 0) + i);
		const indexesSet = new Set(globalIndexes);

		// Remove matching rows from data.value
		data.value = data.value.filter((_: any, index: number) => !indexesSet.has(index));

		localSort(); // Re-sort after deletion
		resolve("");
	};

	const localSort = () => {
		const key = currentSort.value?.col;
		const asc = currentSort.value?.order === GridColSortOrder.asc;
		if (!key) {
			return;
		}
		return displayedData.value.sort((a, b) => {
			if (!a[key] || !b[key]) {
				return 0;
			}
			if (a[key] < b[key]) return asc ? -1 : 1;
			if (a[key] > b[key]) return asc ? 1 : -1;
			return 0;
		});
	};

	const applySort = async (resolve: GridCommandResolve) => {
		refresh(resolve);
	};

	//stub
	const refresh = async (resolve: GridCommandResolve) => {};

	const printCollection = (resolve: GridCommandResolve) => {
		console.log("print collection stub");
	};

	const getRow = (index: number) => displayedData.value[index];

	//getRowKeys returns keys for a given row index. Keys is a structure
	//where name is a key and value is a key value.
	const getRowKeys = (index: number) => {
		const keys = <Record<string, any>>{};
		if (keyFields.value) {
			keyFields.value.forEach((f: string) => {
				keys[f] = displayedData.value[index][f];
			});
		} else {
			columnList.value.forEach((col: GridCol) => {
				if (col.field?.pKey === true) {
					keys[col.id] = displayedData.value[index][col.id];
				}
			});
		}
		return keys;
	};

	const rowCount = computed<number | undefined>(() => data.value?.length);

	const totalPages = computed<number | undefined>(() =>
		rowsPerPage.value ? Math.ceil(rowCount.value ?? 0 / rowsPerPage.value) : 1,
	);

	const fromRow = computed<number>(() =>
		rowsPerPage.value ? (currentPage.value - 1) * rowsPerPage.value : 0,
	);

	const setData = (newData: any) => {
		data.value = newData;
	};

	const addFilter = (filter: CollectionFilter): string => {
		return "";
	};

	const setFilter = (id: string, filter: CollectionFilter): void => {};

	const removeFilter = (filterId: string): void => {};
	const getFilters = (): Record<string, CollectionFilter> | undefined => {
		return undefined;
	};
	const setFilters = (filters: Record<string, CollectionFilter> | undefined): void => {};

	return {
		editRow,
		currentPage,
		rowsPerPage,
		currentSort,
		columnList,
		fetchLoading,
		columnSorting,
		setCurrentPage,
		setRowsPerPage,
		setCurrentSort,
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
		totalPages,
		fromRow,
		setData,
		addFilter,
		setFilter,
		setFilters,
		removeFilter,
		getFilters,
	};
}
