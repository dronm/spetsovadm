<template>
	<span @click="isExpanded = !isExpanded" class="cursor-pointer">
		<Plus v-if="!isExpanded" class="mr-[8px] ml-[8px]" style="display: inline-block;"/>
		<Minus v-else class="mr-[8px] ml-[8px]" style="display: inline-block;"/>
	</span>
</template>

<script setup lang="ts">
import { computed } from "vue";

import Plus from "@/components/icons/Plus.vue";
import Minus from "@/components/icons/Minus.vue";

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

