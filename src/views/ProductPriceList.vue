//----- template -----
<template>
	<GridView
		grid-key="prodPriceList"
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
				:caption="$t('ProductPriceList.noDataTitle')" 
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
import { productPriceFields } from '@/dataFields/productPriceList';

import { productPriceList } from '@/services/product';
import { ControlType } from '@/lib/types/controlTypes';
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
			field: productPriceFields.product_id,
			visible: false,
		},
		{
			id: 'characteristics_ref',
			header: t('ProductPriceList.columns.characteristics_ref'),
			field: productPriceFields.characteristics_ref,
			sort: false,
		},
		{
			id: 'price_types_ref',
			header: t('ProductPriceList.columns.price_types_ref'),
			field: productPriceFields.price_types_ref,
			sort: false,
		},
		{
			id: 'price',
			header: t('ProductPriceList.columns.price'),
			field: productPriceFields.price,
			controlType: ControlType.currency,
			sort: false,
		},
		{
			id: 'update_at',
			header: t('ProductPriceList.columns.update_at'),
			field: productPriceFields.update_at,
			sort: GridColSortOrder.asc,
		},
	],
]);

//initial sort
// const initSort = { col: 'price_types_ref', order: GridColSortOrder.asc };

//productCharValue init
const gridStore = useCollectionAPI();
// gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations({ [GridSrvOperation.list]: productPriceList });

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
