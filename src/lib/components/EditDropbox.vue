<template>
	<Edit
		:id="id"
		type="text"
		:label="label"
		:required="required"
		:readonly="true"
		:title="title"
		:focus="focus"
		:error="error"
		:actClear="true"
		:useAutocomplete="{
			rows: acItems,
			open: acOpen,
			descrFields: ['descr'],
			minLenForQuery: 0,
		}"
		:modelValue="model ? items[model] : undefined"
		@update:modelValue="onChangeDescr"
		@autocomplete="acSelect"
	>
	</Edit>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import Edit from "./Edit.vue";
import { type EditDropboxProps } from "../types/editDropBox";

const {
	id,
	label,
	required = false,
	title,
	focus = false,
	error,
	items,
} = defineProps<EditDropboxProps>();

//in/out key
const model = defineModel<string | undefined>();

interface AutocompleteItem {
	key: string;
	descr: string;
}
const acItems = computed<AutocompleteItem[]>(() =>
	Object.entries(items).map(([key, descr]) => ({ key, descr })),
);

const emit = defineEmits(["update:modelValue"]);

const acOpen = ref(false);

//Description is changes in Edit component,
//find its key and pass to parent.
const onChangeDescr = (...args: unknown[]) => {
	const newDescr = args[0] as string;

	const newKey =
		newDescr == ""
			? undefined
			: Object.keys(items).find((key) => items[key] === newDescr);
	emit("update:modelValue", newKey); // undefined if descr is empty string
};

//Description is selected in Edit component,
//selected row is passed as parameter,
//get its key and pass to parent.
const acSelect = (data: Record<string, any>) => {
	emit("update:modelValue", data.key);
};
</script>
