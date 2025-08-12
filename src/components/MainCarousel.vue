<template>
	<Carousel v-if="carousel && !loading" v-bind="carousel.options">
		<Slide v-for="(slide, index) in carousel.pictures" :key="slide.id">
			<img :src="pictureSrc(slide)" :alt="`image-${index + 1}`" />
		</Slide>
		<template #addons>
			<navigation />
		</template>
	</Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { computed, onMounted } from 'vue';

import { useAPIFetch } from '@/lib/composables/useAPIFetch';

import { PICT_CDN_HTMLSLIDERS } from '@/config/constants';
import { htmlSliderPublic } from '@/services/htmlSlider';
import type { PictureM } from '@/models/picture.ts';
import type { HtmlSlider } from '@/models/htmlSlider';
import { ERROR_NOTIF_TIMEOUT } from '@/config/constants';

const collectionStore = useAPIFetch(ERROR_NOTIF_TIMEOUT);
const carousel = computed(() => collectionStore.result.value as HtmlSlider);
const loading = computed(() => collectionStore.loading.value);
// const error = computed(() => collectionStore.error.value);

const slider_name = 'main_carousel';

const fetchStores = async () => {
	await collectionStore.fetch(htmlSliderPublic, 'main_carousel');
};

const pictureSrc = (slide: PictureM) => {
	return `${PICT_CDN_HTMLSLIDERS}/${slider_name}/${slide.id}.${slide.ext}`;
};

onMounted(() => {
	fetchStores();
});
</script>
