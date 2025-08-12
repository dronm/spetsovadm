<template>

	<div
		class="flex items-stretch w-full h-full cursor-pointer"
		@click.prevent="menuClick"
	>
		<div class="flex-1 p-4">...</div>
	</div>

	<Popover
		v-model:isOpen="contextMenuOpen"
		:items="mousePopup"
		:position="contextMenuPosition"
		@selected="contextMenuItemSelected"
	>
	</Popover>
</template>

<script setup lang="ts">
import { ref } from "vue";
	
import { type PopoverPosition, type PopoverItem } from "@/lib/types/popover";
import { type GridExpose } from "@/lib/components/Grid.vue";
import Popover from "@/lib/components/Popover.vue";

interface Props {
	grid: GridExpose;
	mousePopup: PopoverItem[];
}

const { grid, mousePopup } = defineProps<Props>();

const contextMenuOpen = ref<boolean>(false);
const contextMenuPosition = ref<PopoverPosition>({x: 0, y: 0});

const contextMenuItemSelected = (item: PopoverItem): void => {
	contextMenuOpen.value = false;
	grid.onCommand(item.id);
}

const menuClick = (e: MouseEvent) => {
	contextMenuPosition.value = { x: e.clientX, y: e.clientY };
	contextMenuOpen.value = true;
}

</script>
