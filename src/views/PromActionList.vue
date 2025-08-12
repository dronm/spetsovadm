//----- template -----
<template>
	<CollectionTitle :title="$t('PromActionList.title')" />

	<GridView
		ref="gridViewRef"
		grid-key="promActionList"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridStore"
		:edit="{ mode: GridEditMode.router, routeName: 'promActionDetail' }"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('PromActionList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//PromActionList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';

import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';
import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { defGridSrvCommands } from '@/utils/defGridSrvCommands';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	promActionAdd,
	promActionDel,
	promActionList,
	promActionDetail,
	promActionUpdate,
} from '../services/promAction';
import { promActionFields } from '@/models/promAction';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('PromActionList.columns.name'),
			field: promActionFields.name,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'comment_text',
			header: t('PromActionList.columns.comment_text'),
			field: promActionFields.comment_text,
			sort: false,
		},
		{
			id: 'created_at',
			header: t('PromActionList.columns.created_at'),
			field: promActionFields.created_at,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'updated_at',
			header: t('PromActionList.columns.updated_at'),
			field: promActionFields.updated_at,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'expir_at',
			header: t('PromActionList.columns.expir_at'),
			field: promActionFields.expir_at,
			sort: GridColSortOrder.desc,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//store init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(
	newGridSrvOperations(
		promActionAdd,
		promActionDel,
		promActionUpdate,
		promActionDetail,
		promActionList,
	),
);
gridStore.setRowsPerPage(COLLECTION_COUNT);
</script>
