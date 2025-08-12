<template>
	<div class="flex w-[280px] flex-col items-start gap-6">
		<!-- product card -->
		<div class="flex w-[280px] flex-col items-start gap-4">
			<!-- slider -->
			<div class="flex flex-col items-center gap-2 self-stretch">
				<div 
					v-if="product?.preview_path?.length"
					class="flex h-[280px] justify-end items-start gap-[74px] self-stretch border border-[color:var(--Gray-300,#D5D7DA)] p-3 rounded-2xl border-solid"
				>
					<router-link 
						:to="prodDetailRef"
					>
						<!--
							class="w-[220.983px] h-[212px] aspect-[123/118] absolute [background:url(<path-to-image>)_lightgray_0px_6.756px_/_99.8%_93.626%_no-repeat] mix-blend-multiply right-[29.017px] bottom-8"
-->
						<img 
							:src="imgSrc" 
							alt="pict" 
						/>
					</router-link>
				</div>

				<ProductPictNoData v-else >
				</ProductPictNoData>
			</div>

			<!-- price && name -->
			<div class="flex flex-col items-start gap-6 self-stretch">
				<div class="flex flex-col items-start gap-2 self-stretch">

					<!-- frame7 -->
					<div class="flex flex-col items-start gap-1 self-stretch">
						<div class="text-[color:var(--Gray-950,#0A0D12)] [font-family:Inter] text-xl font-semibold leading-[30px]">
							{{ productPrice }}
						</div>
					</div>

					<!-- details flex items-center gap-4" -->
					<div 
						class="self-stretch text-[color:var(--Gray-600,#535862)] [font-family:Inter] text-sm font-medium leading-5"
					>
						{{ product.name?.length? product.name :  $t('ProductCardAdmin.noName')}}
					</div>
				</div>
			</div>
		</div>

		<!-- buttons -->
		<div class="flex items-center gap-1 self-stretch">
			<ButtonBase :caption="$t('ProductCardAdmin.btnSave.caption')" @click="emit('save')" />
			<ButtonBase :caption="$t('ProductCardAdmin.btnCancel.caption')" bg="#FFF" color="#097350" border="#D5D7DA" @click="emit('cancel')" />
		</div>
	</div>
</template>

<script setup lang="ts">
//product collection item, product is passed as property
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

// import ButtonLike from '@/components/ButtonLike.vue';
// import ProductToCart from '@/components/ProductToCart.vue';
import type { ProductPreview } from '@/models/product';
import { PICT_CDN_PROD_PREVIEW } from '@/config/constants';
import { formatPrice } from '@/utils/product';
import { useLikeStore } from '@/stores/useLikeStore';
import ButtonBase from "@/components/ButtonBase.vue"
import ProductPictNoData from './ProductPictNoData.vue';

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

const emit = defineEmits<{
	save: [];
	cancel: [];
}>();

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

