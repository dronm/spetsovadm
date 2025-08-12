<template>
	<Grid
		ref="gridRef"
		:grid-key="gridKey"
		:edit="edit"
		:for-select="mainViewId !== undefined"
		:show-header="showHeader"
		:multy-select="multySelect"
		:row-select="rowSelect"
		:navigate="navigate"
		:draggable="draggable"
		:mouse-popup="mousePopup"
		:title="title"
		:commands="commands"
		:columns="columns"
		:foot-columns="footColumns"
		:key-fields="keyFields"
		:inline-insert-place="inlineInsertPlace"
		:type-formatter="typeFormatter"
		:refresh-interval="gridRefreshInterval"
		:store="store"
		:show-pages="showPages"
		:format-row-class="formatRowClass"
		:expand="expand"
		:error="error"
		@select="onSelect"
		@custom="customEventHandler"
		@save-state="$emit('saveState')"
		@drop="($e: any) => emit('drop', $e)"
		@drag-end="($e: any) => emit('dragEnd', $e)"
		@drag-finished="($e: any) => emit('dragFinished', $e)"
	>
		<template v-slot:noData>
		  <slot name="noData" />
		</template>
	</Grid>

	<div v-if="mainViewId" class="container-cmd">
		<Button :title="$t('GridView.selectBtn.title')" @click="onSelectBtnClick">
			{{ $t("GridView.selectBtn.caption") }}
		</Button>

		<Button :title="$t('GridView.cancelBtn.title')" @click="closeView">
			{{ $t("GridView.cancelBtn.caption") }}
		</Button>
	</div>
</template>

<script setup lang="ts">
//Selectable grid window.
import { ref, watch, toRaw, type Ref, onMounted, computed, inject, onUnmounted } from "vue";
import { useRoute } from "vue-router";

import Grid, { type GridExpose } from "./Grid.vue";
import Button from "./Button.vue";

import { type GridProps, type GridRowDrag, GridInlineInsertPlace } from "../types/grid";
import type { EventSubscription, WSManager } from "../services/wsManager";
import { GridSrvOperation } from "../types/gridSrv";

//
const {
	gridKey,
	keyFields,
	edit,
	showHeader = true,
	multySelect = true,
	rowSelect = false,
	navigate = { mouse: true, keyboard: true },
	draggable,
	mousePopup,
	title,
	commands,
	columns,
	footColumns,
	inlineInsertPlace = GridInlineInsertPlace.first,
	typeFormatter,
	refreshInterval = 0,
	store,
	showPages = 3,
	formatRowClass,
	expand,
	error,
	defSrvEvents = true,
	srvEvents,
} = defineProps<GridProps>();

const mainViewId = ref<string | undefined>(undefined); //main form ID to communicate with through a broadcastChannel

const route = useRoute();
watch(
	() => route.query["view-id"],
	(newViewId: string) => {
		//: string | string[] | undefined
		mainViewId.value = typeof newViewId === "string" ? newViewId : undefined;
	},
	{ immediate: true },
);

const closeView = () => {
	if (window.opener) {
		window.opener.postMessage({ viewId: mainViewId.value, selectData: undefined }, "*");
	} else {
		window.close();
	}
};

//button select event
const onSelectBtnClick = (e: KeyboardEvent) => {
	if (gridRef.value) {
		onSelect(gridRef.value.getCurrentCell()?.row ?? 0);
	}
};

const gridRef = ref<GridExpose | null>(null);

//make selection, currentCell holds the row
const onSelect = (selectedRow: number) => {
	if (window.opener) {
		// console.log(`GridView.onSelect, cell:`, selectedRow);
		const row = toRaw(store.getRow(selectedRow));
		// console.log('GridView.onSelect row:', row);
		window.opener.postMessage(
			{ viewId: mainViewId.value, selectData: structuredClone(row) },
			"*",
		);
	} else {
		window.close();
	}
};

const emit = defineEmits<{
	gridEvent: [params: any];
	saveState: [];
	drop: [dragData: GridRowDrag];
	dragEnd: [dragData: GridRowDrag];
	dragFinished: [dragData: GridRowDrag];
}>();

const customEventHandler = (params: any) => {
	emit("gridEvent", params);
};

const useWSManager = () => {
	return inject("wsManager") as WSManager;
};
const ws = useWSManager();
// const eventsExist = computed(() => srvEvents && srvEvents.events.length);
// const gridRefreshInterval = computed( () => (ws && (defSrvEvents || eventsExist.value))? undefined : refreshInterval );
const gridRefreshInterval = ref<number | undefined>(refreshInterval);

let gridSrvEventGroupId: string | undefined;

onMounted(() => {
	if (ws) {
		let gridEvents: Array<string> = [];
		if (srvEvents) {
			//custom events
			gridEvents = JSON.parse(JSON.stringify(srvEvents.events));
		}
		//add default events
		if (defSrvEvents && store && store.srvOperations.value) {
			console.log("adding default events");
			for (const op of Object.values(GridSrvOperation)) {
				if (store.srvOperations.value[op]) {
					const evId = store.srvOperations.value[op].id;
					gridEvents.push(evId);
				}
			}
		}

		const gridSrvEvents = <EventSubscription>{
			events: gridEvents,
			onEvent: srvEvents?.onEvent ?? onSrvEvent,
			onSubscribed: srvEvents?.onSubscribed ?? onSrvSubscribed,
			onClose: srvEvents?.onClose ?? onSrvClose,
			onWakeup: srvEvents?.onClose ?? onSrvWakeup,
		};
		gridSrvEventGroupId = ws.subscribe(gridSrvEvents);
	}
});

onUnmounted(() => {
	if (ws && gridSrvEventGroupId) {
		ws.unsubscribe(gridSrvEventGroupId);
	}
});

const onSrvWakeup = () => {
	// refreshInterval
};
const onSrvSubscribed = () => {
	gridRefreshInterval.value = undefined; //do not use interval for refreshing
};
const onSrvClose = (msg: any) => {
	if (msg && msg.code && msg.code > 1000) {
		gridRefreshInterval.value = refreshInterval;
	}
};
const onSrvEvent = (eventId: string, params: any) => {
	console.log("GridView event: " + eventId, params);
	//if parameter includes a key - check if it is in the set
	//otherwise just refresh
	// if(keyFields && store && params !== undefined && params !== null
	// 	&& (eventId == "Update" || eventId == "Delete")
	// ){
	// 	let rowFound = false;
	// 	const eventKeys = <Record<string, any>>{};
	// 	keyFields.forEach((keyId: string) => {
	// 		if(Array.isArray(params)) {
	// 			params.forEach((par) => {
	// 				if(par[keyId] != undefined){
	// 					eventKeys[keyId] = par[keyId];
	// 				}
	// 			});
	// 		}else if(params[keyId] != undefined){
	// 			eventKeys[keyId] = params[keyId];
	// 		}
	// 	});
	// 	if(Object.keys(eventKeys).length && store.displayedData.value){
	// 		rowFound = (store.displayedData.value.filter((row: any) => {
	// 			for(const key of Object.keys(eventKeys)){
	// 				return (row[key] != undefined && row[key] == eventKeys[key]);
	// 			}
	// 		}).length > 0);
	// 		if(!rowFound){
	// 			return; //do nothing: got key that does not exist in set
	// 		}
	// 	}
	// }
	gridRef.value?.onRefresh();
};

// const editRow = () => {
//   let editRow: any;
//   if(gridRef.value?.isInsertMode.value){
//     editRow = gridRef.editFormPreInsertRef.editRow;
//   }else{
//     editRow = gridRef.editFormUpdateRef[0].editRow;
//   }
// }

export interface GridViewExpose {
	gridRef: GridExpose; //Ref;
	// editRow: () => ;
}
defineExpose<GridViewExpose>({ gridRef });

</script>
