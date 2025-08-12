//----- template -----
<template>
	<GridView
		grid-key="prodStockList"
		v-if="productId"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
			]
		"
		:store="gridStore"
		:edit="false"
	>
		<template v-slot:noData>
			<GridNoData 
				:cmd-add="false"
				:caption="$t('ProductStockList.noDataTitle')" 
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//ProductCharList collection component
import { ref, watch, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol, GridCommand } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { GridSrvOperation } from '@/lib/types/gridSrv';
import {
	FilterOperatorParam,
	type CollectionParams,
} from '@/lib/types/collection';
import { FilterJoinParam } from '@/lib/types/collection';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';
import { productStockFields } from '@/dataFields/productStockList';

import { productStockList } from '@/services/product';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
import GridNoData from '@/components/GridNoData.vue';

const { t } = useI18n();

export interface Props {
	productId: number;
}

const { productId } = defineProps<Props>();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'product_id',
			field: productStockFields.product_id,
			visible: false,
		},
		{
			id: 'warehouses_ref',
			header: t('ProductStockList.columns.wareshouses_ref'),
			field: productStockFields.warehouses_ref,
			sort: false,
		},
		{
			id: 'characteristics_ref',
			header: t('ProductStockList.columns.characteristics_ref'),
			field: productStockFields.characteristics_ref,
			sort: false,
		},
		{
			id: 'quant',
			header: t('ProductStockList.columns.quant'),
			field: productStockFields.quant,
			sort: false,
		},
		{
			id: 'quant_available',
			header: t('ProductStockList.columns.quant_available'),
			field: productStockFields.quant_available,
			sort: false,
		},
		{
			id: 'update_at',
			header: t('ProductStockList.columns.update_at'),
			field: productStockFields.update_at,
			sort: GridColSortOrder.asc,
		},
	],
]);

//initial sort
// const initSort = { col: 'value', order: GridColSortOrder.asc };

//productCharValue init
const gridStore = useCollectionAPI();
// gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations({ [GridSrvOperation.list]: productStockList });

const fetchParams = reactive<CollectionParams>({
	filter: [],
});

watch(
	() => productId,
	(newVal) => {
		if (newVal != null) {
			fetchParams.filter = [
				{
					j: FilterJoinParam.AND,
					f: {
						product_id: {
							o: FilterOperatorParam.E,
							v: newVal,
						},
					},
				},
			];
			gridStore.setFetchParams(fetchParams);
		}
	},
	{ immediate: true },
);

gridStore.setRowsPerPage(COLLECTION_COUNT);

</script>
