//----- template -----
<template>
	<GridView
		grid-key="brandList"
		:key-fields="['id']"
		:title="$t('BrandList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridBrand"
		:edit="{ mode: GridEditMode.inline }"
	>
	</GridView>
</template>

<script setup lang="ts">
//BrandList collection component
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
	brandAdd,
	brandDel,
	brandList,
	brandDetail,
	brandUpdate,
} from '../services/brand';
import { brandFields } from '@/dataFields/brand';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('BrandList.columns.name'),
			field: brandFields.name,
			sort: GridColSortOrder.desc,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//brand init
const gridBrand = useCollectionAPI();
gridBrand.setCurrentSort(initSort);
gridBrand.setSrvOperations(
	newGridSrvOperations(
		brandAdd,
		brandDel,
		brandUpdate,
		brandDetail,
		brandList,
	),
);
gridBrand.setRowsPerPage(COLLECTION_COUNT);
</script>
