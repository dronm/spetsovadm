//----- template -----
<template>
	<div class="adm-view-content">
		<CollectionTitle :title="$t('ProductList.title')" />

		<GridView
			ref="gridViewRef"
			grid-key="productList"
			:key-fields="['id']"
			:typeFormatter="typeFormatter"
			:show-pages="COLLECTION_SHOW_PAGES"
			:columns="columns"
			:commands="
				<GridCommand[]>[
					{ id: 'search', btn: true, comp: GridCmdSearch },
					{ id: 'add_row', btn: true, comp: GridCmdAddRow },
				]
			"
			:store="gridStore"
			:edit="{
				mode: GridEditMode.router,
				routeName: 'productDetail',
				routeCollectionName: returnCollectionName,
			}"
			:draggable="draggable"
			@gridEvent="customCmdHandler"
			@dragFinished="handleDragFinished"
			:mouse-popup="defGridPopup()"
		>
			<template v-slot:noData>
				<GridNoData 
					:caption="$t('ProductList.noDataTitle')" 
					@add-row="gridViewRef?.gridRef.onCommand('add_row')"
				/>
			</template>

		</GridView>
	</div>
</template>

<script setup lang="ts">
//UserList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { type GridExpose } from '@/lib/components/Grid.vue';
import { GridColSortOrder, GridColTextAlign, GridEditMode } from '@/lib/types/grid';
import type { GridCol, GridRowDrag } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { type GridCommand } from '../lib/types/grid';
import {
	type CollectionParams,
	FilterOperatorParam,
} from '../lib/types/collection';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
import GridCmdAddRow from '@/components/GridCmdAddRow.vue';
import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';

// import GridCmdProductSearch from '@/components/GridCmdProductSearch.vue';

import { typeFormatter } from '@/utils/typeFormatter';
import { PICT_CDN_PROD_PREVIEW } from '@/config/constants';

import { productList, productDetail, productUpdate } from '../services/product';
import { productFields } from '@/models/product';
import type { GridSrvOperations } from '@/lib/types/gridSrv';
import { GridSrvOperation } from '@/lib/types/gridSrv';

import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';
import { defGridPopup } from "@/utils/defGridPopup";

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

interface ProductListProps {
	returnCollectionName?: string;
	draggable?: boolean;
}
const { returnCollectionName = 'productList', draggable = false } =
	defineProps<ProductListProps>();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'product_cat_descrs',
			header: t('ProductList.columns.product_cat_descrs'),
			field: productFields.product_cat_descrs,
			sort: false,
		},
		{
			id: 'name',
			header: t('ProductList.columns.name'),
			field: productFields.name,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'code_1c',
			header: t('ProductList.columns.code_1c'),
			field: productFields.code_1c,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'artikul',
			header: t('ProductList.columns.artikul'),
			field: productFields.artikul,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'preview_path',
			header: t('ProductList.columns.preview_path'),
			field: productFields.preview_path,
			formatResultHtml: true,
			textAlign: GridColTextAlign.center,
			formatFunction: function (row: any): string {
				if (row['preview_path']) {
					const src = `${PICT_CDN_PROD_PREVIEW}/${row['preview_path']}`;
					// w-12 h-auto object-contain rounded shadow
					return `<img src='${src}'
							class="w-[41.335px] h-[47.15px] shrink-0 aspect-[41.33/47.15]  mx-auto"
						></img>`;
				} else {
					return '';
				}
			},
		},
	],
]);

interface GridCmdSearch {
	id: string;
	val: string;
}

const customCmdHandler = (cmd: GridCmdSearch) => {
	if (cmd.id === 'search') {
		const search = cmd.val
			.split(' ')
			.filter((v: string) => v.trim().length)
			.map((v: string) => `${v}:*`)
			.join(' & ');
		if (search.length) {
			gridStore.setFetchParams(<CollectionParams>{
				filter: [
					{
						f: {
							search_column: {
								o: FilterOperatorParam.TS,
								v: `${search}`,
							},
						},
					},
				],
			});
		} else {
			gridStore.setFetchParams(<CollectionParams>{});
		}
		const result = new Promise<string>((resolve) =>
			gridStore.refresh(resolve),
		);
		result.then((err: string) => {
			if (err && err.length) {
				const notificationStore = useNotificationStore();
				notificationStore.addNotification(err, 5000, MessageType.Err);
				return;
			}
		});
	}
};

//initial sort
const initSort = { col: 'code_1c', order: GridColSortOrder.asc };

//user init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);

gridStore.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.update]: productUpdate,
	[GridSrvOperation.list]: productList,
	[GridSrvOperation.detail]: productDetail,
});

gridStore.setRowsPerPage(COLLECTION_COUNT);

const refresh = () => {
	if (gridViewRef.value) {
		const grid = (gridViewRef.value as GridViewExpose)
			.gridRef as GridExpose;
		grid.onRefresh();
	}
};
const handleDragFinished = (dragData: GridRowDrag) => {
	refresh();
};

// const searchFields = ['search_column' ];
// const { handleGridEvent } = useGridSearchHandler(gridStore, searchFields);

</script>
