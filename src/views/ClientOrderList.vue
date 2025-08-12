//----- template -----
<template>
	<GridView
		grid-key="ClientOrderList"
		:key-fields="['id']"
		:title="$t('ClientOrderList.title')"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="gridSrvCommands"
		:store="gridStore"
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
import { DataType } from '@/lib/types/dataTypes';

import { type GridSrvOperations, GridSrvOperation } from '@/lib/types/gridSrv';
import { typeFormatter } from '@/utils/typeFormatter';

import { clientOrderList } from '../services/clientOrder';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'num_1c',
			header: t('ClientOrderList.columns.num_1c'),
			field: {
				dataType: DataType.text,
			},
			sort: GridColSortOrder.asc,
		},
		{
			id: 'date_1c',
			header: t('ProductCertificateList.columns.date_1c'),
			field: {
				dataType: DataType.date,
			},
			sort: GridColSortOrder.desc,
		},
		{
			id: 'total',
			header: t('ProductCertificateList.columns.total'),
			field: {
				dataType: DataType.float,
			},
			sort: false,
		},
	],
]);

//initial sort
const initSort = { col: 'date_1c', order: GridColSortOrder.desc };

const gridSrvCommands: GridCommand[] = [
	{ id: 'refresh_row', btn: true, comp: GridCmdRefresh },
];

//productCertificate init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);

gridStore.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.list]: clientOrderList,
});
</script>
