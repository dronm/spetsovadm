//----- template -----
<template>
	<GridView
		grid-key="priceGroupList"
		:key-fields="['id']"
		:title="$t('PriceGroupList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridPriceGroup"
		:edit="{ mode: GridEditMode.inline }"
	>
	</GridView>
</template>

<script setup lang="ts">
//PriceGroupList collection component
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
	priceGroupAdd,
	priceGroupDel,
	priceGroupList,
	priceGroupDetail,
	priceGroupUpdate,
} from '../services/priceGroup';
import { priceGroupFields } from '@/models/priceGroup';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('PriceGroupList.columns.name'),
			field: priceGroupFields.name,
			sort: GridColSortOrder.desc,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//priceGroup init
const gridPriceGroup = useCollectionAPI();
gridPriceGroup.setCurrentSort(initSort);
gridPriceGroup.setSrvOperations(
	newGridSrvOperations(
		priceGroupAdd,
		priceGroupDel,
		priceGroupUpdate,
		priceGroupDetail,
		priceGroupList,
	),
);
gridPriceGroup.setRowsPerPage(COLLECTION_COUNT);
</script>
