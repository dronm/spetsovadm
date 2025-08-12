<template>
	<div class="space-y-6">
		<Breadcrumb />

		<!-- View Header -->
		<ViewHeader class="text-2xl font-semibold text-gray-800">
			{{ $t('MainLayout.routes.Store.captionFull') }}
		</ViewHeader>

		<!-- Wrapper -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Store List -->
			<div class="lg:col-span-1 bg-white shadow rounded-lg p-6 space-y-4">
				<p v-if="loading" class="text-gray-500 text-center">
					{{ $t('Notifications.loading') }}
				</p>
				<p v-if="error" class="text-red-500 text-center">
					{{ error }}
				</p>
				<ul v-if="stores" class="space-y-4">
					<li
						v-for="store in stores"
						:key="store.id"
						class="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
						@click="onStoreSelect(store)"
					>
						<p class="font-medium text-gray-800">
							{{ store.address }}
						</p>
						<div class="mt-2 text-sm text-gray-600">
							<p>{{ store.email }}</p>
							<p>{{ store.work_hours }}</p>
							<p>{{ store.tels }}</p>
						</div>
					</li>
				</ul>
			</div>

			<!-- Map Container -->
			<div
				class="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden"
			>
				<yandex-map
					v-model="map"
					:settings="{
						location: {
							center: [65.57022, 57.148367],
							zoom: 13,
						},
					}"
					class="w-full h-[500px]"
				>
					<yandex-map-default-scheme-layer />
				</yandex-map>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, shallowRef } from 'vue';

import type { YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';

import { useAPIFetch } from '../lib/composables/useAPIFetch';

import Breadcrumb from '../components/Breadcrumb.vue';
import ViewHeader from '../components/ViewHeader.vue';
import type { StorePublicList } from '../models/store';
import { storePublicList } from '../services/store';
import { ERROR_NOTIF_TIMEOUT } from '../config/constants';

const collectionStore = useAPIFetch(ERROR_NOTIF_TIMEOUT);
const stores = computed(
	() => collectionStore.result.value.data as StorePublicList[],
);
const loading = computed(() => collectionStore.loading.value);
const error = computed(() => collectionStore.error.value);

const map = shallowRef<null | YMap>(null);

const onStoreSelect = (store: StorePublicList) => {
	alert('selected store with ID:' + store.id);
};

const fetchStores = async () => {
	await collectionStore.fetch(storePublicList);
};

onMounted(() => {
	fetchStores();
});
</script>
