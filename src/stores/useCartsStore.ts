import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import type { ProductForCart } from '@/models/product';

export interface Cart {
	id: string;
	name: string;
	createdAt: Date;
	products: ProductForCart[];
}

export const useCartsStore = defineStore('carts', () => {
	const carts = ref<Cart[]>(
		JSON.parse(localStorage.getItem('carts') || '[]'),
	);

	const saveCarts = () => {
		localStorage.setItem('carts', JSON.stringify(carts.value));
	};

	const createCart = () => {
		const newIndex = carts.value.length + 1;
		const newCart: Cart = {
			id: crypto.randomUUID(),
			name: `Корзина ${newIndex}`,
			createdAt: new Date(),
			products: [],
		};
		carts.value.push(newCart);
		saveCarts();
	};

	const productInCart = (
		id: number,
		charId?: number,
	): ProductForCart | undefined => {
		return carts.value
			.flatMap((cart) => cart.products)
			.find(
				(product) =>
					product.id === id &&
					(charId === undefined ||
						product.selected_char?.char_id === charId),
			);
	};

	const isProductsInCart = computed(() =>
		carts.value.some((cart) => cart.products.length > 0),
	);

	const totalAmount = (cartIndex: number) => {
		return (
			carts.value[cartIndex]?.products.reduce(
				(amount, product) =>
					amount + (product.price ?? 0) * product.quantity,
				0,
			) ?? 0
		);
	};

	//total quantity of producs in all carts
	const totalProductsAddedToCart = computed(() => {
		return carts.value.reduce((totalQuantity, cart) => {
			return (
				totalQuantity +
				cart.products.reduce(
					(cartTotal, product) => cartTotal + product.quantity,
					0,
				)
			);
		}, 0);
	});

	const setProductToCart = (cartIndex: number, product: ProductForCart) => {
		carts.value[cartIndex]?.products.push(product);
		saveCarts();
	};

	const incrementQuantityInFirst = (
		productId: number,
		productCharId?: number,
	) => {
		const cart = carts.value.find((cart) =>
			cart.products.some(
				(p) =>
					p.id === productId &&
					(productCharId === undefined ||
						p.selected_char?.char_id === productCharId),
			),
		);
		if (!cart) return;

		const product = cart.products.find(
			(p) =>
				p.id === productId &&
				(productCharId === undefined ||
					p.selected_char?.char_id === productCharId),
		);
		if (product) product.quantity++;
		saveCarts();
	};

	const incrementQuantity = (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	) => {
		const product = carts.value[cartIndex]?.products.find(
			(p) =>
				p.id === productId &&
				(productCharId === undefined ||
					p.selected_char?.char_id === productCharId),
		);
		if (product) product.quantity++;
		saveCarts();
	};

	const decrementQuantityInFirst = (
		productId: number,
		productCharId?: number,
	) => {
		const cart = carts.value.find((cart) =>
			cart.products.some(
				(p) =>
					p.id === productId &&
					(productCharId === undefined ||
						p.selected_char?.char_id === productCharId),
			),
		);
		if (!cart) return;

		const productIndex = cart.products.findIndex(
			(p) =>
				p.id === productId &&
				(productCharId === undefined ||
					p.selected_char?.char_id === productCharId),
		);
		if (productIndex === -1) return;

		if (cart.products[productIndex].quantity > 1) {
			cart.products[productIndex].quantity--;
		} else {
			cart.products.splice(productIndex, 1);
		}
		saveCarts();
	};

	const decrementQuantity = (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	) => {
		const cart = carts.value[cartIndex];
		if (!cart) return;

		const productIndex = cart.products.findIndex(
			(p) =>
				p.id === productId &&
				(productCharId === undefined ||
					p.selected_char?.char_id === productCharId),
		);
		if (productIndex === -1) return;

		if (cart.products[productIndex].quantity > 1) {
			cart.products[productIndex].quantity--;
		} else {
			cart.products.splice(productIndex, 1);
		}
		saveCarts();
	};

	const removeProductFromCart = (
		cartIndex: number,
		productId: number,
		productCharId?: number,
	) => {
		carts.value[cartIndex].products = carts.value[
			cartIndex
		].products.filter(
			(product) =>
				product.id !== productId ||
				(productCharId !== undefined &&
					product.selected_char?.char_id !== productCharId),
		);
		saveCarts();
	};

	const clearCart = (cartIndex: number) => {
		carts.value[cartIndex].products = [];
		saveCarts();
	};

	const productCartQuantity = (
		productId: number,
		productCharId?: number,
	): number => {
		return carts.value.reduce((total, cart) => {
			return (
				total +
				cart.products
					.filter(
						(p) =>
							p.id === productId &&
							(productCharId === undefined ||
								p.selected_char?.char_id === productCharId),
					)
					.reduce((sum, p) => sum + p.quantity, 0)
			);
		}, 0);
	};

	watch(
		carts,
		() => {
			saveCarts();
		},
		{ deep: true },
	);

	return {
		carts,
		createCart,
		productInCart,
		isProductsInCart,
		totalAmount,
		totalProductsAddedToCart,
		setProductToCart,
		incrementQuantity,
		incrementQuantityInFirst,
		decrementQuantity,
		decrementQuantityInFirst,
		removeProductFromCart,
		clearCart,
		productCartQuantity,
	};
});
