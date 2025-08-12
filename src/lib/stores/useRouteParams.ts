import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouteParamsStore = defineStore("routeParams", () => {
	const params = ref<Record<string, any>>({});

	return {
		params,
	};
});
