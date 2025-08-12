<template>
	<ul v-if="isOpen" 
		ref="popoverRef"
		class="popover fixed"
		:style="{ top: `${props.position.y}px`, left: `${props.position.x}px` }"
	>
		<li
			v-for="item in props.items" :key="item.id"
			class="popover-item"
			@click="onItemClick(item)"
		>
			<span v-if="item.icon">
				<img class="w-5 h-5" :src="item.icon" />
			</span>

			<span class="ml-2">
				{{ item.caption }}
			</span>
		</li>
	</ul>
</template>

<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from "vue";

import { type PopoverPosition, type PopoverItem } from "../types/popover";

interface PopoverProps {
	items?: PopoverItem[];
	position: PopoverPosition;
}

const props = defineProps<PopoverProps>();
	
const emit = defineEmits<{
	selected: [item: PopoverItem];
}>();

const isOpen = defineModel('isOpen', { required: true });

const onItemClick = (item: PopoverItem) => {
	emit("selected", item);
}

const popoverRef = ref<HTMLElement | null>(null);
const handleClickOutside = (event: MouseEvent) => {
  if (popoverRef.value && !popoverRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

</script>
