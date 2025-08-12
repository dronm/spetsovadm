/* * This component is used from ProductCatFilterDetail */
<template>
	<Grid
		ref="gridRef"
		grid-key="filters"
		:key-fields="['line']"
		:title="$t('ProductCatDetail.filters.title')"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="commands"
		:store="gridStore"
	>
	</Grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Grid from '@/lib/components/Grid.vue';
import { type GridExpose } from '@/lib/components/Grid.vue';
import GridCmdAddRow from '@/lib/components/GridCmdAddRow.vue';
import GridCmdEditRow from '@/lib/components/GridCmdEditRow.vue';
import GridCmdDeleteRow from '@/lib/components/GridCmdDeleteRow.vue';
import { type GridCommand } from '@/lib/types/grid';
import { useCollectionLocal } from '@/lib/composables/useCollectionLocal';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { DataType } from '@/lib/types/dataTypes';
import { ValidationConstraint } from '@/lib/types/validation';

import { typeFormatter } from '@/utils/typeFormatter';
import { type ProductCatFilterAttr } from '@/models/productCat';
import ProductCatFilterNameEdit from './ProductCatFilterNameEdit.vue';

const { t } = useI18n();

const data = defineModel<ProductCatFilterAttr[] | undefined | null>();

const gridRef = ref<GridExpose | null>(null);

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
			// visible: false,
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
						const eRow = gridRef.value?.getEditRow();
						if (eRow && filter) {
							console.log('setting name to ' + filter.name);
							const editRow =
								eRow as unknown as ProductCatFilterAttr;
							if (gridRef.value?.isInsertMode && !editRow.line) {
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

const commands: GridCommand[] = [
	{ id: 'add_row', btn: true, comp: GridCmdAddRow },
	{ id: 'edit_row', btn: true, comp: GridCmdEditRow },
	{ id: 'delete_row', btn: true, comp: GridCmdDeleteRow },
];

const initSort = { col: 'line', order: GridColSortOrder.asc };

//-----store init -----
const gridStore = useCollectionLocal(data);
gridStore.setCurrentSort(initSort);
</script>
