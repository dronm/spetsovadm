<template>
	<div
		v-if="visible"
		class="absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg"
		:style="menuStyle"
	>
		<ul class="py-1">
			<li
				v-for="item in items"
				:key="item.key"
				@click="onSelect(item)"
				class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
			>
				{{ item.label }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// Props
defineProps<{
	items: Array<{ key: string; label: string }>;
}>();

// Emits
const emit = defineEmits<{
	(e: "select", item: { key: string; label: string }): void;
}>();

// State
const visible = ref(false);
const x = ref(0);
const y = ref(0);

// Methods
function openMenu(xPos: number, yPos: number) {
	x.value = xPos;
	y.value = yPos;
	visible.value = true;
}

function close() {
	visible.value = false;
}

const menuStyle = computed(() => ({
	top: `${y.value}px`,
	left: `${x.value}px`,
}));

function onSelect(item: { key: string; label: string }) {
	emit("select", item);
	close();
}

// Close on outside click
function handleClickOutside(event: MouseEvent) {
	const el = document.querySelector(".context-menu");
	if (el && !el.contains(event.target as Node)) {
		close();
	}
}

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside);
});

// Expose to parent
defineExpose({ openMenu, close });
</script>
