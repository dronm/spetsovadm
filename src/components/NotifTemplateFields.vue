<template>
	<Grid
		grid-key="fields"
		:title="$t('NotifTemplateDetail.fields.title')"
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

import { type NotifTemplateProviderValue } from '@/models/notifTemplate';
import { typeFormatter } from '@/utils/typeFormatter';

const { t } = useI18n();

const data = defineModel<NotifTemplateProviderValue[] | undefined | null>();

const columns = <GridCol[][]>[
	[
		{
			id: 'id',
			header: t('NotifTemplateDetail.fields.columns.id'),
			field: {
				dataType: DataType.text,
				validRules: [
					{ constraint: ValidationConstraint.required },
					{ constraint: ValidationConstraint.maxLen, value: 250 },
				],
			},
			sort: GridColSortOrder.desc,
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
