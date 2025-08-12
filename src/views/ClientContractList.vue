//----- template -----
<template>
	<GridView
		grid-key="ClientContractList"
		:key-fields="['id']"
		:title="$t('ClientContractList.title')"
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

import { clientContractList } from '../services/clientContract';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'contract_num',
			header: t('ClientContractList.columns.contract_num'),
			field: {
				dataType: DataType.text,
			},
			sort: GridColSortOrder.asc,
		},
		{
			id: 'contract_date',
			header: t('ClientContractList.columns.date_to'),
			field: {
				dataType: DataType.date,
			},
			sort: GridColSortOrder.desc,
		},
		{
			id: 'pay_terms_set',
			header: t('ClientContractList.columns.pay_terms_set'),
			field: {
				dataType: DataType.bool,
			},
			sort: false,
		},
		{
			id: 'pay_terms_days',
			header: t('ClientContractList.columns.pay_terms_days'),
			field: {
				dataType: DataType.int,
			},
			sort: false,
		},
		{
			id: 'allowed_debt',
			header: t('ClientContractList.columns.allowed_debt'),
			field: {
				dataType: DataType.float,
			},
			sort: false,
		},
	],
]);

//initial sort
const initSort = { col: 'contract_date', order: GridColSortOrder.desc };

const gridSrvCommands: GridCommand[] = [
	{ id: 'refresh_row', btn: true, comp: GridCmdRefresh },
];

//productCertificate init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);

gridStore.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.list]: clientContractList,
});
</script>
