<template>
	<div
		class="relative inline-block"
		v-for="(item, index) in menu"
		:key="index"
	>
		<!-- Root Menu Items -->
		<button
			ref="dropdownButtons"
			class="px-4 py-2 text-gray-800 rounded-md focus:outline-none hover:bg-gray-100 cursor-pointer"
			@click="toggleDropdown(index)"
		>
			{{ item.caption }}
		</button>

		<!-- Dropdown Menu -->
		<div
			v-show="openIndex === index"
			ref="dropdownMenus"
			class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-300"
		>
			<ul class="py-1">
				<DropdownItem
					v-for="(child, childIndex) in item.children"
					:key="childIndex"
					:item="child"
					@close-dropdown="openIndex = null"
				/>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DropdownItem from '@/components/DropdownItem.vue';
import { type MenuItem } from '../types/mainMenu';
// import { useAuthStore } from './stores/useAuthStore';

const { menu } = defineProps<{ menu: MenuItem[] }>();
// const authStore = useAuthStore();
// const displayedMenu = computed( () => {
// 	const m = menu;
// 	console.log(authStore.user?.value)
// 	m.push(
// 		<MenuItem>{
// 			caption: authStore.user?.value?.name ?? "user",
// 			route: null,
// 			children: <MenuItem[]>[{
// 				caption: "exit",
// 				route: "logout",
// 				children: null,
// 			}]
// 		}
// 	);
// 	return m;
// });

const openIndex = ref<number | null>(null);
const dropdownMenus = ref<HTMLElement[]>([]);
const dropdownButtons = ref<HTMLElement[]>([]);

// Toggle dropdown visibility
const toggleDropdown = (index: number) => {
	openIndex.value = openIndex.value === index ? null : index;
};

// Close dropdown if clicked outside
const handleClickOutside = (event: MouseEvent) => {
	const isOutside = dropdownMenus.value.every(
		(menu, index) =>
			!menu.contains(event.target as Node) &&
			!dropdownButtons.value[index]?.contains(event.target as Node),
	);
	if (isOutside) {
		openIndex.value = null;
	}
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>
