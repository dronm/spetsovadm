import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';

import type { ProductPreview } from '../models/product';

export const useLikeStore = defineStore('like', () => {
	const likes = ref<ProductPreview[]>(
		JSON.parse(localStorage.getItem('likes') || '[]'),
	);

	const likedProduct = (id: number) => {
		return likes.value.find((productItem) => productItem.id === id);
	};

	const isLikes = computed(() => likes.value.length > 0);

	const totalLikes = computed(() => {
		if (likes.value.length === 0) return;
		return likes.value.length;
	});

	const handleLikes = (product: ProductPreview) => {
		const likedProductExists = likedProduct(product.id);
		if (likedProductExists) {
			likes.value = likes.value.filter((item) => item.id !== product.id);
		} else {
			likes.value.push(product);
		}
		saveLikesToLS();
	};

	const setLikesFromLS = (products: ProductPreview[]) => {
		if (!products) return;
		products.forEach((product) => {
			if (!likedProduct(product.id)) {
				likes.value.push(product);
			}
		});
		saveLikesToLS();
	};

	const saveLikesToLS = () => {
		localStorage.setItem('likes', JSON.stringify(likes.value));
	};

	onMounted(() => {
		likes.value = JSON.parse(localStorage.getItem('likes') || '[]');
	});

	return {
		likes,
		likedProduct,
		isLikes,
		totalLikes,
		handleLikes,
		setLikesFromLS,
	};
});
