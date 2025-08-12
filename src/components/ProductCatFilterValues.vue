<template>
	<Grid
		grid-key="values"
		:key-fields="['ref_1c']"
		:title="$t('ProductCatFilterDetail.values.title')"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="commands"
		:store="gridStore"
	>
	</Grid>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Grid from '@/lib/components/Grid.vue';
import GridCmdAddRow from '@/lib/components/GridCmdAddRow.vue';
import GridCmdEditRow from '@/lib/components/GridCmdEditRow.vue';
import GridCmdDeleteRow from '@/lib/components/GridCmdDeleteRow.vue';
import { type GridCommand } from '@/lib/types/grid';
import { useCollectionLocal } from '@/lib/composables/useCollectionLocal';
import { GridColSortOrder } from '@/lib/types/grid';
import type { GridCol } from '@/lib/types/grid';
import { DataType } from '@/lib/types/dataTypes';
import { ValidationConstraint } from '@/lib/types/validation';

import { type ProductCatFilterValue } from '@/models/productCatFilter';
import { typeFormatter } from '@/utils/typeFormatter';
import { generateGUID } from '@/utils/guid';

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

const commands: GridCommand[] = [
	{ id: 'add_row', btn: true, comp: GridCmdAddRow },
	{ id: 'edit_row', btn: true, comp: GridCmdEditRow },
	{ id: 'delete_row', btn: true, comp: GridCmdDeleteRow },
];

const initSort = { col: 'id', order: GridColSortOrder.asc };

//-----store init -----
const gridStore = useCollectionLocal(data);
gridStore.setCurrentSort(initSort);
</script>
