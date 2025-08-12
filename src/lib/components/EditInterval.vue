<template>
	<Edit
		v-bind="{ ...props, actClear: props.actClear ?? true }"
		v-maska="mask"
		:placeholder="placeholder"
		v-model="model"
		:max-length="maxLen"
	>
	</Edit>
</template>

<script setup lang="ts">
import { computed } from "vue";

import Edit from "./Edit.vue";
import { type EditProps } from "../types/edit";

interface Props extends EditProps {
	timePartsCount: number;
}
const props = defineProps<Props>();
const model = defineModel<string>();

const maxLen = computed<number>(
	() => props.timePartsCount * 2 + (props.timePartsCount > 1 ? 1 : 0),
);
const mask = computed<string>(() => {
	let res = "";
	for (let i = 0; i < props.timePartsCount; i++) {
		res += res === "" ? "" : ":";
		res += "##";
	}
	return res;
});

const placeholder = computed<string>(() => {
	let res = "";
	for (let i = 0; i < props.timePartsCount; i++) {
		res += res === "" ? "" : ":";
		res += "__";
	}
	return res;
});
</script>
