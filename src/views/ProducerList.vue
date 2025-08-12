//----- template -----
<template>
	<GridView
		grid-key="producerList"
		:key-fields="['id']"
		:title="$t('ProducerList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridProducer"
		:edit="{ mode: GridEditMode.inline }"
	>
	</GridView>
</template>

<script setup lang="ts">
//ProducerList collection component
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
	producerAdd,
	producerDel,
	producerList,
	producerDetail,
	producerUpdate,
} from '../services/producer';
import { producerFields } from '@/models/producer';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('ProducerList.columns.name'),
			field: producerFields.name,
			sort: GridColSortOrder.desc,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//producer init
const gridProducer = useCollectionAPI();
gridProducer.setCurrentSort(initSort);
gridProducer.setSrvOperations(
	newGridSrvOperations(
		producerAdd,
		producerDel,
		producerUpdate,
		producerDetail,
		producerList,
	),
);
gridProducer.setRowsPerPage(COLLECTION_COUNT);
</script>
