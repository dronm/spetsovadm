//----- template -----
<template>
	<div class="adm-view-content">

		<CollectionTitle :title="$t('SupplierList.title')" />

		<GridView
			ref="gridViewRef"
			grid-key="supplierList"
			:key-fields="['id']"
			:typeFormatter="typeFormatter"
			:show-pages="COLLECTION_SHOW_PAGES"
			:columns="columns"
			:commands="gridSrvCommands"
			:store="gridSupplier"
			:edit="{ mode: GridEditMode.router, routeName: 'supplierDetail' }"
			@grid-event="handleGridEvent"
		>
			<template v-slot:noData>
				<GridNoData 
					:caption="$t('SupplierList.noDataTitle')" 
					@add-row="gridViewRef?.gridRef.onCommand('add_row')"
				/>
			</template>
		</GridView>
	</div>
</template>

<script setup lang="ts">
//SupplierList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '../lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '../lib/types/grid';
import type { GridCol, GridCommand } from '../lib/types/grid';
import { useCollectionAPI } from '../lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '../lib/types/gridSrv';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '../config/constants';
import { typeFormatter } from '../utils/typeFormatter';

import GridCmdRefresh from '@/components/GridCmdRefresh.vue';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';

import {
	supplierAdd,
	supplierDel,
	supplierList,
	supplierDetail,
	supplierUpdate,
} from '../services/supplier';
import { supplierFields } from '@/dataFields/supplier';
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';
import GridCmdAddRow from '@/components/GridCmdAddRow.vue';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('SupplierList.columns.name'),
			field: supplierFields.name,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'inn',
			header: t('SupplierList.columns.inn'),
			field: supplierFields.inn,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'ogrn',
			header: t('SupplierList.columns.ogrn'),
			field: supplierFields.ogrn,
		},
	],
]);

const gridSrvCommands: GridCommand[] = [
	{ id: 'search', btn: true, comp: GridCmdSearch },
	{ id: 'add_row', btn: true, comp: GridCmdAddRow },
	// { id: 'delete_row', btn: true, comp: GridCmdDeleteRow },
	{ id: 'refresh', btn: true, comp: GridCmdRefresh },
];

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//supplier init
const gridSupplier = useCollectionAPI();
gridSupplier.setCurrentSort(initSort);
gridSupplier.setSrvOperations(
	newGridSrvOperations(
		supplierAdd,
		supplierDel,
		supplierUpdate,
		supplierDetail,
		supplierList,
	),
);
gridSupplier.setRowsPerPage(COLLECTION_COUNT);

const searchFields = ['name', 'inn', 'ogrn'];
const { handleGridEvent } = useGridSearchHandler(gridSupplier, searchFields);

</script>
