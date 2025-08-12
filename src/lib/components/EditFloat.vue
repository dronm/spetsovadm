<template>
	<Edit
		v-bind="{ ...props, actClear: false }"
		:modelValue="model"
		@update:modelValue="($e: any) => (model = parseValue($e as string))"
		@paste="correctPastedData"
		@keydown="onKeyDown"
	>
		<template v-slot:actions v-if="props.actCalc !== false">
			<BtnCalc @result="($e: any) => (model = $e)"> </BtnCalc>
		</template>
	</Edit>
</template>

<script setup lang="ts">
import Edit from "./Edit.vue";
import { type EditProps } from "../types/edit";
import BtnCalc from "./BtnCalc.vue";

interface EditFloatProps extends EditProps {
	actCalc?: boolean;
}
const props = defineProps<EditFloatProps>();

const model = defineModel<number>();

const correctPastedData = (e: ClipboardEvent): void => {
	e.preventDefault(); // Prevent default paste behavior

	const clipboardData = e.clipboardData;
	if (!clipboardData) return;

	let pastedData = clipboardData.getData("text"); // Use lowercase "text" (modern browsers)

	if (!pastedData) return;

	// Extract numbers with optional decimal separators
	const extractedNumbers = pastedData.match(/\d+(?:[.,]\d+)?/g);
	if (!extractedNumbers) return;

	// Convert to valid number format
	pastedData = extractedNumbers.join("").replace(",", ".");

	const parsedValue = parseFloat(pastedData);
	if (!isNaN(parsedValue)) {
		model.value = parsedValue; // Update the model with a valid number
	}
};

const onKeyDown = (event: KeyboardEvent): void => {
	const allowedKeys = [
		"Backspace",
		"Delete",
		"ArrowLeft",
		"ArrowRight",
		"Tab",
		"Enter",
		".",
		",",
	];
	const isDigit = /\d/.test(event.key);

	if (!isDigit && !allowedKeys.includes(event.key)) {
		event.preventDefault();
	}
};

const parseValue = (val: string): number | undefined => {
	const parsedVal = parseFloat(val);
	return isNaN(parsedVal) ? undefined : parsedVal;
};
</script>
