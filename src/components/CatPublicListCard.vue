<template>
	<router-link
		:to="catDetailRef"
		class="card bg-white border rounded-lg p-4"
		:title="category.description"
	>
		<div class="p-3">
			<p>
				{{ category.name }}
			</p>

			<img :src="imgSrc" alt="pict" class="w-16" />
		</div>
	</router-link>
</template>

<script setup lang="ts">
//category collection item, category passed as property
import { useRouter } from 'vue-router';

import type { ProductCatPublicList } from '@/models/productCat';
import { PICT_CDN_CAT_PREVIEW } from '@/config/constants';

const router = useRouter();

interface Props {
	category: ProductCatPublicList;
}

const { category } = defineProps<Props>();

const imgSrc =
	category && category.picture_path
		? `${PICT_CDN_CAT_PREVIEW}/${category.picture_path}`
		: '#';

const catDetailRef = `/product-cat/${category.name_lat}`;
</script>
