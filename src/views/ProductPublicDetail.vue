<template>
	<div v-if="product" class="bg-white shadow-md rounded-lg p-6">
		<div class="mb-4 text-sm text-gray-500">
			<span>Artikul:</span>
			<span class="font-medium">{{ product.artikul }}</span>
		</div>

		<!-- Flex container for carousel and product details -->
		<div class="flex flex-col md:flex-row gap-6">
			<!-- Carousel Section -->
			<div class="flex-shrink-0 w-full md:w-1/2">
				<Carousel v-bind="carouselOptions">
					<Slide
						v-for="(slide, index) in product.pictures"
						:key="slide.ref_1c"
					>
						<img
							:src="pictureSrc(slide)"
							:alt="`image-${index + 1}`"
							class="w-full h-auto"
						/>
					</Slide>
					<template #addons>
						<Navigation />
					</template>
				</Carousel>
			</div>

			<!-- Product Details Section -->
			<div class="flex-1 space-y-4">
				<div
					v-if="!product.available"
					class="text-red-600 font-semibold"
				>
					{{ t('ProductPublicDetail.notAvailable') }}
				</div>

				<div
					v-else-if="
						product.char_details && product.char_details.length
					"
				>
					<div class="mb-4">
						<ProductCharSwitcher
							:chars="product.char_details"
							:defaultCharId="product.default_char_id"
							@select-char="onSelectChar"
						/>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<p class="text-lg font-bold text-gray-800">
						{{ formatPrice(price) }}
					</p>
					<div class="flex items-center space-x-4">
						<ButtonLike
							:title="btnLikeTitle"
							:active="isProductLiked"
							@click.prevent="addToLikes"
						/>
						<ProductToCart
							v-if="product.available"
							:product="
								<ProductForCart>{
									...productDetailToPreview(),
									quantity: 1,
									selected_char: extractProductChar(),
								}
							"
							:show-cart="true"
						/>
					</div>
				</div>

				<!-- Product Details Table -->
				<div class="overflow-x-auto">
					<table
						class="table-auto w-full border-collapse border border-gray-300"
					>
						<tbody>
							<tr class="border-b border-gray-200">
								<td class="p-2 text-gray-600">Name:</td>
								<td class="p-2 font-medium text-gray-800">
									{{ product.name_full }}
								</td>
							</tr>
							<tr class="border-b border-gray-200">
								<td class="p-2 text-gray-600">Brand:</td>
								<td class="p-2 font-medium text-gray-800">
									{{ product.brand }}
								</td>
							</tr>
							<tr class="border-b border-gray-200">
								<td class="p-2 text-gray-600">Producer:</td>
								<td class="p-2 font-medium text-gray-800">
									{{ product.producer }}
								</td>
							</tr>
							<tr class="border-b border-gray-200">
								<td class="p-2 text-gray-600">Country:</td>
								<td class="p-2 font-medium text-gray-800">
									{{ product.country }}
								</td>
							</tr>
							<tr class="border-b border-gray-200">
								<td class="p-2 text-gray-600">Description:</td>
								<td class="p-2 font-medium text-gray-800">
									{{ product.description }}
								</td>
							</tr>
							<template v-for="attr in product.product_attr_vals">
								<tr
									class="border-b border-gray-200"
									:title="attr.comment_text"
								>
									<td class="p-2 text-gray-600">
										{{ attr.title }}:
									</td>
									<td class="p-2 font-medium text-gray-800">
										{{ attr.value }}
									</td>
								</tr>
							</template>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
//Product detail card, fetch from strore
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

//lib
import { useAPIFetch } from '../lib/composables/useAPIFetch';

import { productPublicDetail } from '../services/product';
import type { ProductForCart, ProductPublicDetail } from '../models/product';
import { PICT_CDN_PROD_DETAIL } from '../config/constants';
import { formatPrice } from '../utils/product';
import { useLikeStore } from '../stores/useLikeStore';
import type { ProductCharDetail, ProductPreview } from '../models/product';
import type { Picture } from '../models/picture';
import type { HtmlSliderOptions } from '../models/htmlSlider';

import ProductCharSwitcher from '../components/ProductCharSwitcher.vue';
import ButtonLike from '../components/ButtonLike.vue';
import ProductToCart from '../components/ProductToCart.vue';
import { ERROR_NOTIF_TIMEOUT } from '../config/constants';

// interface Props {
// 	nameLat: string;
// }
// const { nameLat } = defineProps<Props>();

const collectionStore = useAPIFetch(ERROR_NOTIF_TIMEOUT);
const product = computed(
	() => collectionStore.result.value as ProductPublicDetail,
);
// const loading = computed(
// 	() => collectionStore.loading.value
// );
// const error = computed(
// 	() => collectionStore.error.value
// );

const likesStore = useLikeStore();

const selectedChar = ref<ProductCharDetail | undefined>(undefined);
const price = ref(0);
const totalQuantity = ref(0); //total product quantity available for sale.

const onSelectChar = (char: ProductCharDetail) => {
	selectedChar.value = char;
	price.value = char.price;
};

const route = useRoute();
const { t } = useI18n();

// const isProductInCart = computed(() => product.value?
// 	cartStore.productInCart(product.value.id) !== undefined : false);

const isProductLiked = computed(() =>
	product.value
		? likesStore.likedProduct(product.value.id) !== undefined
		: false,
);

const btnLikeTitle = computed(() =>
	isProductLiked.value
		? t('ProductPublicListCard.formLikesTitle')
		: t('ProductPublicListCard.toLikesTitle'),
);

const fetchProductDetail = async () => {
	await collectionStore.fetch(productPublicDetail, route.params.nameLat);
	let totQ = 0;
	if (product.value.char_details) {
		product.value.char_details.forEach((c: ProductCharDetail) => {
			totQ += c.quant;
			if (c.char_id == product.value.default_char_id) {
				onSelectChar(c);
			}
		});
	} else {
		//default price
		price.value = product.value.price ?? 0;
	}
	// console.log("totalQuantity=", totQ, "charDetails:", product.value.char_details)
	totalQuantity.value = totQ;
};

const addToLikes = () => {
	//ProductDetail to ProductLike
	likesStore.handleLikes(productDetailToPreview());
};

const carouselOptions: HtmlSliderOptions = {
	enabled: true,
	itemsToShow: 1,
	itemsToScroll: 1,
	mouseDrag: true,
	mouseTouch: true,
	wrapAround: true,
	snapAlign: 'center',
	transition: 0,
	touchDrag: false,
	autoplay: 0,
	pauseAutoplayOnHover: false,
	breakpointMode: 'viewport',
	breakpoints: null,
	modelValue: 0,
	dir: 'ltr',
	gap: 0,
	height: '300px',
	ignoreAnimations: false,
	i18n: {
		iconArrowLeft: t('ProductPublicDetail.imgSlider.next'),
		iconArrowRight: t('ProductPublicDetail.imgSlider.previous'),
	},
};

const pictureSrc = (slide: Picture) => {
	return `${PICT_CDN_PROD_DETAIL}/${slide.ref_1c}.${slide.ext}`;
};

const breadcrumbs = ref<Breadcrumb[] | null>(null);

interface Breadcrumb {
	label: string;
	path: string;
}

watch(product, (newProduct: ProductPublicDetail) => {
	//image slider
	// imgSrc.value =
	// 	newProduct && newProduct.picture_preview
	// 		? `${PICT_CDN_PROD_DETAIL}/${newProduct.picture_path}`
	// 		: "#";

	//breadcrumbs
	const res: Breadcrumb[] = [
		{ label: t('MainLayout.routes.Main.caption'), path: '/' },
	];

	if (newProduct.product_cat_path && newProduct.product_cat_path.length) {
		newProduct.product_cat_path.forEach((cat) => {
			res.push({
				label: cat.name,
				path: `/product-cat/${cat.name_lat}`,
			});
		});
	}
	//add self
	res.push({
		label: newProduct.name,
		path: `/product/${newProduct.name_lat}`,
	});
	breadcrumbs.value = res;
});

const productDetailToPreview = (): ProductPreview => {
	return <ProductPreview>{
		id: product.value.id,
		name: product.value.name,
		code_1c: product.value.code_1c,
		name_lat: product.value.name_lat,
		preview_path: product.value.preview_path,
		quant: product.value.quant,
		price: price.value,
		available: true,
	};
};

const extractProductChar = (): ProductCharDetail | undefined => {
	return selectedChar.value;
};

onMounted(() => {
	fetchProductDetail();
});
</script>
