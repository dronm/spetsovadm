//----- template -----
<template>
	<GridView
		ref="gridViewRef"
		grid-key="productCertificateUsageList"
		:key-fields="['product_id', 'product_cat_id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
				// { id: 'add_row', btn: true, comp: GridCmdAddRow },
			]
		"
		:store="gridStore"
		:edit="false"
	>
		<template v-slot:noData>
			<GridNoData 
				:cmd-add="false"
				:caption="$t('ProductCertificateUseRangeList.noDataTitle')" 
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//ProductCertificateUseRangeList collection component
import { ref, markRaw } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { type GridSrvOperations, GridSrvOperation } from '@/lib/types/gridSrv';
import { type GridCommand } from '@/lib/types/grid';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	productCertificateUseRangeList,
	productCertificateUseRangeDetail,
} from '@/services/productCertificateUseRange';
import { productCertificateUseRangeFields } from '@/dataFields/productCertificateUseRange';
import GridColPicts from '@/components/GridColPicts.vue';
import {
	PICT_CDN_CERT_PREVIEW,
	PICT_CDN_CERT_DETAIL,
} from '@/config/constants';
import {
	FilterOperatorParam,
	type CollectionFilterFields,
	type CollectionParams,
} from '@/lib/types/collection';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
// import GridCmdAddRow from '@/components/GridCmdAddRow.vue';
// import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';

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
			id: 'product_certificate_date_from',
			header: t(
				'ProductCertificateUseRangeList.columns.product_certificate_date_from',
			),
			field: productCertificateUseRangeFields.product_certificate_date_from,
		},
		{
			id: 'product_certificates_ref',
			header: t(
				'ProductCertificateUseRangeList.columns.product_certificates_ref',
			),
			field: productCertificateUseRangeFields.product_certificates_ref,
		},
		{
			id: 'product_certificate_status',
			header: t(
				'ProductCertificateUseRangeList.columns.product_certificate_status',
			),
			field: productCertificateUseRangeFields.product_certificate_status,
		},
		{
			id: 'product_certificate_pictures',
			header: t(
				'ProductCertificateUseRangeList.columns.product_certificate_pictures',
			),
			field: productCertificateUseRangeFields.pictures,
			formatControl: markRaw({
				comp: GridColPicts,
				compProps: {
					previewDir: PICT_CDN_CERT_PREVIEW,
					detailDir: PICT_CDN_CERT_DETAIL,
					previewTitle: 'ProductCertificateUseRangeList.pictureTitle',
					colId: 'product_certificate_pictures',
				},
			}),
			sort: false,
		},
	],
];

//initial sort
const initSort = {
	col: 'product_certificate_date_from',
	order: GridColSortOrder.desc,
};

//productCertificateUseRange init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.list]: productCertificateUseRangeList,
	[GridSrvOperation.detail]: productCertificateUseRangeDetail,
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
