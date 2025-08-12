//----- template -----
<template>
	<div class="adm-view-content">

		<CollectionTitle :title="$t('ClientList.title')" />

		<GridView
			ref="gridViewRef"
			grid-key="clientList"
			:key-fields="['id']"
			:typeFormatter="typeFormatter"
			:show-pages="COLLECTION_SHOW_PAGES"
			:columns="columns"
			:commands="gridSrvCommands"
			:store="gridClient"
			:edit="{ mode: GridEditMode.router, routeName: 'clientDetail' }"
			@grid-event="handleGridEvent"
			:mouse-popup="defGridPopup()"
		>
			<template v-slot:noData>
				<GridNoData 
					:caption="$t('ClientList.noDataTitle')" 
					@add-row="gridViewRef?.gridRef.onCommand('add_row')"
				/>
			</template>
		</GridView>
	</div> </template>

<script setup lang="ts">
//ClientList collection component
import { ref,  } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';

import { type GridCommand } from '@/lib/types/grid';
// import GridCmdEditRow from '@/lib/components/GridCmdEditRow.vue';
// import GridCmdPrint from '@/lib/components/GridCmdPrint.vue';
// import GridCmdDeleteRow from '@/lib/components/GridCmdDeleteRow.vue';
import GridCmdRefresh from '@/components/GridCmdRefresh.vue';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';
import CollectionTitle from "../components/CollectionTitle.vue";
import GridNoData from '@/components/GridNoData.vue';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
// import GridCmdMenuColumn from '@/components/GridCmdMenuColumn.vue';
import { defGridPopup } from "@/utils/defGridPopup";

import {
	clientAdd,
	clientDel,
	clientList,
	clientDetail,
	clientUpdate,
} from '../services/client';
import { clientFields } from '@/dataFields/client';
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

const gridSrvCommands: GridCommand[] = [
	{ id: 'search', btn: true, comp: GridCmdSearch },
	// { id: 'edit_row', btn: true, comp: GridCmdEditRow },
	// { id: 'delete_row', btn: true, comp: GridCmdDeleteRow },
	{ id: 'refresh', btn: true, comp: GridCmdRefresh },
];

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('ClientList.columns.name'),
			field: clientFields.name,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'name_full',
			header: t('ClientList.columns.name_full'),
			field: clientFields.name_full,
			sort: false,
		},
		{
			id: 'inn',
			header: t('ClientList.columns.inn'),
			field: clientFields.inn,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'ogrn',
			header: t('ClientList.columns.ogrn'),
			field: clientFields.ogrn,
			sort: false,
		},
		// {
		// 	id: 'menu',
		// 	header: " ",
		// 	formatControl: {
		// 		comp: markRaw(GridCmdMenuColumn),
		// 		compProps: {
		// 			mousePopup:	defGridPopup(),
		// 			grid: viewRef.value,
		// 		}
		// 	},
		// 	formatClass: "p-0",
		// 	sort: false,
		// }
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//client init
const gridClient = useCollectionAPI();
gridClient.setCurrentSort(initSort);
gridClient.setSrvOperations(
	newGridSrvOperations(
		clientAdd,
		clientDel,
		clientUpdate,
		clientDetail,
		clientList,
	),
);
gridClient.setRowsPerPage(COLLECTION_COUNT);

const searchFields = ['name', 'name_full', 'inn', 'ogrn'];
const { handleGridEvent } = useGridSearchHandler(gridClient, searchFields);

</script>
