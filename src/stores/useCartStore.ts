import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

import type { ProductForCart } from '@/models/product';

export const useCartStore = defineStore('cart', () => {
	const cart = ref<ProductForCart[]>(
		JSON.parse(localStorage.getItem('cart') || '[]'),
	);

	// Getters
	// Checks whether the given product exists in any of the carts
	const productInCart = (
		id: number,
		charId?: number,
	): ProductForCart | undefined => {
		return cart.value.find(
			(product) =>
				product.id === id &&
				(charId === undefined ||
					product.selected_char?.char_id === charId),
		);
	};

	//true if there is at least one product in any of the carts
	const isProductsInCart = computed(() => cart.value.length > 0);

	//total quantity of producs in all carts
	const totalProductsAddedToCart = computed(() =>
		cart.value.reduce(
			(totalQuantity, product) => totalQuantity + product.quantity,
			0,
		),
	);

	const totalAmount = computed(() => {
		return +cart.value
			.reduce(
				(amount, product) =>
					amount + (product.price ?? 0) * product.quantity,
				0,
			)
			.toFixed(2);
	});

	// Actions
	const setProductToCart = (product: ProductForCart): void => {
		//console.log('Setting product to cart:', product);
		cart.value.push(product);
	};

	const setProductsFromLStoCart = (products: ProductForCart[]): void => {
		if (!products?.length) return;
		cart.value = products;
	};

	const incrementQuantity = (
		productId: number,
		productCharId?: number,
	): void => {
		const product = productInCart(productId, productCharId);
		if (!product) return;
		product.quantity++;
	};

	const decrementQuantity = (
		productId: number,
		productCharId?: number,
	): void => {
		const product = productInCart(productId, productCharId);
		if (!product) return;

		if (product.quantity > 1) {
			product.quantity--;
		} else {
			removeProductFromCart(productId, productCharId);
		}
	};

	const removeProductFromCart = (
		productId: number,
		productCharId?: number,
	): void => {
		cart.value = cart.value.filter(
			(product) =>
				product.id !== productId ||
				(productCharId !== undefined &&
					product.selected_char?.char_id !== productCharId),
		);
	};

	const clearCart = (): void => {
		cart.value = [];
	};

	const productCartQuantity = (
		productId: number,
		productCharId?: number,
	): number => {
		const product = productInCart(productId, productCharId);
		return product ? product.quantity : 0;
	};

	// Watch for changes and save to localStorage
	watch(
		cart,
		() => {
			localStorage.setItem('cart', JSON.stringify(cart.value));
		},
		{ deep: true },
	);

	return {
		cart,
		productInCart,
		isProductsInCart,
		totalProductsAddedToCart,
		totalAmount,
		setProductToCart,
		setProductsFromLStoCart,
		incrementQuantity,
		decrementQuantity,
		removeProductFromCart,
		clearCart,
		productCartQuantity,
	};
});
