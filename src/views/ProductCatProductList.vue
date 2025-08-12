//----- template -----
<template>
	<GridView
		grid-key="productCatProductList"
		:key-fields="['id']"
		:title="$t('ProductList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'edit_row', btn: true, comp: GridCmdEditRow },
				{ id: 'refresh', btn: true, comp: GridCmdRefresh },
			]
		"
		:store="gridStore"
		:edit="{ mode: GridEditMode.router, routeName: 'productDetail' }"
	>
	</GridView>
</template>

<script setup lang="ts">
//UserList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { type GridCommand } from '../lib/types/grid';
import GridCmdEditRow from '../lib/components/GridCmdEditRow.vue';
import GridCmdRefresh from '../lib/components/GridCmdRefresh.vue';
import {
	FilterOperatorParam,
	type CollectionFilterFields,
	type CollectionParams,
} from '@/lib/types/collection';

import { typeFormatter } from '@/utils/typeFormatter';
import { PICT_CDN_PROD_PREVIEW } from '@/config/constants';

import { productList, productDetail, productUpdate } from '../services/product';
import { productFields } from '@/models/product';
import type { GridSrvOperations } from '@/lib/types/gridSrv';
import { GridSrvOperation } from '@/lib/types/gridSrv';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
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
			formatFunction: function (
				row: any,
				field: string | undefined,
				rowIndex: number,
			): string {
				if (row['preview_path']) {
					const src = `${PICT_CDN_PROD_PREVIEW}/${row['preview_path']}`;
					return `<img src='${src}'
							class="w-12 h-auto object-contain rounded shadow"
						></img>`;
				} else {
					return '';
				}
			},
		},
	],
]);

interface Props {
	productCatId?: number;
}

const { productCatId } = defineProps<Props>();

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

const filterStruct = <CollectionFilterFields>{};
filterStruct['product_cat_id'] = { v: productCatId, o: FilterOperatorParam.E };
gridStore.setFetchParams(<CollectionParams>{
	filter: [{ f: filterStruct }],
});
</script>
