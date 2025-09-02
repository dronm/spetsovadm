//----- template -----
<template>
	<!--
	<CollectionTitle :title="
			$t(
				parentData
					? 'ProductCatList.subCatTitle'
					: 'ProductCatList.title',
			)
	" />
-->
	<GridView
		ref="gridViewRef"
		:grid-key="
			parentData ? 'productCatList_' + parentData.id : 'productCatList'
		"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:show-header="false"
		:columns="columns"
		:commands="commands"
		:store="gridStore"
		:edit="{
			mode: GridEditMode.router,
			routeName: 'productCatDetail',
			routeCollectionName: returnCollectionName,
		}"
		:expand="{ comp: ProductCatHierarchy }"
		:navigate="{ mouse: false, keyboard: false }"
		:expandRowComponent="{ comp: ProductCatHierarchyExpand }"
		expandedClass="pl-[32px]"
		:error="error"
		:draggable="true"
		@drop="handleDrop"
		@dragFinished="handleDragFinished"
		@grid-event="handleGridEvent"
		:mouse-popup="defGridPopup()"
	>
		<template v-slot:noData v-if="!parentData">
			<GridNoData 
				:caption="$t('ProductCatList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>

	</GridView>
</template>

<script setup lang="ts">
//ProductCatList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { type GridExpose } from '@/lib/components/Grid.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol, GridCommand, GridRowDrag } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';

import {
	useNotificationStore,
	MessageType,
} from '@lib//stores/useNotificationStore';
import { useDragStore } from '@/lib/stores/useDragStore';

import { COLLECTION_SHOW_PAGES } from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';
import ProductCatHierarchy from './ProductCatHierarchy.vue';
import ProductCatHierarchyExpand from '@/components/ProductCatHierarchyExpand.vue';

import {
	productCatAdd,
	productCatDel,
	productCatList,
	productCatDetail,
	productCatUpdate,
} from '../services/productCat';
import { productCatFields } from '@/models/productCat';
// import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';

// import { PICT_CDN_CAT_PREVIEW } from '@/config/constants';
import {
	FilterOperatorParam,
	type CollectionParams,
} from '@/lib/types/collection';
import type { ProductCatKey, ProductCatNew } from '@/models/productCat';
import { productLinkAdd } from '@/services/productLink';
import type { ProductLink } from '@/models/productLink';
import { defGridPopup } from "@/utils/defGridPopup";
import GridCmdAddRow from '@/components/GridCmdAddRow.vue';
import GridCmdSearch from '@/components/GridCmdSearch.vue';

const { t } = useI18n();

interface Props {
	parentData?: any;
	returnCollectionName?: string;
}

const { parentData, returnCollectionName = 'productCatList' } =
	defineProps<Props>();

const error = ref<string | undefined>();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('ProductCatList.columns.name'),
			field: productCatFields.name,
			sort: GridColSortOrder.desc,
			expand: true,
			formatClass:"border-0",
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//productCat init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(
	newGridSrvOperations(
		productCatAdd,
		productCatDel,
		productCatUpdate,
		productCatDetail,
		productCatList,
	),
);
// gridStore.setRowsPerPage(COLLECTION_COUNT);

const parentId = parentData && parentData.id ? parentData.id : null;
const oper =
	parentData && parentData.id ? FilterOperatorParam.E : FilterOperatorParam.I;
gridStore.setFetchParams(<CollectionParams>{
	filter: [{ f: { parent_id: { v: parentId, o: oper } } }],
});

let defGridSrvCommands: GridCommand[];
if(!parentData ){
	defGridSrvCommands = [
		{ id: 'search', btn: true, comp: GridCmdSearch },
		// { id: 'refresh', btn: true, comp: GridCmdRefresh },
	];
}else{
	defGridSrvCommands = [
		{ id: 'add_row', btn: true, comp: GridCmdAddRow },
	];
}

const gridViewRef = ref<GridViewExpose | null>(null);

const notificationStore = useNotificationStore();
const dragStore = useDragStore();

const handleDrop = async (dragData: GridRowDrag) => {
	// console.log('ProductCatList drop:', dragData);
	// return;
	if (
		!dragData.target ||
		dragData.source.data.id == dragData.target.data.id
	) {
		return;
	}
	try {
		if (dragData.source.gridKey == 'productList') {
			await productLinkAdd.func(<ProductLink>{
				product_id: dragData.source.data.id,
				product_cat_id: dragData.target.data.id,
			});
		} else {
			// if(dragData.source.data.parent_id == dragData.target.data.id){
			// 	return;
			// }
			await productCatUpdate.func(
				<ProductCatKey>{ id: dragData.source.data.id },
				<ProductCatNew>{ parent_id: dragData.target.data.id },
			);
		}
		dragStore.finishDrag();
		refresh();
		if (dragData.target.data.id) {
			refreshChild(dragData.target.data.id.toString());
		}

		notificationStore.addNotification(
			t('FormCustom.saveDone'),
			2000,
			MessageType.Info,
		);
	} catch (e: unknown) {
		error.value =
			e instanceof Error ? e.message || 'unknown error' : 'unknown error';
		notificationStore.addNotification(
			t('FormCustom.saveError'),
			2000,
			MessageType.Err,
		);
	}
};

const handleDragFinished = (dragData: GridRowDrag) => {
	refresh();
	if (dragData.source.data.id) {
		refreshChild(dragData.source.data.id.toString());
	}
};

const refreshChild = (id: string) => {
	const grid = (gridViewRef.value as GridViewExpose).gridRef as GridExpose;
	if (grid.expandedRefs && grid.expandedRefs[id] !== undefined) {
		grid.expandedRefs[id].refresh();
	}
};

const refresh = () => {
	if (gridViewRef.value) {
		const grid = (gridViewRef.value as GridViewExpose)
			.gridRef as GridExpose;
		grid.onRefresh();
	}
};

const searchFields = ['name' ];
const { handleGridEvent } = useGridSearchHandler(gridStore, searchFields);

const commands = <GridCommand[]>[
	{ id: 'add_row', btn: true, comp: GridCmdAddRow, compProps: { showCaption :false } },
];
if(!parentData){
	commands.push(
		{ id: 'search', btn: true, comp: GridCmdSearch }
	);
}

defineExpose({
	refresh,
});
</script>

<style>
	.grid-table {
		width: 100%;
		border: none !important;
		/* border-collapse: collapse; */
	}

</style>
