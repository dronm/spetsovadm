import { defineStore } from "pinia";
import { ref } from "vue";

export const useDragStore = defineStore("drag", () => {
	const draggingItem = ref<any | null>(null);
	const dragFinished = ref(false);
	const dragKey = ref("");

	function startDrag(key: string, item: any) {
		dragKey.value = key;
		draggingItem.value = item;
		dragFinished.value = false;
	}

	function finishDrag() {
		dragFinished.value = true;
		// console.log("finishDrag for key:"+dragKey.value)
	}

	function clearDrag() {
		dragKey.value = "";
		draggingItem.value = null;
		dragFinished.value = false;
	}

	return {
		draggingItem,
		dragKey,
		dragFinished,
		startDrag,
		finishDrag,
		clearDrag,
	};
});
