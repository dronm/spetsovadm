<template>
	<Edit
		v-bind="{ ...props, actClear: props.actClear ?? true }"
		v-maska:unmaskedValue.unmasked="'+7(###)-###-##-##'"
		v-model="maskedValue"
		@paste="correctPastedData"
	>
	</Edit>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import Edit from "./Edit.vue";
import { type EditProps } from "../types/edit";

const props = defineProps<EditProps>();
const model = defineModel<string>(); // Parent model (must update this directly)

const maskedValue = ref("");
const unmaskedValue = ref("");

watch(unmaskedValue, (newValue) => {
	model.value = newValue;
});

watch(model, (newVal) => {
	if (newVal !== unmaskedValue.value) {
		maskedValue.value = newVal ?? "";
	}
});
//does not work this way
// watch(model, (newValue) => {
// 	unmaskedValue.value = newValue? newValue : "";
// }, { immediate: true });

// Handle pasted data correctly
const correctPastedData = (e: ClipboardEvent): void => {
	e.stopPropagation();
	e.preventDefault();

	const clipboardData = e.clipboardData;
	if (!clipboardData) return;

	let pastedData = clipboardData.getData("text").replace(/\D/g, ""); // Keep only digits
	let curVal = model.value || "";

	// Remove leading 7 or 8 if pasted data is too long
	if (pastedData.length > 10 && (pastedData.startsWith("8") || pastedData.startsWith("7"))) {
		pastedData = pastedData.substring(1);
	}

	// Ensure max 10 digits
	pastedData = pastedData.substring(0, 10);

	// Append new data to existing value if necessary
	if (pastedData.length < 10) {
		pastedData = curVal + pastedData;
	}

	if (curVal !== pastedData) {
		model.value = pastedData; // Ensure parent model updates
	}
};

defineExpose({ unmaskedValue });
</script>
