<template>
	<li class="relative">
		<!-- If item has a route, render a router-link -->
		<router-link
			v-if="item.route"
			:to="{ name: item.route }"
			class="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
			@click.native.stop="emit('close-dropdown')"
		>
			<span>{{ item.caption }}</span>
		</router-link>

		<!-- If item has children but no route, render as clickable div -->
		<div
			v-else
			class="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
			@click.stop="toggleSubmenu"
		>
			<span>{{ item.caption }}</span>
			<svg
				v-if="item.children"
				class="w-4 h-4 text-gray-500"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 9l-7 7-7-7"
				/>
			</svg>
		</div>

		<!-- Submenu -->
		<div
			v-show="isOpen"
			class="absolute left-full top-0 mt-0 ml-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
		>
			<ul class="py-1">
				<DropdownItem
					v-for="(child, index) in item.children"
					:key="index"
					:item="child"
					@close-dropdown="closeSubmenu"
				/>
			</ul>
		</div>
	</li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface MenuItem {
	caption: string;
	route: string | null;
	children: MenuItem[] | null;
}

const { item } = defineProps<{ item: MenuItem }>();
const emit = defineEmits(['close-dropdown']);

const isOpen = ref(false);

const toggleSubmenu = () => {
	isOpen.value = !isOpen.value;
};

const closeSubmenu = () => {
	isOpen.value = false;
};
</script>
