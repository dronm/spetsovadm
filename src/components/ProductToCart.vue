<template>
	<div
		v-if="!cartsStore.productInCart(product.id) && product.available"
		class="relative flex items-center justify-center"
	>
		<!-- Button to trigger popover -->
		<Button
			:title="t('ProductPublicListCard.submitTitle')"
			@click.prevent="addToCart"
		>
			{{ $t('ProductPublicListCard.submitCaption') }}
		</Button>

		<!-- Popover dropdown positioned below the button -->
		<div
			:id="`cart-menu-${product.id}`"
			v-if="activeCartMenu === product.id"
			class="absolute left-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 p-4"
		>
			<!-- Header with close button -->
			<div class="flex justify-between items-center mb-2">
				<h2 class="text-sm font-semibold">
					{{ t('Cart.selectCart') }}
				</h2>
				<button
					@click="activeCartMenu = null"
					class="text-gray-500 hover:text-black text-lg cursor-pointer"
				>
					&times;
				</button>
			</div>

			<!-- Cart selection list -->
			<ul>
				<li
					v-for="(cart, index) in cartsStore.carts"
					:key="cart.id"
					class="mb-2"
				>
					<button
						@click="selectCart(index)"
						class="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded cursor-pointer"
					>
						{{ cart.name }}
					</button>
				</li>
			</ul>
		</div>
	</div>

	<!-- already in cart -->
	<div
		v-else-if="cartsStore.productInCart(product.id) && product.available"
		class="flex items-center justify-center"
	>
		<ProductQuantity
			:quantity="
				cartsStore.productCartQuantity(
					product.id,
					product.selected_char?.char_id,
				)
			"
			:totalQuantity="product.quant"
			@increment="onProductIncrement()"
			@decrement="onProductDecrement()"
		/>

		<ButtonCart v-if="showCart"> </ButtonCart>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Button from '@/lib/components/Button.vue';
import ProductQuantity from '@/components/ProductQuantity.vue';
import ButtonCart from '@/components/ButtonCart.vue';
import type { ProductForCart } from '@/models/product';
import { useCartsStore } from '@/stores/useCartsStore';

interface Props {
	product: ProductForCart;
	showCart: boolean; //to show open cart button, not shown in product dialog
}
const { product, showCart } = defineProps<Props>();

const activeCartMenu = defineModel(); //to close dropdown selection from mouse click

const { t } = useI18n();
const cartsStore = useCartsStore();

const addToCart = () => {
	if (cartsStore.carts.length === 0) {
		cartsStore.createCart();
	}

	if (cartsStore.carts.length === 1) {
		cartsStore.setProductToCart(0, product);
		activeCartMenu.value = null;
	} else {
		activeCartMenu.value = product.id;
	}
};

const selectCart = (index: number) => {
	cartsStore.setProductToCart(index, product);
	activeCartMenu.value = null;
};

const onProductIncrement = () => {
	cartsStore.incrementQuantityInFirst(
		product.id,
		product.selected_char?.char_id,
	);
};

const onProductDecrement = () => {
	cartsStore.decrementQuantityInFirst(
		product.id,
		product.selected_char?.char_id,
	);
};
</script>
