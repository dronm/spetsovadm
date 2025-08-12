//----- template -----
<template>
	<div class="adm-view-content">
		<CollectionTitle :title="$t('CheckoutOrderList.title')" />

		<GridView
			ref="gridViewRef"
			grid-key="checkoutOrderList"
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
			:store="gridStore"
			:edit="{ mode: GridEditMode.inline }"
			@grid-event="handleGridEvent"
			:mouse-popup="defGridPopup()"
		>
			<template v-slot:noData>
				<GridNoData 
					:caption="$t('CheckoutOrderList.noDataTitle')" 
					@add-row="gridViewRef?.gridRef.onCommand('add_row')"
				/>
			</template>
		</GridView>
	</div>
</template>

<script setup lang="ts">
//CheckoutOrderList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView, { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';

import { type GridCommand } from '@/lib/types/grid';
import GridCmdAddRow from '@/components/GridCmdAddRow.vue';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';
import { defGridPopup } from "@/utils/defGridPopup";

import {
	checkoutOrderAdd,
	checkoutOrderDel,
	checkoutOrderList,
	checkoutOrderDetail,
	checkoutOrderUpdate,
} from '../services/checkoutOrder';
import { checkoutOrderFields } from '@/dataFields/checkoutOrder';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'user',
			header: t('CheckoutOrderList.columns.user'),
			field: checkoutOrderFields.user,
			sort: false, //GridColSortOrder.desc,
		},
		{
			id: 'create_at',
			header: t('CheckoutOrderList.columns.create_at'),
			field: checkoutOrderFields.create_at,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'last_status',
			header: t('CheckoutOrderList.columns.last_status'),
			field: checkoutOrderFields.last_status,
			sort: false,
		},
	],
]);

//initial sort
const initSort = { col: 'create_at', order: GridColSortOrder.desc };

//checkoutOrder init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(
	newGridSrvOperations(
		checkoutOrderAdd,
		checkoutOrderDel,
		checkoutOrderUpdate,
		checkoutOrderDetail,
		checkoutOrderList,
	),
);
gridStore.setRowsPerPage(COLLECTION_COUNT);

const searchFields = ['user', ];
const { handleGridEvent } = useGridSearchHandler(gridStore, searchFields);
</script>
