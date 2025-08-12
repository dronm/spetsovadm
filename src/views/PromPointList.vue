//----- template -----
<template>
	<CollectionTitle :title="$t('PromPointList.title')" />

	<GridView
		ref="gridViewRef"
		grid-key="promPointList"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridPromPoint"
		:edit="{ mode: GridEditMode.router, routeName: 'promPointDetail' }"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('PromPointList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//PromPointList collection component
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
	promPointAdd,
	promPointDel,
	promPointList,
	promPointDetail,
	promPointUpdate,
} from '../services/promPoint';
import { promPointFields } from '@/models/promPoint';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('PromPointList.columns.name'),
			field: promPointFields.name,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'expir_at',
			header: t('PromPointList.columns.expir_at'),
			field: promPointFields.expir_at,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'created_at',
			header: t('PromPointList.columns.created_at'),
			field: promPointFields.created_at,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'comment_text',
			header: t('PromPointList.columns.comment_text'),
			field: promPointFields.comment_text,
			sort: false,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//promPoint init
const gridPromPoint = useCollectionAPI();
gridPromPoint.setCurrentSort(initSort);
gridPromPoint.setSrvOperations(
	newGridSrvOperations(
		promPointAdd,
		promPointDel,
		promPointUpdate,
		promPointDetail,
		promPointList,
	),
);
gridPromPoint.setRowsPerPage(COLLECTION_COUNT);
</script>
