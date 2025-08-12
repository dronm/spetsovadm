//----- template -----
<template>
	<GridView
		grid-key="timezoneList"
		:key-fields="['id']"
		:title="$t('TimeZoneLocaleList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridTimeZoneLocale"
		:edit="{ mode: GridEditMode.inline }"
	>
	</GridView>
</template>

<script setup lang="ts">
//TimeZoneLocaleList collection component
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { defGridSrvCommands } from '@/utils/defGridSrvCommands';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	timeZoneLocaleAdd,
	timeZoneLocaleDel,
	timeZoneLocaleList,
	timeZoneLocaleDetail,
	timeZoneLocaleUpdate,
} from '../services/timeZoneLocale';
import { timeZoneLocaleFields } from '@/models/timeZoneLocale';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('TimeZoneLocaleList.columns.name'),
			field: timeZoneLocaleFields.name,
			sort: GridColSortOrder.desc,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//timeZoneLocale init
const gridTimeZoneLocale = useCollectionAPI();
gridTimeZoneLocale.setCurrentSort(initSort);
gridTimeZoneLocale.setSrvOperations(
	newGridSrvOperations(
		timeZoneLocaleAdd,
		timeZoneLocaleDel,
		timeZoneLocaleUpdate,
		timeZoneLocaleDetail,
		timeZoneLocaleList,
	),
);
gridTimeZoneLocale.setRowsPerPage(COLLECTION_COUNT);
</script>
