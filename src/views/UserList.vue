//----- template -----
<template>
	<CollectionTitle :title="$t('UserList.title')" />

	<GridView
		ref="gridViewRef"
		grid-key="userList"
		:key-fields="['id']"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridUser"
		:edit="{ mode: GridEditMode.router, routeName: 'userDetail' }"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('UserList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//UserList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';
import { type FormData } from '@/lib/types/form';

import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { defGridSrvCommands } from '@/utils/defGridSrvCommands';
import { typeFormatter } from '@/utils/typeFormatter';
import { TEL_REG_EXP } from '@/config/constants';

import {
	userAdd,
	userDel,
	userList,
	userDetail,
	userUpdate,
} from '../services/user';
import { userFields } from '@/dataFields/user';
import { formatTel } from '@/utils/typeFormatter';

const gridViewRef = ref<GridViewExpose | null>(null);

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('UserList.columns.name'),
			field: userFields.name,
			formatFunction: function (row: FormData): string {
				const val = row['name'] as string;
				if (TEL_REG_EXP.test(val)) {
					//return as tel
					return formatTel(val);
				}
				//as email
				return val;
			},
			sort: GridColSortOrder.desc,
		},
		{
			id: 'role_id',
			header: t('UserList.columns.role'),
			field: userFields.role_id,
			sort: GridColSortOrder.desc,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//user init
const gridUser = useCollectionAPI();
gridUser.setCurrentSort(initSort);
gridUser.setSrvOperations(
	newGridSrvOperations(userAdd, userDel, userUpdate, userDetail, userList),
);
gridUser.setRowsPerPage(COLLECTION_COUNT);
</script>
