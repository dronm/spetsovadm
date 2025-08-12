//----- template -----
<template>
	<GridView
		grid-key="loginList"
		v-if="userId"
		:title="$t('LoginList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="[{ id: 'refresh', btn: true, comp: GridCmdRefresh }]"
		:store="gridStore"
		:edit="false"
	>
	</GridView>
</template>

<script setup lang="ts">
//LoginList collection component
import { ref, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import GridCmdRefresh from '../lib/components/GridCmdRefresh.vue';
import GridView from '@/lib/components/GridView.vue';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { GridSrvOperation, type GridSrvOperations } from '@/lib/types/gridSrv';

import {
	COLLECTION_COUNT,
	COLLECTION_SHOW_PAGES,
	dateTimeFormatOpts,
} from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';

import { loginList, loginDetail } from '@/services/login';
import { loginFields } from '@/dataFields/login';
import type { CollectionParams } from '@/lib/types/collection';
import { FilterJoinParam } from '@/lib/types/collection';
import { FilterOperatorParam } from '@/lib/types/collection';

const { t } = useI18n();

interface Props {
	userId?: number;
}
const { userId } = defineProps<Props>();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'date_time_in',
			header: t('LoginList.columns.date_time_in'),
			field: loginFields.date_time_in,
			sort: GridColSortOrder.desc,
			formatOpts: dateTimeFormatOpts,
		},
		{
			id: 'date_time_out',
			header: t('LoginList.columns.date_time_out'),
			field: loginFields.date_time_out,
			sort: GridColSortOrder.desc,
			formatOpts: dateTimeFormatOpts,
		},
		// {
		// 	id: 'set_date_time',
		// 	header: t('LoginList.columns.set_date_time'),
		// 	field: loginFields.set_date_time,
		// },
		{
			id: 'users_ref',
			header: t('LoginList.columns.users_ref'),
			field: loginFields.users_ref,
		},
		{
			id: 'user_agent_descr',
			header: t('LoginList.columns.user_agent_descr'),
			field: loginFields.user_agent_descr,
		},
	],
]);

//initial sort
const initSort = { col: 'date_time_in', order: GridColSortOrder.desc };

//login init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.list]: loginList,
	[GridSrvOperation.detail]: loginDetail,
});
gridStore.setRowsPerPage(COLLECTION_COUNT);

const fetchParams = reactive<CollectionParams>({
	filter: [],
});

watch(
	() => userId,
	(newVal) => {
		if (newVal != null) {
			fetchParams.filter = [
				{
					j: FilterJoinParam.AND,
					f: { user_id: { o: FilterOperatorParam.E, v: newVal } },
				},
			];
			gridStore.setFetchParams(fetchParams);
		}
	},
	{ immediate: true },
);
</script>
