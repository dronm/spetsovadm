<template>
	<button
		id="shopping-cart"
		:quantity="quantity"
		:title="$t('Header.HeadMenu.Cart.title')"
		:class="['btn-badge']"
		@click="showCart = true"
	>
		<font-awesome-icon :icon="['fas', 'cart-plus']" />

		<div class="btn-badge-count" v-if="quantity">{{ quantity }}</div>
	</button>

	<Teleport to="body">
		<modal
			:show="showCart"
			dialogWidth="80%"
			borderRadius="5px"
			@close="showCart = false"
		>
			<template #body>
				<Cart />
			</template>
		</modal>
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Modal from '@lib/components/Modal.vue';

import Cart from './Cart.vue';

const { t } = useI18n();

const showCart = ref(false);

interface Props {
	quantity?: number;
}

const { quantity } = defineProps<Props>();
</script>
