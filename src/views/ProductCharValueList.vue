//----- template -----
<template>
	<GridView
		grid-key="productCharValueList"
		v-if="productCharId"
		:key-fields="['id']"
		:title="$t('ProductCharValueList.title')"
		:typeFormatter="typeFormatter"
		:show-pages="COLLECTION_SHOW_PAGES"
		:columns="columns"
		:commands="defGridSrvCommands"
		:store="gridStore"
		:edit="{ mode: GridEditMode.inline }"
	>
	</GridView>
</template>

<script setup lang="ts">
//ProductCharList collection component
import { ref, watch, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { GridColSortOrder, GridEditMode } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { useCollectionAPI } from '@/lib/composables/useCollectionAPI';
import { newGridSrvOperations } from '@/lib/types/gridSrv';
import {
	FilterOperatorParam,
	type CollectionParams,
} from '@/lib/types/collection';
import { FilterJoinParam } from '@/lib/types/collection';

import { COLLECTION_COUNT, COLLECTION_SHOW_PAGES } from '@/config/constants';
import { defGridSrvCommands } from '@/utils/defGridSrvCommands';
import { typeFormatter } from '@/utils/typeFormatter';

import {
	productCharValueAdd,
	productCharValueDel,
	productCharValueList,
	productCharValueDetail,
	productCharValueUpdate,
} from '@/services/productCharValue';
import { productCharValueFields } from '@/dataFields/productCharValue';

const { t } = useI18n();

interface Props {
	productCharId: number;
}

const { productCharId } = defineProps<Props>();

//grid columns
const columns = ref<GridCol[][]>([
	[
		{
			id: 'value',
			header: t('ProductCharValueList.columns.value'),
			field: productCharValueFields.value,
			sort: GridColSortOrder.asc,
		},
	],
]);

//initial sort
const initSort = { col: 'value', order: GridColSortOrder.asc };

//productCharValue init
const gridStore = useCollectionAPI();
gridStore.setCurrentSort(initSort);
gridStore.setSrvOperations(
	newGridSrvOperations(
		productCharValueAdd,
		productCharValueDel,
		productCharValueUpdate,
		productCharValueDetail,
		productCharValueList,
	),
);

const fetchParams = reactive<CollectionParams>({
	filter: [],
});
watch(
	() => productCharId,
	(newVal) => {
		if (newVal != null) {
			fetchParams.filter = [
				{
					j: FilterJoinParam.AND,
					f: {
						product_char_id: {
							o: FilterOperatorParam.E,
							v: newVal,
						},
					},
				},
			];
			gridStore.setFetchParams(fetchParams);
		}
	},
	{ immediate: true },
);

gridStore.setRowsPerPage(COLLECTION_COUNT);
</script>
