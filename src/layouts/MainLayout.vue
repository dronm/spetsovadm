<template>
	<header v-if="menu.length">
		<div class="wrapper">
			<MainMenu :menu="menu" />
		</div>
	</header>

	<div class="flex flex-col min-h-screen max-w-7xl mx-auto px-4 lg:px-8">
		<!-- Navigation -->
		<nav class="header-nav">
			<router-link
				to="/About"
				class="nav-link"
				:title="$t('MainLayout.routes.About.title')"
			>
				{{ $t('MainLayout.routes.About.caption') }}
			</router-link>

			<router-link
				to="/Store"
				class="nav-link"
				:title="$t('MainLayout.routes.Store.title')"
			>
				{{ $t('MainLayout.routes.Store.caption') }}
			</router-link>

			<span>
				<span>
					<font-awesome-icon :icon="['fas', 'phone']" />
					<a :href="`tel:${MAIN_TEL}`">
						{{ MAIN_TEL_DESCR }}
					</a>
				</span>
			</span>
		</nav>

		<!-- Header -->
		<Header />

		<!-- Main Container for Selected View -->
		<main class="flex-1 content">
			<router-view />
		</main>

		<!-- Footer -->
		<footer class="p-4 border-solid divide-y">
			<nav class="flex gap-4 justify-center">
				<router-link to="/" :title="$t('MainLayout.routes.Main.title')">
					{{ $t('MainLayout.routes.Main.caption') }}
				</router-link>

				<router-link
					to="/About"
					:title="$t('MainLayout.routes.About.title')"
				>
					{{ $t('MainLayout.routes.About.caption') }}
				</router-link>

				<router-link
					to="/Store"
					:title="$t('MainLayout.routes.Store.title')"
				>
					{{ $t('MainLayout.routes.Store.caption') }}
				</router-link>
			</nav>
		</footer>
	</div>

	<NotificationWindow />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import NotificationWindow from '@/lib/components/NotificationWindow.vue';

import Header from '../components/Header.vue';
import { MAIN_TEL, MAIN_TEL_DESCR } from '../config/constants';

import MainMenu from '@/components/MainMenu.vue';
import { type MainMenuForUser } from '@/models/mainMenu';
import { mainMenuMenu } from '@/services/mainMenu';
import { useAuthStore } from '@/stores/useAuthStore';

const menu = ref<MainMenuForUser[]>([]);

const { t } = useI18n();
const fetchMenu = async () => {
	menu.value = await mainMenuMenu.func();
	menu.value.push(<MainMenuForUser>{
		caption: user.value?.name_full,
		route: null,
		children: <MainMenuForUser[]>[
			{
				caption: t('App.menuProfile.caption'),
				route: 'userProfile',
				children: null,
			},
			{
				caption: t('App.menuLogout.caption'),
				route: 'logout',
				children: null,
			},
		],
	});
};

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
watchEffect(() => {
	if (authStore.isAuthenticated()) {
		fetchMenu();
	} else {
		menu.value = []; // Reset menu when user logs out
	}
});
</script>
