import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { SortField } from "../types/collection.ts";

type CollectionSortings = Record<string, SortField>;

export const useCollectionSortStore = defineStore("collectionSort", () => {
	// Load sortings from session storage or initialize an empty object
	const sessionKey = "collectionSortings";
	const sortings = ref<CollectionSortings>(
		JSON.parse(sessionStorage.getItem(sessionKey) || "{}"),
	);

	// Save sortings back to session storage whenever they are updated
	const saveToSession = () => {
		sessionStorage.setItem(sessionKey, JSON.stringify(sortings.value));
	};

	// Retrieve sortings for a specific collection ID, using a default if needed
	const getSorting = (collectionId: string, defaultValue: SortField) => {
		if (!sortings.value[collectionId]) {
			sortings.value[collectionId] = defaultValue;
			saveToSession();
		}
		return sortings.value[collectionId];
	};

	// Set sortings for a specific collection ID
	const setSorting = (collectionId: string, newSorting: SortField) => {
		sortings.value[collectionId] = newSorting;
		saveToSession();
	};

	// Get a reactive computed store for a specific collection ID
	const getCollectionStore = (collectionId: string, defaultValue: SortField) => {
		const collectionSortings = computed(() => getSorting(collectionId, defaultValue));
		return {
			collectionSortings,
			setSortings: (newSorting: SortField) =>
				setSorting(collectionId, newSorting),
		};
	};

	return {
		getSorting,
		setSorting,
		getCollectionStore,
	};
});
