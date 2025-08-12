<template>
	<!--

		class="p-[10px] left-[1376px] top-[24px] absolute bg-white overflow-hidden rounded-[8px] outline outline-[1px] outline-[#D5D7DA] -outline-offset-1 justify-center items-center inline-flex
			border border-[color:var(--gray-300)] [background:var(--base-white)] p-2.5 rounded-lg border-solid"
-->
	<div 
		class="inline-flex justify-center items-center border border-[color:var(--gray-300)] 
		[background:var(--base-white)] p-2.5 rounded-lg border-solid 
		absolute top-[24px] right-[24px]
		cursor-pointer"
		@click="menuClick"
	>
		<User03 />
	</div>

	<Popover
		v-model:isOpen="menuOpen"
		:items="menuItems"
		:position="menuPosition"
		@selected="menuItemSelected"
	>
	</Popover>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import Popover from "@/lib/components/Popover.vue";
import { type PopoverPosition, type PopoverItem } from "@/lib/types/popover";

import User03 from "@/components/icons/User03.vue"

const { t } = useI18n();

const menuOpen = ref(false);
	
const menuPosition = ref<PopoverPosition>({x: 0, y: 0});
const menuItems = <PopoverItem[]>[
	{id: "userProfile", caption: t("Account.profile")},
	{id: "logout", caption: t("Account.exit")},
];

const emit = defineEmits<{
	selected: [routerName: string];
}>();

const menuClick = (e: MouseEvent) => {
	if(menuOpen.value){
		menuOpen.value = false;
	}else{
		menuPosition.value = { x: e.clientX, y: e.clientY };
		menuOpen.value = true;
	}
}

const menuItemSelected = (item: PopoverItem) => {
	menuOpen.value = false;
	emit("selected", item.id);
}

</script>
