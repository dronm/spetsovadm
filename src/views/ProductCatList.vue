//----- template -----
<template>
	<CollectionTitle :title="
		$t(
			parentData
				? 'ProductCatList.subCatTitle'
				: 'ProductCatList.title',
		)
	" />

	<GridView
		ref="gridFormRef"
		:grid-key="
			parentData ? 'productCatList_' + parentData.id : 'productCatList'
		"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridStore"
		:edit="{ mode: GridEditMode.router, routeName: 'productCatDetail' }"
		:expand="{ comp: ProductCatList }"
		:navigate="{ mouse: false }"
		:show-header="false"
		:error="error"
		@drop="handleDrop"
		@dragFinished="handleDragFinished"
		@grid-event="handleGridEvent"
		:mouse-popup="defGridPopup()"
	>
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
import type { GridCol, GridRowDrag } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';
import {
	useNotificationStore,
	MessageType,
} from '@lib//stores/useNotificationStore';
import { useDragStore } from '@/lib/stores/useDragStore';
import { defGridPopup } from "@/utils/defGridPopup";
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';

import { COLLECTION_SHOW_PAGES } from '@/config/constants';
import { defGridSrvCommands } from '@/utils/defGridSrvCommands';
import { typeFormatter } from '@/utils/typeFormatter';
import ProductCatList from './ProductCatList.vue';

import {
	productCatAdd,
	productCatDel,
	productCatList,
	productCatDetail,
	productCatUpdate,
} from '../services/productCat';
import { productCatFields } from '@/models/productCat';

// import { PICT_CDN_CAT_PREVIEW } from '@/config/constants';
import {
	FilterOperatorParam,
	type CollectionParams,
} from '@/lib/types/collection';
import type { ProductCatKey, ProductCatNew } from '@/models/productCat';
import CollectionTitle from '@/components/CollectionTitle.vue';

const { t } = useI18n();

interface Props {
	parentData?: any;
}

const { parentData } = defineProps<Props>();

const error = ref<string | undefined>();

//grid columns
const columns = ref<GridCol[][]>([
	[
		// {
		// 	id: 'parents_descr',
		// 	header: t('ProductCatList.columns.parents_descr'),
		// 	field: productCatFields.parents_descr,
		// 	expand: true,
		// },
		{
			id: 'name',
			header: t('ProductCatList.columns.name'),
			field: productCatFields.name,
			sort: GridColSortOrder.desc,
			expand: true,
		},
		// {
		// 	id: 'parent_id',
		// 	field: productCatFields.parent_id,
		// 	sort: false,
		// 	visible: true,
		// },
		// {
		// 	id: 'product_count',
		// 	header: t('ProductCatList.columns.product_count'),
		// 	field: productCatFields.product_count,
		// 	sort: false,
		// },
		// {
		// 	id: 'preview_path',
		// 	header: t('ProductCatList.columns.preview_path'),
		// 	field: productCatFields.preview_path,
		// 	formatResultHtml: true,
		// 	formatFunction: function (row: any): string {
		// 		if (row['preview_path']) {
		// 			const src = `${PICT_CDN_CAT_PREVIEW}/${row['preview_path']}`;
		// 			return `<img src='${src}'
		// 					class="w-12 h-auto object-contain rounded shadow"
		// 				></img>`;
		// 		} else {
		// 			return '';
		// 		}
		// 	},
		// },
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

const gridFormRef = ref(null);

const notificationStore = useNotificationStore();
const dragStore = useDragStore();

const handleDrop = async (dragData: GridRowDrag) => {
	console.log('ProductCatList drop:', dragData);
	if (
		!dragData.target ||
		dragData.source.data.id == dragData.target.data.id
	) {
		return;
	}
	try {
		await productCatUpdate.func(
			<ProductCatKey>{ id: dragData.source.data.id },
			<ProductCatNew>{ parent_id: dragData.target.data.id },
		);
		dragStore.finishDrag();
		refresh();
		refreshChild(dragData.target.data.id);

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
	console.log('handleDragFinished: issue refresh', dragData);
	// refresh();
	refreshChild(dragData.source.data.id?.toString());
};

const refreshChild = (id: string) => {
	const grid = (gridFormRef.value as GridViewExpose).gridRef as GridExpose;
	if (grid.expandedRefs && grid.expandedRefs[id]) {
		grid.expandedRefs[id].refresh();
	}
};

const refresh = () => {
	if (gridFormRef.value) {
		const grid = (gridFormRef.value as GridViewExpose).gridRef;
		grid.onRefresh();
	}
};

const searchFields = ['search_column' ];
const { handleGridEvent } = useGridSearchHandler(gridStore, searchFields);

defineExpose({
	refresh,
});
</script>
