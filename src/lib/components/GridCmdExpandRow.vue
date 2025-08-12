<template>
	<span @click="isExpanded = !isExpanded" class="cursor-pointer mr-1">
		<font-awesome-icon v-if="!isExpanded" :icon="['fas', 'caret-right']" />
		<font-awesome-icon v-else :icon="['fas', 'caret-down']" />
	</span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	expanded: boolean;
}>();

const emit = defineEmits<{
	(e: "update:expanded", value: boolean): void;
}>();

const isExpanded = computed({
	get: () => props.expanded,
	set: (val: boolean) => emit("update:expanded", val),
});
</script>
