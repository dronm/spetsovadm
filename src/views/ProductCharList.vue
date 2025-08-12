//----- template -----
<template>
	<GridView
		grid-key="productCharList"
		:key-fields="['id']"
		:title="$t('ProductCharList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridStore"
		:edit="{ mode: GridEditMode.router, routeName: 'productCharDetail' }"
	>
	</GridView>
</template>

<script setup lang="ts">
//ProductCharList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { defGridSrvCommands } from '@/utils/defGridSrvCommands';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	productCharAdd,
	productCharDel,
	productCharList,
	productCharDetail,
	productCharUpdate,
} from '../services/productChar';
import { productCharFields } from '@/dataFields/productChar';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'title',
			header: t('ProductCharList.columns.title'),
			field: productCharFields.title,
			sort: GridColSortOrder.desc,
		},
		/*{
			id: 'enabled',
			header: t('ProductCharList.columns.enabled'),
			field: productCharFields.enabled,
			sort: GridColSortOrder.asc,
		},
		*/
		{
			id: 'visible',
			header: t('ProductCharList.columns.visible'),
			field: productCharFields.visible,
			sort: GridColSortOrder.asc,
		},
	],
]);

//initial sort
const initSort = { col: 'title', order: GridColSortOrder.asc };

//productChar init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(
	newGridSrvOperations(
		productCharAdd,
		productCharDel,
		productCharUpdate,
		productCharDetail,
		productCharList,
	),
);
gridStore.setRowsPerPage(COLLECTION_COUNT);
</script>
