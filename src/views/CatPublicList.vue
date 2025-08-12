<template>
	<ul class="cat-list">
		<CatPublicListCard v-for="cat in cats" :key="cat?.id" :category="cat">
		</CatPublicListCard>
	</ul>
</template>

<script setup lang="ts">
//product public list collection
import { computed, onMounted } from 'vue';

//lib
import { useAPIFetch } from '../lib/composables/useAPIFetch';

//project
import CatPublicListCard from '../components/CatPublicListCard.vue';
import { productCatPublicList } from '../services/productCat';
import type { ProductCatPublicList } from '../models/productCat';
import { ERROR_NOTIF_TIMEOUT } from '@/config/constants';

const collectionStore = useAPIFetch(ERROR_NOTIF_TIMEOUT);
const cats = computed(
	() => collectionStore.result.value as ProductCatPublicList[],
);
// const loading = computed(
// 	() => collectionStore.loading.value
// );
// const error = computed(
// 	() => collectionStore.error.value
// );

const fetchCats = async () => {
	//plus filters
	await collectionStore.fetch(productCatPublicList);
};

onMounted(() => {
	fetchCats();
});
</script>
