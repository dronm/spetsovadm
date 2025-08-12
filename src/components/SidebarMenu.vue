<template>
  <aside class="flex w-[264px] h-[828px] flex-col items-center gap-6 shrink-0 border-r-[color:var(--gray-200)] [background:var(--gray-50)] px-0 py-6 border-r border-solid">

	<Logo class="w-[136.25px] h-10 shrink-0 cursor-pointer" @click="router.push('/')"/>

	<div class="flex flex-col items-start gap-1 self-stretch px-4 py-0">
	  <SidebarMenuItem
		v-for="item in menu"
		:key="item.id"
		:item="item"
	  />
	</div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import SidebarMenuItem from './SidebarMenuItem.vue'
import type { MainMenu } from '../models/mainMenu'

import Logo from "@/components/icons/Logo.vue";

const { menu } = defineProps<{ menu: MainMenu[] }>();

const router = useRouter();
	
</script>

