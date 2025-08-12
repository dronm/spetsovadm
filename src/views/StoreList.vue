//----- template -----
<template>
	<div class="adm-view-content">

		<CollectionTitle :title="$t('StoreList.title')" />

		<GridView
			ref="gridViewRef"
			grid-key="storeList"
			:key-fields="['id']"
			:title="$t('StoreList.title')"
			:typeFormatter="typeFormatter"
			:show-pages="COLLECTION_SHOW_PAGES"
			:columns="columns"
			:commands="defGridSrvCommands"
			:store="gridStore"
			:edit="{ mode: GridEditMode.inline }"
		>
			<template v-slot:noData>
				<GridNoData 
					:caption="$t('StoreList.noDataTitle')" 
					@add-row="gridViewRef?.gridRef.onCommand('add_row')"
				/>
			</template>
		</GridView>
	</div>
</template>

<script setup lang="ts">
//StoreList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '../lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '../lib/types/grid';
import type { GridCol } from '../lib/types/grid';
import { useCollectionAPI } from '../lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '../lib/types/gridSrv';

import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '../config/constants';
import { defGridSrvCommands } from '../utils/defGridSrvCommands';
import { typeFormatter } from '../utils/typeFormatter';

import {
	storeAdd,
	storeDel,
	storeList,
	storeDetail,
	storeUpdate,
} from '../services/store';
import { storeFields } from '@/models/store';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'address',
			header: t('StoreList.columns.address'),
			field: storeFields.address,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'email',
			header: t('StoreList.columns.email'),
			field: storeFields.email,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'work_hours',
			header: t('StoreList.columns.work_hours'),
			field: storeFields.work_hours,
		},
		{
			id: 'tels',
			header: t('StoreList.columns.tels'),
			field: storeFields.tels,
		},
		{
			id: 'pos_lat',
			header: t('StoreList.columns.pos_lat'),
			field: storeFields.pos_lat,
		},
		{
			id: 'pos_lon',
			header: t('StoreList.columns.pos_lon'),
			field: storeFields.pos_lon,
		},
	],
]);

//initial sort
const initSort = { col: 'address', order: GridColSortOrder.asc };

//store init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(
	newGridSrvOperations(
		storeAdd,
		storeDel,
		storeUpdate,
		storeDetail,
		storeList,
	),
);
gridStore.setRowsPerPage(COLLECTION_COUNT);
</script>
