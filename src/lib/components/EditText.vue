/* * MIT License * * Copyright (c) 2025 Andrey Mikhalevich * * Permission is hereby granted, free of
charge, to any person obtaining a copy * of this software and associated documentation files (the
"Software"), to deal * in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell * copies of the
Software, and to permit persons to whom the Software is * furnished to do so, subject to the
following conditions: * */ //----template----
<template>
	<div class="control-container">
		<label :for="id" v-if="label" class="control-label">
			{{ label }}
		</label>

		<div class="edit-container">
			<!-- before input buttons -->
			<!--
			<span class="edit-btn-container">
				<slot name="buttonsBefore"></slot>
			</span>
			-->

			<!-- core input -->
			<textarea
				id="id"
				:name="name"
				ref="inputControl"
				:class="['edit-control-text', { 'no-right-radius': hasActions }]"
				v-model="model"
				:required="required"
				:disabled="disabled"
				:title="title"
				:maxlength="maxLength"
				:placeholder="placeholder"
				:cols="cols"
				:rows="rows"
				:wrap="wrap"
			>
			</textarea>

			<!-- after input buttons -->
			<span :class="['edit-btn-container', { 'no-left-radius': hasActions }]">
				<slot name="actions"></slot>

				<BtnClear v-if="actClear" @click="onClear"> </BtnClear>
			</span>
		</div>

		<!-- any other information -->
		<div>
			<slot name="inf"></slot>
		</div>

		<!-- error -->
		<div v-if="error && error.length">
			{{ error }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, shallowRef, onMounted, computed, useSlots } from "vue";

import BtnClear from "./BtnClear.vue";
import { type EditTextProps } from "../types/editText";

//TODO: make type a Enum
//default values
const {
	id,
	name,
	disabled = false,
	label,
	required = false,
	placeholder,
	maxLength,
	title,
	focus = false,
	actClear = false,
	error,
	cols,
	rows = 3,
	wrap,
} = defineProps<EditTextProps>();

const hasActions = computed(() => !!useSlots().actions || actClear === true);

const inputControl = ref<HTMLInputElement | null>(null);
const model = defineModel<any>("modelValue", { required: false });

const emit = defineEmits<{
	autocomplete: [row: Record<string, any>];
	"update:modelValue": [newVal: string];
}>();

const focusInput = () => {
	if (inputControl.value) {
		inputControl.value.focus();
	}
};

const onClear = () => {
	emit("update:modelValue", "");
	focusInput();
};

// let cleave: any; //Cleave

onMounted(() => {
	if (focus) {
		focusInput();
	}
});
</script>
