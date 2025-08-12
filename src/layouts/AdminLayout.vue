<template>
	<Login v-if="!authed" />

	<template v-else>
		<div class="w-full h-[828px] [background:#FFF] flex">

			<SidebarMenu v-if="menu.length" :menu="menu"/>

			<div class="flex-1 relative">
				<Account @selected="onAccountMenuSelected" />
				<router-view />
			</div>

		</div>
	</template>

	<NotificationWindow />
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';

import NotificationWindow from '@/lib/components/NotificationWindow.vue';

// import MainMenu from '@/components/MainMenu.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';
import Account from '@/components/Account.vue';
import Login from '@/views/Login.vue';

import { type MainMenuForUser } from '@/models/mainMenu';
import { mainMenuMenu } from '@/services/mainMenu';
import { useAuthStore } from '@/stores/useAuthStore';

import { useRouter } from "vue-router";

const menu = ref<MainMenuForUser[]>([]);

const authed = computed(() => authStore.isAuthenticated());

const fetchMenu = async () => {
	menu.value = await mainMenuMenu.func();
};

const authStore = useAuthStore();
// const { user } = storeToRefs(authStore);
watchEffect(() => {
	if (authed.value) {
		fetchMenu();
	} else {
		menu.value = []; // Reset menu when user logs out
	}
});

const router = useRouter();
const onAccountMenuSelected = (routerName: string) => {
	router.push({name: routerName});
}

</script>
