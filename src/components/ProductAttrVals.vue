/* * Used from ProductDetail.vue to edit product_attr_vals field */
<template>
	<GridView
		ref="gridViewRef"
		grid-key="title"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
				// { id: 'add_row', btn: true, comp: GridCmdAddRow },
			]
		"
		:edit="{mode: GridEditMode.inline,}"
		:store="gridStore"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('ProductAttrVals.noDataTitle')" 
				:cmd-add="false"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from 'vue-i18n';

import GridView, { type GridViewExpose } from '@/lib/components/GridView.vue';

import { type GridCommand } from '@/lib/types/grid';
import { useCollectionLocal } from '@/lib/composables/useCollectionLocal';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { DataType } from '@/lib/types/dataTypes';
import { ValidationConstraint } from '@/lib/types/validation';

import { type ProductAttrVal } from '@/models/product';
import { typeFormatter } from '@/utils/typeFormatter';
import GridNoData from '@/components/GridNoData.vue';
import { GridEditMode } from "@/lib/types/grid";
import GridCmdSearch from './GridCmdSearch.vue';

const { t } = useI18n();

const data = defineModel<ProductAttrVal[] | undefined | null>();

const gridViewRef = ref<GridViewExpose | null>(null);

const columns = <GridCol[][]>[
	[
		{
			id: 'title',
			header: t('ProductAttrVals.columns.title.label'),
			field: {
				dataType: DataType.text,
				validRules: [{ constraint: ValidationConstraint.required }],
			},
			sort: GridColSortOrder.asc,
		},
		{
			id: 'value',
			header: t('ProductAttrVals.columns.value.label'),
			field: {
				dataType: DataType.text,
				validRules: [{ constraint: ValidationConstraint.required }],
			},
			sort: false,
		},
		{
			id: 'prompt',
			header: t('ProductAttrVals.columns.prompt.label'),
			field: {
				dataType: DataType.text,
			},
			sort: false,
		},
		{
			id: 'visible',
			header: t('ProductAttrVals.columns.visible.label'),
			field: {
				dataType: DataType.bool,
			},
			sort: false,
		},
		{
			id: 'comment_text',
			header: t('ProductAttrVals.columns.comment_text.label'),
			field: {
				dataType: DataType.text,
			},
			sort: false,
		},
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
