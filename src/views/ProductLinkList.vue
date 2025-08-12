//used from ProductCatDetail or from ProductDetail
// :title=" $t('ProductLinkList.productCatTitle')"
<template>
	<GridView
		ref="gridViewRef"
		grid-key="productLinkList"
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
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('ProductLinkList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//ProductLinkList collection component
import { ref, markRaw } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { type GridSrvOperations, GridSrvOperation } from '@/lib/types/gridSrv';
import { type GridCommand } from '@/lib/types/grid';

// import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
import GridCmdAddRow from '@/components/GridCmdAddRow.vue';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	productLinkList,
	productLinkDetail,
	productLinkAdd,
	productLinkUpdate,
	productLinkDel,
} from '@/services/productLink';
import { productLinkFields } from '@/dataFields/productLinkFields';
import {
	FilterOperatorParam,
	type CollectionFilterFields,
	type CollectionParams,
} from '@/lib/types/collection';

import ProductEdit from '@/components/ProductEdit.vue';
import ProductCatEdit from '@/components/ProductCatEdit.vue';

const gridViewRef = ref<GridViewExpose | null>(null);

const { t } = useI18n();

interface Props {
	productId?: number;
	productCatId?: number;
}

const { productId, productCatId } = defineProps<Props>();

//grid columns
const columns = <GridCol[][]>[
	[
		{
			id: 'product_id',
			field: productLinkFields.product_id,
			visible: false,
		},
		{
			id: 'product_cat_id',
			field: productLinkFields.product_cat_id,
			visible: false,
		},
		{
			id: 'products_ref',
			header: t('ProductLinkList.columns.products_ref'),
			editControl: {
				comp: markRaw(ProductEdit),
				compProps: {
					inline: true,
				},
			},
			field: productLinkFields.products_ref,
			sort: false,
			visible: productId === undefined,
		},
		{
			id: 'product_cats_ref',
			header: t('ProductLinkList.columns.product_cats_ref'),
			editControl: {
				comp: markRaw(ProductCatEdit),
				compProps: {
					inline: true,
				},
			},
			field: productLinkFields.product_cats_ref,
			sort: false,
			visible: productCatId === undefined,
		},
		{
			id: 'updated_at',
			header: t('ProductLinkList.columns.updated_at'),
			edit: false,
			field: productLinkFields.updated_at,
			sort: GridColSortOrder.desc,
			editable: false,
		},
	],
];

//initial sort
const initSort = {
	col: 'updated_at',
	order: GridColSortOrder.desc,
};

//productCertificateUseRange init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.insert]: productLinkAdd,
	[GridSrvOperation.update]: productLinkUpdate,
	[GridSrvOperation.delete]: productLinkDel,
	[GridSrvOperation.list]: productLinkList,
	[GridSrvOperation.detail]: productLinkDetail,
});

const fieldId = productId == undefined ? 'product_cat_id' : 'product_id';
const fieldVal = productId == undefined ? productCatId : productId;
const filterStruct = <CollectionFilterFields>{};
filterStruct[fieldId] = { v: fieldVal, o: FilterOperatorParam.E };
gridStore.setFetchParams(<CollectionParams>{
	filter: [{ f: filterStruct }],
});
gridStore.setRowsPerPage(COLLECTION_COUNT);
</script>
