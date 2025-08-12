<template>
	<div
		class="bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto flex flex-col border"
	>
		<div class="flex-grow space-y-4">
			<!-- Product Menu (Code + Like Button) -->
			<div class="flex justify-between items-center">
				<div class="text-sm text-gray-500">
					<p>Code: {{ product.code_1c }}</p>
				</div>
				<div>
					<ButtonLike
						:title="btnLikeTitle"
						:active="isProductLiked"
						@click.prevent="addToLikes"
					/>
				</div>
			</div>

			<!-- Product Image with Link -->
			<router-link :to="prodDetailRef">
				<img :src="imgSrc" alt="pict" class="product-in-list" />
			</router-link>

			<!-- Product Name -->
			<div class="text-center">
				<p class="text-lg font-semibold text-gray-900">
					{{ product.name }}
					<span v-if="product.default_char"
						>, {{ product.default_char.char_name }}
					</span>
				</p>
			</div>
		</div>

		<!-- Availability (if available) -->
		<div
			v-if="product.available"
			class="text-sm text-green-500 text-center"
		>
			<p>{{ t('ProductPublicListCard.availableCaption') }}</p>
		</div>

		<!-- Not Available (if not available) -->
		<div v-else class="text-sm text-red-500 text-center">
			<p>{{ t('ProductPublicListCard.notAvailableCaption') }}</p>
		</div>

		<!-- Product Price (always at the bottom) -->
		<div class="text-center mt-auto">
			<p class="text-lg font-semibold text-red-800">{{ productPrice }}</p>
		</div>

		<!-- Add to Cart Button -->
		<ProductToCart
			v-if="product"
			:product="
				<ProductForCart>{
					...product,
					quantity: 1,
					selected_char: product.default_char,
				}
			"
			:show-cart="true"
			v-model="activeCartMenu"
		/>
	</div>
</template>

<script setup lang="ts">
//product collection item, product is passed as property
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

import ButtonLike from '@/components/ButtonLike.vue';
import ProductToCart from '@/components/ProductToCart.vue';
import type { ProductForCart, ProductPreview } from '@/models/product';
import { PICT_CDN_PROD_PREVIEW } from '@/config/constants';
import { formatPrice } from '@/utils/product';
import { useLikeStore } from '@/stores/useLikeStore';

interface Props {
	product: ProductPreview;
}

const { product } = defineProps<Props>();

const prodDetailRef = computed(() => `/product/${product.name_lat}`);

const imgSrc = computed(() =>
	product && product.preview_path
		? `${PICT_CDN_PROD_PREVIEW}/${product.preview_path}`
		: '#',
);

const productPrice = computed(() =>
	formatPrice(product.price ? product.price : 0),
);

const { t } = useI18n();

const likesStore = useLikeStore();

const isProductLiked = computed(
	() => likesStore.likedProduct(product.id) !== undefined,
);

const btnLikeTitle = ref('');

const addToLikes = () => {
	likesStore.handleLikes(product);
	btnLikeTitle.value = isProductLiked.value
		? t('ProductPublicListCard.formLikesTitle')
		: t('ProductPublicListCard.toLikesTitle');
};

const activeCartMenu = ref<number | null>(null); // Track the currently active product cart menu
const closeCartMenu = (event: MouseEvent) => {
	// Close if clicking outside of the active cart menu
	if (activeCartMenu.value !== null) {
		const dropdown = document.getElementById(
			`cart-menu-${activeCartMenu.value}`,
		);
		if (dropdown && !dropdown.contains(event.target as Node)) {
			activeCartMenu.value = null;
		}
	}
};

onMounted(() => {
	document.addEventListener('mousedown', closeCartMenu);
});

onUnmounted(() => {
	document.removeEventListener('mousedown', closeCartMenu);
});
</script>
