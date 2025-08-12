//----- template -----
<template>
	<GridView
		grid-key="productCertificateList"
		:key-fields="['id']"
		:title="$t('ProductCertificateList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="gridSrvCommands"
		:store="gridProductCertificate"
		:edit="false"
	>
	</GridView>
</template>

<script setup lang="ts">
//ProductCertificateList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { type GridCommand } from '@/lib/types/grid';
import GridCmdRefresh from '@/lib/components/GridCmdRefresh.vue';

import { type GridSrvOperations, GridSrvOperation } from '@/lib/types/gridSrv';

import GridColPicts from '@/components/GridColPicts.vue';
import {
	PICT_CDN_CERT_PREVIEW,
	PICT_CDN_CERT_DETAIL,
} from '@/config/constants';
import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	productCertificateList,
	productCertificateDetail,
} from '../services/productCertificate';
import { productCertificateFields } from '@/dataFields/productCertificate';

const { t } = useI18n();

//grid columns

const columns = ref<GridCol[][]>([
	[
		{
			id: 'date_from',
			header: t('ProductCertificateList.columns.date_from'),
			field: productCertificateFields.date_from,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'date_to',
			header: t('ProductCertificateList.columns.date_to'),
			field: productCertificateFields.date_to,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'descr',
			header: t('ProductCertificateList.columns.descr'),
			field: productCertificateFields.descr,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'status',
			header: t('ProductCertificateList.columns.status'),
			field: productCertificateFields.status,
			sort: GridColSortOrder.asc,
		},
		{
			id: 'pictures',
			header: t('ProductCertificateList.columns.pictures'),
			field: productCertificateFields.pictures,
			formatControl: {
				comp: GridColPicts,
				compProps: {
					previewDir: PICT_CDN_CERT_PREVIEW,
					detailDir: PICT_CDN_CERT_DETAIL,
					previewTitle: 'ProductCertificateList.pictureTitle',
					colId: 'pictures',
				},
			},
			sort: false,
		},
	],
]);

//initial sort
const initSort = { col: 'date_from', order: GridColSortOrder.desc };

const gridSrvCommands: GridCommand[] = [
	{ id: 'refresh_row', btn: true, comp: GridCmdRefresh },
];

//productCertificate init
const gridProductCertificate = useCollectionAPI();
gridProductCertificate.setCurrentSort(initSort);

gridProductCertificate.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.list]: productCertificateList,
	[GridSrvOperation.detail]: productCertificateDetail,
});
gridProductCertificate.setRowsPerPage(COLLECTION_COUNT);
</script>
