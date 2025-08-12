<template>
	<div class="flex gap-6">
		<div
			v-for="field in fields"
			:key="field.name"
			class="flex items-center cursor-pointer"
			@click="toggleSort(field)"
			:class="{
				'text-blue-500 font-semibold':
					currentSortField.name === field.name,
			}"
		>
			<font-awesome-icon :icon="['fas', 'sort']" class="mr-2" />
			{{ field.descr }}
			<font-awesome-icon
				:icon="
					currentSortField.name === field.name &&
					currentSortField.isAscending
						? ['fas', 'arrow-up']
						: ['fas', 'arrow-down']
				"
				class="ml-2"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { SortField, SortChangeEvent } from '@/lib/types/collection';

interface Props {
	fields: SortField[];
	sortField: SortField;
}

const { fields, sortField } = defineProps<Props>();
const currentSortField = computed(() => sortField);
const emit = defineEmits(['sortChanged']);

const toggleSort = (field: SortField) => {
	const updatedField: SortChangeEvent = {
		field: field,
		isAscending:
			field.name === currentSortField.value.name
				? !currentSortField.value.isAscending
				: field.isAscending,
	};
	emit('sortChanged', updatedField);
};
</script>
