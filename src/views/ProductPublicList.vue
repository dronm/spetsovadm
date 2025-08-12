<template>
	<div v-if="loading">
		<Loader />
	</div>
	<div v-if="error">
		{{ error }}
	</div>
	<ProductPublicListCard
		v-for="prod in products"
		:key="prod.id"
		:product="prod"
	>
	</ProductPublicListCard>
</template>

<script setup lang="ts">
// product public list collection
// this form is never uses. Product list is
// show from catalogue detail form.
import { onMounted, computed } from 'vue';

//lib
import { useAPIFetch } from '../lib/composables/useAPIFetch';

//project
import ProductPublicListCard from '../components/ProductPublicListCard.vue';
import { productPublicList } from '../services/product';
import type { ProductPreview } from '../models/product';
import { ERROR_NOTIF_TIMEOUT } from '../config/constants';

const collectionStore = useAPIFetch(ERROR_NOTIF_TIMEOUT);
const products = computed(
	() => collectionStore.result.value as ProductPreview[],
);
const loading = computed(() => collectionStore.loading.value);
const error = computed(() => collectionStore.error.value);

const fetchProducts = async () => {
	//plus filters
	await collectionStore.fetch(productPublicList);
};

onMounted(() => {
	fetchProducts();
});
</script>
