<template>
	<GridView
		ref="gridViewRef"
		grid-key="fields"
		:title="$t('NotifTemplateDetail.fields.title')"
		:typeFormatter="typeFormatter"
		:columns="columns"
		:commands="
			<GridCommand[]>[
				{ id: 'search', btn: true, comp: GridCmdSearch},
				{ id: 'add_row', btn: true, comp: GridCmdAddRow },
			]
		"
		:edit="{mode: GridEditMode.inline,}"
		:store="gridStore"
	>
		<template v-slot:noData>
			<GridNoData 
				:caption="$t('NotifTemplateDetailFields.noDataTitle')" 
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

import { type NotifTemplateProviderValue } from '@/models/notifTemplate';
import { typeFormatter } from '@/utils/typeFormatter';
import GridCmdSearch from './GridCmdSearch.vue';
import GridCmdAddRow from './GridCmdAddRow.vue';

const { t } = useI18n();

const gridViewRef = ref<GridViewExpose | null>(null);

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

const initSort = { col: 'id', order: GridColSortOrder.asc };

//-----store init -----
const gridStore = useCollectionLocal(data);
gridStore.setCurrentSort(initSort);

</script>
