<template>
	<GridView
		ref="gridViewRef"
		grid-key="values"
		:key-fields="['ref_1c']"
		:title="$t('ProductCatFilterDetail.values.title')"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch },
				{ id: 'add_row', btn: true, comp: GridCmdAddRow },
			]
		"
		:edit="{mode: GridEditMode.inline,}"
		:store="gridStore"
		:mouse-popup="defGridPopup()"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('ProductCatFilterDetail.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from 'vue-i18n';

import GridView, { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridEditMode, type GridCommand } from '@/lib/types/grid';
import { useCollectionLocal } from '@/lib/composables/useCollectionLocal';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { DataType } from '@/lib/types/dataTypes';
import { ValidationConstraint } from '@/lib/types/validation';

import { type ProductCatFilterValue } from '@/models/productCatFilter';
import { typeFormatter } from '@/utils/typeFormatter';
import { generateGUID } from '@/utils/guid';
import GridCmdSearch from './GridCmdSearch.vue';
import GridCmdAddRow from './GridCmdAddRow.vue';
import { defGridPopup } from "@/utils/defGridPopup";

const gridViewRef = ref<GridViewExpose | null>(null);

const { t } = useI18n();

const data = defineModel<ProductCatFilterValue[] | undefined | null>();

const columns = <GridCol[][]>[
	[
		{
			id: 'ref_1c',
			visible: false,
			defaultValue: function () {
				return generateGUID();
			},
			field: {
				dataType: DataType.text,
				validRules: [
					{ constraint: ValidationConstraint.required },
					{ constraint: ValidationConstraint.maxLen, value: 36 },
				],
			},
			sort: false,
		},
		{
			id: 'name',
			header: t('ProductCatFilterDetail.values.columns.name'),
			field: {
				dataType: DataType.text,
				validRules: [
					{ constraint: ValidationConstraint.required },
					{ constraint: ValidationConstraint.maxLen, value: 250 },
				],
			},
			sort: GridColSortOrder.asc,
		},
	],
];

const initSort = { col: 'id', order: GridColSortOrder.asc };

//-----store init -----
const gridStore = useCollectionLocal(data);
gridStore.setCurrentSort(initSort);
</script>
