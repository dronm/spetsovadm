<template>
	<Edit
		v-bind="{ ...props }"
		:max-length="14"
		v-maska:unmaskedValue.unmasked="'###-###-### ##'"
		v-model="maskedValue"
		@paste="correctPastedData"
	>
	</Edit>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Edit from '@/lib/components/Edit.vue';
import type { EditProps } from '@/lib/types/edit';

const props = defineProps<EditProps>();

const model = defineModel<string>(); // Parent model (must update this directly)

const maskedValue = ref('');
const unmaskedValue = ref('');

watch(unmaskedValue, (newValue) => {
	model.value = newValue;
});

watch(model, (newVal) => {
	if (newVal !== unmaskedValue.value) {
		maskedValue.value = newVal ?? '';
	}
});

const correctPastedData = (e: ClipboardEvent): void => {
	e.stopPropagation();
	e.preventDefault();

	const clipboardData = e.clipboardData;
	if (!clipboardData) return;

	let pastedData = clipboardData.getData('text').replace(/\D/g, ''); // Keep only digits
	let curVal = model.value || '';

	// Ensure max 11 digits
	pastedData = pastedData.substring(0, 11);

	// Append new data to existing value if necessary
	if (pastedData.length < 11) {
		pastedData = curVal + pastedData;
	}

	if (curVal !== pastedData) {
		model.value = pastedData; // Ensure parent model updates
	}
};

defineExpose({ unmaskedValue });
</script>
