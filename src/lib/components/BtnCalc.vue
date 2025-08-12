<template>
	<div class="relative">
		<Button
			:title="t('BtnCalc.title')"
			class="action"
			variant="btn-cmd"
			@click="toggleCalculator"
		>
			<font-awesome-icon :icon="['fas', 'calculator']" />
		</Button>

		<div
			v-if="showCalculator"
			class="absolute top-full mt-2 right-0 bg-white p-4 rounded-lg shadow-lg w-80"
		>
			<div class="flex justify-between mb-2">
				<h2 class="text-lg font-bold">Calculator</h2>
				<button @click="toggleCalculator" class="text-red-500">✖</button>
			</div>
			<input
				v-model="expression"
				type="text"
				readonly
				class="w-full p-2 mb-2 border border-gray-300 rounded"
			/>
			<div class="grid grid-cols-4 gap-2">
				<button
					v-for="btn in buttons"
					:key="btn"
					@click="onButtonClick(btn)"
					class="p-3 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					{{ btn }}
				</button>
			</div>
			<div class="flex justify-between mt-2">
				<Button
					@click="clearInput"
					:title="t('BtnClear.title')"
					class="bg-red-500 text-white p-2 rounded hover:bg-red-700"
				>
					<font-awesome-icon :icon="['fas', 'xmark']" />
				</Button>
				<Button
					@click="calculateResult"
					:title="t('BtnEqual.title')"
					class="bg-green-500 text-white p-2 rounded hover:bg-green-700"
				>
					=
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import Button from "./Button.vue";

const { t } = useI18n();
const showCalculator = ref(false);
const expression = ref("");
const emit = defineEmits<{ result: [value: number] }>();

const buttons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "+"];

const toggleCalculator = () => {
	showCalculator.value = !showCalculator.value;
};

const onButtonClick = (value: string) => {
	expression.value += value;
};

const clearInput = () => {
	expression.value = "";
};

const calculateResult = () => {
	try {
		const result = eval(expression.value); // Note: eval is used here for simplicity, but be cautious with user input.
		emit("result", parseFloat(result));
		expression.value = result.toString();
	} catch (error) {
		expression.value = "Error";
	}
};
</script>
