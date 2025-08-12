// stores/gridUIStore.ts
import { reactive } from "vue";
import { defineStore } from "pinia";

import { type GridCurrentCell, type GridCurrentSorting } from "../types/grid";
import type { CollectionFilter } from "../types/collection";
import type { GridSearchPanelVal } from "../types/GridSearchPanel";

type GridFilter = {
	filters: Record<string, CollectionFilter>;
	panels: GridSearchPanelVal[];
};

type GridState = {
	currentPage: number;
	currentCell: GridCurrentCell | null;
	filter: GridFilter | null;
	restoreOnNextLoad?: boolean;
	sorting: GridCurrentSorting | null;
	selectedRows: Set<number>;
	expandedRows: Set<number>;
};

export const useGridStore = defineStore("gridUI", () => {
	const gridStates = reactive<Record<string, GridState>>({});

	function saveState(key: string, state: GridState) {
		gridStates[key] = state;
		gridStates[key].restoreOnNextLoad = true;
	}

	function clearState(key: string) {
		delete gridStates[key];
	}

	function getState(key: string): GridState | undefined {
		return gridStates[key];
	}

	return {
		saveState,
		clearState,
		getState,
	};
});
