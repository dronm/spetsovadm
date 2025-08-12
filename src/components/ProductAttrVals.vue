/* * Used from ProductDetail.vue to edit product_attr_vals field */
<template>
	<GridView
		grid-key="title"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
				{ id: 'add_row', btn: true, comp: GridCmdAddRow },
			]
		"
		:store="gridStore"
	>
		<template v-slot:noData>
			<GridNoData 
				:cmd-add="false"
				:caption="$t('ProductAttrVals.noDataTitle')" 
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import GridView from '@/lib/components/GridView.vue';

import { type GridCommand } from '@/lib/types/grid';
import { useCollectionLocal } from '@/lib/composables/useCollectionLocal';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { DataType } from '@/lib/types/dataTypes';
import { ValidationConstraint } from '@/lib/types/validation';

import { type ProductAttrVal } from '@/models/product';
import { typeFormatter } from '@/utils/typeFormatter';
import GridNoData from '@/components/GridNoData.vue';
import GridCmdSearch from '@/components/GridCmdSearch.vue';
import GridCmdAddRow from '@/components/GridCmdAddRow.vue';

const { t } = useI18n();

const data = defineModel<ProductAttrVal[] | undefined | null>();

const columns = <GridCol[][]>[
	[
		{
			id: 'title',
			header: t('ProductCharDetail.title.label'),
			field: {
				dataType: DataType.text,
				validRules: [{ constraint: ValidationConstraint.required }],
			},
			sort: GridColSortOrder.asc,
		},
		{
			id: 'value',
			header: t('ProductCharDetail.value.label'),
			field: {
				dataType: DataType.text,
				validRules: [{ constraint: ValidationConstraint.required }],
			},
			sort: false,
		},
		{
			id: 'prompt',
			header: t('ProductCharDetail.prompt.label'),
			field: {
				dataType: DataType.text,
			},
			sort: false,
		},
		{
			id: 'visible',
			header: t('ProductCharDetail.visible.label'),
			field: {
				dataType: DataType.bool,
			},
			sort: false,
		},
		{
			id: 'comment_text',
			header: t('ProductCharDetail.comment_text.label'),
			field: {
				dataType: DataType.text,
			},
			sort: false,
		},
	],
];

// const commands: GridCommand[] = [
// 	{ id: 'add_row', btn: true, comp: GridCmdAddRow },
// 	{ id: 'edit_row', btn: true, comp: GridCmdEditRow },
// 	{ id: 'delete_row', btn: true, comp: GridCmdDeleteRow },
// ];

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
