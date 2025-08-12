//----- template -----
<template>
	<CollectionTitle :title="$t('NotifOutMessageList.title')" />

	<GridView
		ref="gridViewRef"
		grid-key="notifOutMessageList"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
			]
		"
		:store="grid"
		:edit="false"
		@grid-event="handleGridEvent"
		:mouse-popup="defGridPopup()"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('NotifOutMessageList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
//NotifOutMessageList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol, GridCommand } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { GridSrvOperation, type GridSrvOperations } from '@/lib/types/gridSrv';
import GridCmdSearch from '@/components/GridCmdSearch.vue';

import {
	COLLECTION_COUNT,
	COLLECTION_SHOW_PAGES,
	dateTimeFormatOpts,
} from '@/config/constants';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	notifOutMessageList,
	notifOutMessageDetail,
} from '@/services/notifOutMessage';
import { notifOutMessageFields } from '@/dataFields/notifOutMessage';
import CollectionTitle from '@/components/CollectionTitle.vue';
import GridNoData from '@/components/GridNoData.vue';
import { useGridSearchHandler } from '@/composables/useGridSearchHandler';
import type { PopoverItem } from '@/lib/types/popover';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

//grid columns
const formatMessage = (row: any) => {
	let res = '';
	if (row.message.sms) {
		const msg = row.message.sms;
		if (res != '') {
			res += ' ';
		}
		res += `СМС: ID: ${msg.id}, тел: ${msg.tel}, текст: ${msg.text}`;
	} else if (row.message.tm) {
		const msg = row.message.tm;
		if (res != '') {
			res += ' ';
		}
		res += `TM: ID: ${msg.chat_id}, текст: ${msg.text}`;
	} else if (row.message.email) {
		const msg = row.message.email;
		if (res != '') {
			res += ' ';
		}
		res += `Email: Для: ${msg.to_addr}, тема: ${msg.subject}`;
	}
	return res;
};
const columns = ref<GridCol[][]>([
	[
		{
			id: 'created_at',
			header: t('NotifOutMessageList.columns.created_at'),
			field: notifOutMessageFields.created_at,
			sort: GridColSortOrder.desc,
			formatOpts: dateTimeFormatOpts,
		},
		{
			id: 'providers',
			header: t('NotifOutMessageList.columns.providers'),
			field: notifOutMessageFields.providers,
			sort: false,
		},
		{
			id: 'message',
			header: t('NotifOutMessageList.columns.message'),
			field: notifOutMessageFields.message,
			formatFunction: formatMessage,
			sort: false,
		},
		{
			id: 'status',
			header: t('NotifOutMessageList.columns.status'),
			field: notifOutMessageFields.status,
			sort: false,
		},
		{
			id: 'closed',
			header: t('NotifOutMessageList.columns.closed'),
			field: notifOutMessageFields.closed,
			sort: false,
		},
	],
]);

//initial sort
const initSort = { col: 'created_at', order: GridColSortOrder.desc };

//notifOutMessageList init
const grid = useCollectionAPI();
grid.setCurrentSort(initSort);
grid.setSrvOperations(<GridSrvOperations>{
	[GridSrvOperation.list]: notifOutMessageList,
	[GridSrvOperation.detail]: notifOutMessageDetail,
});
grid.setRowsPerPage(COLLECTION_COUNT);

const searchFields = ['providers', 'message'];
const { handleGridEvent } = useGridSearchHandler(grid, searchFields);

const defGridPopup = () => <PopoverItem[]> [
	{id: "refresh", caption: t("GridCmdRefresh.caption"), icon: new URL(`../assets/collection-cmd/refresh.png`, import.meta.url).href},
];
</script>
