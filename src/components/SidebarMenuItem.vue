<template>
    <div
		@click="toggle"
		class="flex justify-between items-center self-stretch px-3.5 py-2.5 rounded-lg cursor-pointer"
		:class="{ 'bg-gray-200': isActive }"
    >
		<div class="flex items-center gap-1">
			<!--<img v-if="item.icon" class="w-5 h-5" :src="iconPath" />
-->
			<Component 
				v-if="item.icon"
				:is="item.icon"
				class="w-5 h-5"
				color="#097350"
			</Component>

			<div class="flex justify-center items-center px-0.5 py-0">
				<span class="text-[color:var(--Brand-700,#097350)] [font-family:Inter] text-sm font-semibold leading-5">
					{{ item.caption }}
				</span>
			</div>
		</div>

		<ChevronRight 
			v-if="hasChildren" 
			class="w-5 h-5 transform transition-transform" 
			:class="{ 'rotate-90': isOpen }"
		/>
		
    </div>

    <div v-if="hasChildren && isOpen" class="pl-5">
      <SidebarMenuItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MainMenu } from '../models/mainMenu'

import { useRouter, useRoute } from "vue-router";
import ChevronRight from "@/components/icons/ChevronRight.vue";

const { item } = defineProps<{
  item: MainMenu
}>()

const isOpen = ref(false)
const hasChildren = computed(() => item.children && item.children.length > 0)

const router = useRouter();
const route = useRoute();

const isActive = computed(() => {
	return item.route && route.name === item.route;
});

function toggle() {
	if (hasChildren.value) {
		isOpen.value = !isOpen.value
	} else if (item.route) {
		// Here you would use router.push in a real app
		console.log('Navigate to:', item.route)
		router.push({ name: item.route });
	}
}

// const iconPath = computed(() => {
//   return item.icon
//     ? new URL(`../assets/adm-menu/${item.icon}`, import.meta.url).href
//     : ''
// })

</script>

