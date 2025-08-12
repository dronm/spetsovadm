<template>
	<!--
		:modelValue="model?.toISOString().split('T')[0]"
		@update:modelValue="($e: any) => (model = parseValue($e as string))"

-->
	<Edit
		v-bind="{ ...props, actClear: true }"
		:type="inputType"
		:modelValue="model?.toISOString().split('T')[0]"
		@update:modelValue="($e: any) => (model = parseValue($e as string))"
	>
	</Edit>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Edit from "./Edit.vue";
import { type EditDateProps } from "../types/editDate";

// const model = defineModel<Date>();
//string is coming when using Modal for editting grid???
const [model] = defineModel<Date>("modelValue", {
	required: false,
// 	set(value: Date | string | undefined){
// 		console.log("EditDate set val:",value)
// 		if(!value){
// 			return;
// 		}
// 		if(typeof value === "string"){
// 			value = parseValue(value);
// 		}
// 		return value?.toISOString().split('T')[0];
// 	},
	get(value: string | undefined): Date | undefined {
		return parseValue(value);
	},
});

const props = defineProps<EditDateProps>();
const inputType = ref(props.time? "datetime-local" : "date");

const parseValue = (val: string | undefined): Date | undefined => {
	if (!val) return undefined;

	const timestamp = Date.parse(val);
	if (isNaN(timestamp)) {
		// console.log("parse result is undefined")
		return undefined;
	}

	// console.log("returning parsed value",new Date(timestamp))
	return new Date(timestamp);
};
</script>
