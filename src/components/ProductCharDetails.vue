/* * Used from ProductDetail.vue to view all chars */
<template>
	<GridView
		grid-key="char_id"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
			]
		"
		:store="gridStore"
	>
		<template v-slot:noData>
			<GridNoData 
				:cmd-add="false"
				:caption="$t('ProductCharDetails.noDataTitle')" 
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';
import { useCollectionLocal } from '@/lib/composables/useCollectionLocal';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol, GridCommand } from '@/lib/types/grid';
import { DataType } from '@/lib/types/dataTypes';
import GridCmdSearch from '@/components/GridCmdSearch.vue';

import { type ProductCharDetail } from '@/models/product';
import { typeFormatter } from '@/utils/typeFormatter';
import GridNoData from '@/components/GridNoData.vue';

const { t } = useI18n();

const data = defineModel<ProductCharDetail[] | undefined | null>();

const columns = <GridCol[][]>[
	[
		{
			id: 'char_name',
			header: t('ProductCharDetails.columns.char_name.label'),
			field: {
				dataType: DataType.text,
			},
			sort: GridColSortOrder.asc,
		},
		{
			id: 'quant',
			header: t('ProductCharDetails.columns.quant.label'),
			field: {
				dataType: DataType.int,
			},
			sort: false,
		},
		//no price here because price depends on price type!
		//admin can see all types
	],
];

const initSort = { col: 'title', order: GridColSortOrder.asc };

// const safeModel = computed<EmployeeChild[]>({
// 	get: () => data ?? [],
// 	set: (val) => {
// 		if (!datavalue) {
// 			data = [] as EmployeeChild[];
// 		}
// 		Object.assign(data, val); // Merge changes
// 	},
// });

//-----store init -----
const gridStore = useCollectionLocal(data);
gridStore.setCurrentSort(initSort);
</script>
