//----- template -----
<template>
	<CollectionTitle :title="$t('PromCodeList.title')" />

	<GridView
		ref="gridViewRef"
		grid-key="promCodeList"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridStore"
		:edit="{ mode: GridEditMode.router, routeName: 'promCodeDetail' }"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('PromCodeList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//PromCodeList collection component
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
	promCodeAdd,
	promCodeDel,
	promCodeList,
	promCodeDetail,
	promCodeUpdate,
} from '../services/promCode';
import { promCodeFields } from '@/models/promCode';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('PromCodeList.columns.name'),
			field: promCodeFields.name,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'comment_text',
			header: t('PromCodeList.columns.comment_text'),
			field: promCodeFields.comment_text,
			sort: false,
		},
		{
			id: 'created_at',
			header: t('PromCodeList.columns.created_at'),
			field: promCodeFields.created_at,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'updated_at',
			header: t('PromCodeList.columns.updated_at'),
			field: promCodeFields.updated_at,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'expir_at',
			header: t('PromCodeList.columns.expir_at'),
			field: promCodeFields.expir_at,
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
		promCodeAdd,
		promCodeDel,
		promCodeUpdate,
		promCodeDetail,
		promCodeList,
	),
);
gridStore.setRowsPerPage(COLLECTION_COUNT);
</script>
