<template>
	<Edit v-bind="{ ...props, actClear: props.actClear ?? true }" v-model="model"> </Edit>
</template>

<script setup lang="ts">
import Edit from "./Edit.vue";
import { type EditProps } from "../types/edit";

const model = defineModel<string>();
const props = defineProps<EditProps>();
</script>
