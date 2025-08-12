//----- template -----
<template>

	<CollectionTitle :title="$t('NotifTemplateList.title')" />

	<GridView
		ref="gridViewRef"
		grid-key="notifTemplateList"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
				{ id: 'add_row', btn: true, comp: GridCmdAddRow },
			]
		"
		:store="gridNotifTemplate"
		:edit="{ mode: GridEditMode.router, routeName: 'notifTemplateDetail' }"
		@grid-event="handleGridEvent"
		:mouse-popup="defGridPopup()"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('NotifTemplateList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//NotifTemplateList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol, GridCommand } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	notifTemplateAdd,
	notifTemplateDel,
	notifTemplateList,
	notifTemplateDetail,
	notifTemplateUpdate,
} from '../services/notifTemplate';
import { notifTemplateFields } from '@/dataFields/notifTemplate';
import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';
import { defGridPopup } from "@/utils/defGridPopup";
import GridCmdAddRow from '@/components/GridCmdAddRow.vue';
import GridCmdSearch from '@/components/GridCmdSearch.vue';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'notif_provider',
			header: t('NotifTemplateList.columns.notif_provider'),
			field: notifTemplateFields.notif_provider,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'notif_type',
			header: t('NotifTemplateList.columns.notif_type'),
			field: notifTemplateFields.notif_type,
			sort: GridColSortOrder.asc,
		},
		// {
		// 	id: 'template',
		// 	header: t('NotifTemplateList.columns.template'),
		// 	field: notifTemplateFields.template,
		// 	sort: false,
		// },
	],
]);

//initial sort
const initSort = { col: 'notif_provider', order: GridColSortOrder.asc };

//notifTemplate init
const gridNotifTemplate = useCollectionAPI();
gridNotifTemplate.setCurrentSort(initSort);
gridNotifTemplate.setSrvOperations(
	newGridSrvOperations(
		notifTemplateAdd,
		notifTemplateDel,
		notifTemplateUpdate,
		notifTemplateDetail,
		notifTemplateList,
	),
);
gridNotifTemplate.setRowsPerPage(COLLECTION_COUNT);

const searchFields = ['notif_provider', 'notif_type'];
const { handleGridEvent } = useGridSearchHandler(gridNotifTemplate, searchFields);
</script>
