<template>
	<div v-show="isActive" class="mt-[40px]">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { type Ref } from "vue";
import { inject, computed } from "vue";

const activeTab = inject<Ref>("activeTab");
const tabs = inject<Ref>("tabs");

// Get the current index of this tab
const index = computed(() => tabs?.value.findIndex((tab: any) => tab.title === title));

// Check if this tab is active
const isActive = computed(() => activeTab?.value === index.value);

interface Props {
	title: string;
}

const { title } = defineProps<Props>();
</script>
