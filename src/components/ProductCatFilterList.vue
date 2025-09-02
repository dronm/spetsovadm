/* * This component is used from ProductCatFilterDetail */
<template>
	<GridView
		ref="gridViewRef"
		grid-key="filters"
		:key-fields="['line']"
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
				:caption="$t('ProductCatFilterList.noDataTitle')" 
				@add-row="gridViewRef?.gridRef.onCommand('add_row')"
			/>
		</template>
	</GridView>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GridView, { type GridViewExpose } from '@/lib/components/GridView.vue';
import { GridEditMode, type GridCommand } from '@/lib/types/grid';
import { useCollectionLocal } from '@/lib/composables/useCollectionLocal';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { DataType } from '@/lib/types/dataTypes';
import { ValidationConstraint } from '@/lib/types/validation';

import { typeFormatter } from '@/utils/typeFormatter';
import { type ProductCatFilterAttr } from '@/models/productCat';
import ProductCatFilterNameEdit from './ProductCatFilterNameEdit.vue';
import { defGridPopup } from "@/utils/defGridPopup";
import GridCmdSearch from './GridCmdSearch.vue';
import GridCmdAddRow from './GridCmdAddRow.vue';

const { t } = useI18n();

const data = defineModel<ProductCatFilterAttr[] | undefined | null>();

const gridViewRef = ref<GridViewExpose | null>(null);

const columns = <GridCol[][]>[
	[
		{
			id: 'line',
			header: t('ProductCatDetail.filters.columns.line'),
			editable: false,
			field: {
				dataType: DataType.int,
				defaultValue: function (data: ProductCatFilterAttr[]) {
					return data.length + 1;
				},
				validRules: [
					{ constraint: ValidationConstraint.required },
					{ constraint: ValidationConstraint.maxLen, value: 36 },
				],
			},
			sort: false,
		},
		{
			id: 'ref_1c',
			visible: false,
			editable: false,
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
			header: t('ProductCatDetail.filters.columns.name'),
			field: {
				dataType: DataType.text,
				validRules: [
					{ constraint: ValidationConstraint.required },
					{ constraint: ValidationConstraint.maxLen, value: 250 },
				],
			},
			editControl: {
				comp: ProductCatFilterNameEdit,
				compEvents: {
					'update:modelValue': (e: any) => {
						const filter = e as ProductCatFilterAttr | undefined;
						console.log('modelValue:', filter);
						const eRow = gridViewRef.value?.gridRef.getEditRow();
						if (eRow && filter) {
							// console.log('setting name to ' + filter.name);
							const editRow =
								eRow as unknown as ProductCatFilterAttr;
							if (gridViewRef.value?.gridRef.isInsertMode && !editRow.line) {
								editRow.line =
									(gridStore.displayedData.value?.length ??
										0) + 1;
							}
							editRow.ref_1c = filter.ref_1c;
							editRow.name = filter.name;
							editRow.values = filter.values;
						} else if (eRow) {
							const editRow =
								eRow as unknown as ProductCatFilterAttr;
							editRow.ref_1c = '';
							editRow.name = '';
							editRow.values = [];
						}
					},
				},
			},
			sort: GridColSortOrder.asc,
		},
		{
			id: 'values',
			header: t('ProductCatDetail.filters.columns.values'),
			editable: false,
			formatFunction: function (row: ProductCatFilterAttr): string {
				if (!row.values || !row.values.length) {
					return '';
				}
				return row.values.map((v) => v.name).join(', ');
			},
			field: {
				dataType: DataType.json,
			},
			sort: false,
		},
	],
];

const initSort = { col: 'line', order: GridColSortOrder.asc };

//-----store init -----
const gridStore = useCollectionLocal(data);
gridStore.setCurrentSort(initSort);

</script>
