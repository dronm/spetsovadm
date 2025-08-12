<template>
  <aside class="w-64 h-screen bg-gray-800 text-white p-4">
    <ul>
      <SidebarMenuItem
        v-for="item in menu"
        :key="item.id"
        :item="item"
      />
    </ul>
  </aside>
</template>

<script setup lang="ts">
import SidebarMenuItem from './SidebarMenuItem.vue'
import type { MainMenu } from '../models/mainMenu'

const { menu } = defineProps<{ menu: MainMenu[] }>();
</script>

