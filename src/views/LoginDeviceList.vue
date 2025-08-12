//----- template -----
<template>
	<GridView
		grid-key="loginDeviceList"
		v-if="userId"
		ref="gridContRef"
		:key-fields="['user_agent']"
		:title="$t('LoginDeviceList.title')"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="[
			{ id: 'refresh', btn: true, comp: GridCmdRefresh },
			{ id: 'set_ban', btn: true, comp: LoginDeviceBanBtn },
		]"
		:store="gridStore"
		:edit="false"
		@gridEvent="customCmdHandler"
	>
	</GridView>

	<Confirmation
		v-model="confirmation.show"
		:txt="confirmation.text"
		@confirm="confirmation.confirmed"
		@reject="confirmation.rejected"
	>
	</Confirmation>
</template>

<script setup lang="ts">
//LoginDeviceList collection component
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import Confirmation from '@/lib/components/Confirmation.vue';
import GridCmdRefresh from '@/lib/components/GridCmdRefresh.vue';
import GridView from '@/lib/components/GridView.vue';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { GridSrvOperation, type GridSrvOperations } from '@/lib/types/gridSrv';
import { CollectionParams } from '@/lib/types/collection';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { type FormConfirmation } from '@/lib/types/form';
import { useAPI } from '../lib/utils/useAPI';

import {
	COLLECTION_COUNT,
	COLLECTION_SHOW_PAGES,
	dateTimeFormatOpts,
} from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';

import { loginDeviceList, loginDeviceSetBan } from '@/services/loginDevice';
import { loginDeviceFields } from '@/dataFields/loginDevice';
import LoginDeviceBanBtn from '@/components/LoginDeviceBanBtn.vue';
import { LoginDeviceList, LoginDeviceSetBan } from '@/models/loginDevice';

const { t } = useI18n();

interface Props {
	userId: number;
}
const { userId } = defineProps<Props>();

const confirmation = reactive<FormConfirmation>({
	show: false,
	confirmed: undefined,
	rejected: undefined,
	text: '',
});

const gridContRef = ref(null);

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'date_time_in',
			header: t('LoginDeviceList.columns.date_time_in'),
			field: loginDeviceFields.date_time_in,
			formatOpts: dateTimeFormatOpts,
			sort: GridColSortOrder.desc,
		},
		{
			id: 'user_agent',
			header: t('LoginDeviceList.columns.user_agent'),
			field: loginDeviceFields.user_agent,
			sort: false,
		},
		{
			id: 'banned',
			header: t('LoginDeviceList.columns.banned'),
			field: loginDeviceFields.banned,
			sort: false,
		},
	],
]);

//initial sort
const initSort = { col: 'date_time_in', order: GridColSortOrder.desc };

//login init
const gridStore = useCollectionAPI();
gridStore.rowsPerPage = 0;
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.list]: loginDeviceList,
});
gridStore.setRowsPerPage(COLLECTION_COUNT);
gridStore.setFetchArgs((params: CollectionParams): any[] => {
	return [userId, params];
});

const handleSetBan = async (row: LoginDeviceList) => {
	const result = await useAPI(
		loginDeviceSetBan,
		t(
			row.banned
				? 'LoginDeviceList.unsetBanOk'
				: 'LoginDeviceList.setBanOk',
		),
		8000,
		<LoginDeviceSetBan>{
			user_id: row.user_id,
			device_hash: row.ban_hash,
			ban: !row.banned,
		},
	);
	if (!result.isError) {
		(gridContRef.value as GridViewExpose).gridRef?.onRefresh();
	}
};

const setBanEventHandler = (row: LoginDeviceList) => {
	confirmation.confirmed = function () {
		handleSetBan(row);
	};
	confirmation.text = t(
		row.banned ? 'LoginDeviceList.unbanQuery' : 'LoginDeviceList.banQuery',
	);
	confirmation.show = true;
};

const customCmdHandler = (id: string) => {
	if (id === 'set_ban') {
		if (!gridContRef.value) {
			return;
		}
		const currentCell = (
			gridContRef.value as GridViewExpose
		).gridRef?.getCurrentCell();
		const row = gridStore.getRow(currentCell.row) as LoginDeviceList;
		setBanEventHandler(row);
	}
};
</script>
