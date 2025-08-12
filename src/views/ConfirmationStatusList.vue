//----- template -----
<template>
	<GridView
		ref="gridViewRef"
		grid-key="confirmationStatusList"
		:key-fields="['id']"
		:title="$t('ConfirmationStatusList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridConfirmationStatus"
		:edit="{ mode: GridEditMode.inline }"
	>
		<template v-slot:noData>
			<GridNoData 
				caption="No orders" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//ConfirmationStatusList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '../lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '../lib/types/grid';
import type { GridCol } from '../lib/types/grid';
import { useCollectionAPI } from '../lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '../lib/types/gridSrv';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '../config/constants';
import { defGridSrvCommands } from '../utils/defGridSrvCommands';
import { typeFormatter } from '../utils/typeFormatter';

import {
	confirmationStatusAdd,
	confirmationStatusDel,
	confirmationStatusList,
	confirmationStatusDetail,
	confirmationStatusUpdate,
} from '../services/confirmationStatus';
import { confirmationStatusFields } from '@/models/confirmationStatus';
const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'ref',
			header: t('ConfirmationStatusList.columns.ref'),
			field: confirmationStatusFields.ref,
			sort: false,
		},
		{
			id: 'field',
			header: t('ConfirmationStatusList.columns.field'),
			field: confirmationStatusFields.field,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'secret',
			header: t('ConfirmationStatusList.columns.secret'),
			field: confirmationStatusFields.secret,
			sort: false,
		},
		{
			id: 'tries',
			header: t('ConfirmationStatusList.columns.tries'),
			field: confirmationStatusFields.tries,
		},
		{
			id: 'try_date_time',
			header: t('ConfirmationStatusList.columns.try_date_time'),
			field: confirmationStatusFields.try_date_time,
		},
		{
			id: 'date_time',
			header: t('ConfirmationStatusList.columns.date_time'),
			field: confirmationStatusFields.date_time,
		},
	],
]);

//initial sort
const initSort = { col: 'date_time', order: GridColSortOrder.desc };

//confirmationStatus init
const gridConfirmationStatus = useCollectionAPI();
gridConfirmationStatus.setCurrentSort(initSort);
gridConfirmationStatus.setSrvOperations(
	newGridSrvOperations(
		confirmationStatusAdd,
		confirmationStatusDel,
		confirmationStatusUpdate,
		confirmationStatusDetail,
		confirmationStatusList,
	),
);
gridConfirmationStatus.setRowsPerPage(COLLECTION_COUNT);
</script>
