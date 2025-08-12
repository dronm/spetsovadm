<template>
	<ViewHeader>
		{{ $t('PopCat.header') }}
	</ViewHeader>

	<div v-if="loading">
		{{ $t('Notifications.loading') }}
	</div>
	<div v-if="error">
		{{ error }}
	</div>

	<div class="carousel-cont">
		<Carousel v-bind="config" v-if="categories && categories.length">
			<Slide
				v-for="(cat, index) in categories"
				:key="index"
				:title="cat.name"
				@click="showCategoryDetail(cat)"
			>
				<img
					:src="imageSource(cat)"
					:alt="`image-${index + 1}`"
					class="popcat-img"
				/>
			</Slide>
			<template #addons>
				<navigation />
			</template>
		</Carousel>
	</div>
</template>

<script setup lang="ts">
//most popular categories
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { useI18n } from 'vue-i18n';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useAPIFetch } from '@/lib/composables/useAPIFetch';

import ViewHeader from '@/components/ViewHeader.vue';
import { PICT_CDN_CAT_PREVIEW } from '@/config/constants';
import { productCatPopList } from '@/services/productCat';
import type { ProductCatPublicList } from '@/models/productCat';
import { ERROR_NOTIF_TIMEOUT } from '@/config/constants';

const { t } = useI18n();

const router = useRouter();

const config = {
	itemsToShow: 5,
	wrapAround: false,
	mouseDrag: false,
	touchDrag: false,
	i18n: {
		iconArrowLeft: t('MainCarousel.iconArrowLeft'),
		iconArrowRight: t('MainCarousel.iconArrowRight'),
	},
};
const collectionStore = useAPIFetch(ERROR_NOTIF_TIMEOUT);

//<CatPublic[]>
const categories = computed(() => collectionStore.result.value);
const loading = computed(() => collectionStore.loading.value);
const error = computed(() => collectionStore.error.value);

const fetchCats = async () => {
	//plus filters
	await collectionStore.fetch(productCatPopList);
};

const showCategoryDetail = (cat: ProductCatPublicList) => {
	router.push(`/product-cat/${cat.name_lat}`);
};

const imageSource = (cat: ProductCatPublicList) => {
	return cat && cat.picture_path
		? `${PICT_CDN_CAT_PREVIEW}/${cat.picture_path}`
		: '#';
};

onMounted(() => {
	fetchCats();
});
</script>
