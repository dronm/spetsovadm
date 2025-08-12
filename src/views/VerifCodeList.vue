//----- template -----
<template>

	<CollectionTitle :title="$t('VerifCodeList.title')" />

	<GridView
		ref="gridViewRef"
		grid-key="verifCodeList"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:store="gridVerifCode"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
			]
		"
		:edit="{ mode: GridEditMode.inline }"
		@grid-event="handleGridEvent"
		:mouse-popup="defGridPopup()"
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
//VerifCodeList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '../lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '../lib/types/grid';
import type { GridCol, GridCommand } from '../lib/types/grid';
import { useCollectionAPI } from '../lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '../lib/types/gridSrv';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '../config/constants';
import { typeFormatter } from '../utils/typeFormatter';
import GridCmdSearch from '@/components/GridCmdSearch.vue';

import {
	verifCodeAdd,
	verifCodeDel,
	verifCodeList,
	verifCodeDetail,
	verifCodeUpdate,
} from '../services/verifCode';
import { verifCodeFields } from '@/models/verifCode';
import type { PopoverItem } from '@/lib/types/popover';
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';
import CollectionTitle from '@/components/CollectionTitle.vue';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'tel',
			header: t('VerifCodeList.columns.tel'),
			field: verifCodeFields.tel,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'secret',
			header: t('VerifCodeList.columns.secret'),
			field: verifCodeFields.secret,
			sort: false,
		},
		{
			id: 'tries',
			header: t('VerifCodeList.columns.tries'),
			field: verifCodeFields.tries,
		},
		{
			id: 'try_date_time',
			header: t('VerifCodeList.columns.try_date_time'),
			field: verifCodeFields.try_date_time,
		},
		{
			id: 'date_time',
			header: t('VerifCodeList.columns.date_time'),
			field: verifCodeFields.date_time,
		},
	],
]);

//initial sort
const initSort = { col: 'date_time', order: GridColSortOrder.desc };

//verifCode init
const gridVerifCode = useCollectionAPI();
gridVerifCode.setCurrentSort(initSort);
gridVerifCode.setSrvOperations(
	newGridSrvOperations(
		verifCodeAdd,
		verifCodeDel,
		verifCodeUpdate,
		verifCodeDetail,
		verifCodeList,
	),
);
gridVerifCode.setRowsPerPage(COLLECTION_COUNT);

const searchFields = ['tel'];
const { handleGridEvent } = useGridSearchHandler(gridVerifCode, searchFields);

const defGridPopup = () => <PopoverItem[]> [
	{id: "refresh", caption: t("GridCmdRefresh.caption"), icon: new URL(`../assets/collection-cmd/refresh.png`, import.meta.url).href},
];
</script>
