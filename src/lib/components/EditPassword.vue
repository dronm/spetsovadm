<template>
	<Edit v-bind="{ ...props, actClear: false }" v-model="model" type="password"> </Edit>
</template>

<script setup lang="ts">
import Edit from "./Edit.vue";
import { type EditProps } from "../types/edit";

const props = defineProps<EditProps>();
const model = defineModel<string>();
</script>
