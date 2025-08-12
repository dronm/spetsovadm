//----- template -----
<template>
	<GridView
		grid-key="countryList"
		:key-fields="['id']"
		:title="$t('CountryList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridCountry"
		:edit="{ mode: GridEditMode.inline }"
	>
	</GridView>
</template>

<script setup lang="ts">
//CountryList collection component
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
	countryAdd,
	countryDel,
	countryList,
	countryDetail,
	countryUpdate,
} from '../services/country';
import { countryFields } from '@/models/country';

const { t } = useI18n();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'name',
			header: t('CountryList.columns.name'),
			field: countryFields.name,
			sort: GridColSortOrder.desc,
		},
	],
]);

//initial sort
const initSort = { col: 'name', order: GridColSortOrder.asc };

//country init
const gridCountry = useCollectionAPI();
gridCountry.setCurrentSort(initSort);
gridCountry.setSrvOperations(
	newGridSrvOperations(
		countryAdd,
		countryDel,
		countryUpdate,
		countryDetail,
		countryList,
	),
);
gridCountry.setRowsPerPage(COLLECTION_COUNT);
</script>
