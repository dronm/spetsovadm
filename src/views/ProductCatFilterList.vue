//----- template -----
<template>
	<div class="adm-view-content">

		<CollectionTitle :title="$t('ProductCatFilterList.title')" />

		<GridView
			ref="gridViewRef"
			grid-key="productCatFilterList"
			:key-fields="['ref_1c']"
			:typeFormatter="typeFormatter"
			:show-pages="COLLECTION_SHOW_PAGES"
			:columns="columns"
			:commands="
				<GridCommand[]>[
					{ id: 'search', btn: true, comp: GridCmdSearch },
					{ id: 'add_row', btn: true, comp: GridCmdAddRow },
				]
			"
			:store="gridProductCatFilter"
			:edit="{
				mode: GridEditMode.router,
				routeName: 'productCatFilterDetail',
			}"
			@grid-event="handleGridEvent"
			:mouse-popup="defGridPopup()"
		>
			<template v-slot:noData>
				<GridNoData 
					caption="No orders" 
					@add-row="gridViewRef?.gridRef.onCommand('add_row')"
				/>
			</template>
		</GridView>
	</div>
</template>

<script setup lang="ts">
//ProductCatFilterList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView, { type GridViewExpose } from '../lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '../lib/types/grid';
import type { GridCol, GridCommand } from '../lib/types/grid';
import { useCollectionAPI } from '../lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '../lib/types/gridSrv';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '../config/constants';
import { typeFormatter } from '../utils/typeFormatter';
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';
import { defGridPopup } from "@/utils/defGridPopup";

import {
	productCatFilterAdd,
	productCatFilterDel,
	productCatFilterList,
	productCatFilterDetail,
	productCatFilterUpdate,
} from '../services/productCatFilter';
import { productCatFilterFields } from '@/dataFields/productCatFilter';
import type { ProductCatFilter } from '@/models/productCatFilter';
import type { ProductCatFilterValue } from '@/models/productCatFilter';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
import GridCmdAddRow from '@/components/GridCmdAddRow.vue';
import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		// {
		// 	id: 'ref_1c',
		// 	header: t('ProductCatFilterList.columns.ref_1c'),
		// 	field: productCatFilterFields.ref_1c,
		// 	sort: false,
		// },
		{
			id: 'name',
			header: t('ProductCatFilterList.columns.name'),
			field: productCatFilterFields.name,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'values',
			header: t('ProductCatFilterList.columns.values'),
			field: productCatFilterFields.values,
			formatFunction: function (row: ProductCatFilter) {
				let res = '';
				if (row.values && row.values.length) {
					row.values
						.slice(0, 3)
						.forEach((v: ProductCatFilterValue) => {
							res += res == '' ? '' : ', ';
							res += v.name;
						});
					if (row.values.length > 3) {
						res += '...';
					}
				}
				return res;
			},
			sort: false,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//productCatFilter init
const gridProductCatFilter = useCollectionAPI();
gridProductCatFilter.setCurrentSort(initSort);
gridProductCatFilter.setSrvOperations(
	newGridSrvOperations(
		productCatFilterAdd,
		productCatFilterDel,
		productCatFilterUpdate,
		productCatFilterDetail,
		productCatFilterList,
	),
);
gridProductCatFilter.setRowsPerPage(COLLECTION_COUNT);

const searchFields = ['name', ];
const { handleGridEvent } = useGridSearchHandler(gridProductCatFilter, searchFields);
</script>
