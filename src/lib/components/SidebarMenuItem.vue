<template>
  <li>
    <div
      @click="toggle"
      class="cursor-pointer hover:bg-gray-700 px-2 py-1 flex justify-between items-center"
    >
      <span>{{ item.caption }}</span>
      <span v-if="hasChildren">
        <svg
          class="w-4 h-4 transform transition-transform"
          :class="{ 'rotate-90': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
    <ul v-if="hasChildren && isOpen" class="pl-4">
      <SidebarMenuItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MainMenu } from '../models/mainMenu'

import { useRouter } from "vue-router";

const { item } = defineProps<{
  item: MainMenu
}>()

const isOpen = ref(false)
const hasChildren = computed(() => item.children && item.children.length > 0)

const router = useRouter();

function toggle() {
	if (hasChildren.value) {
		isOpen.value = !isOpen.value
	} else if (item.route) {
		// Here you would use router.push in a real app
		console.log('Navigate to:', item.route)
		router.push({ name: item.route });
	}
}
</script>

