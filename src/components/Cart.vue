<template>
	<div class="p-4 max-h-[400px] overflow-y-auto">
		<!-- Cart Titles -->
		<div class="flex border-b">
			<div
				v-for="(cart, index) in carts"
				:key="cart.id"
				class="flex items-center gap-2 py-2 px-4 text-base font-semibold cursor-pointer transition-colors duration-300"
				:class="
					activeTab === index
						? 'text-blue-600 border-b-2 border-blue-600'
						: 'text-gray-500 hover:text-blue-500'
				"
			>
				<button @click="activeTab = index">{{ cart.name }}</button>

				<!-- Delete Cart Button -->
				<button
					@click.stop="removeCart(index)"
					class="text-red-500 hover:text-red-700 text-xs cursor-pointer"
					:title="t('Cart.removeCartTitle')"
				>
					<font-awesome-icon :icon="['fas', 'trash']" />
				</button>
			</div>

			<button
				variant="btn-cmd"
				class="ml-auto flex items-center gap-1 px-3 py-1 text-sm cursor-pointer text-gray-500 hover:text-blue-500"
				:title="t('Cart.addNewTitle')"
				@click="addNewCart"
			>
				<font-awesome-icon :icon="['fas', 'plus']" />
			</button>
		</div>

		<div class="p-6 border rounded-lg shadow-lg bg-white">
			<div class="mb-4 flex items-center gap-2">
				<input
					v-if="isEditing"
					v-model="editedName"
					@blur="saveCartName"
					@keyup.enter="saveCartName"
					class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
					autofocus
				/>
				<h1
					v-else
					class="text-2xl font-bold text-gray-800 hover:text-blue-500"
					:title="t('Cart.editNameTitle')"
					@dblclick="startEditing"
				>
					{{ carts[activeTab]?.name }}
				</h1>

				<!-- Edit Button -->
				<button
					v-if="!isEditing"
					variant="btn-cmd"
					@click="startEditing"
					class="text-gray-500 hover:text-blue-500 cursor-pointer"
					:title="t('Cart.editNameTitle')"
				>
					<font-awesome-icon :icon="['fas', 'pen']" />
				</button>
			</div>

			<div v-if="carts[activeTab]?.products?.length">
				<div class="overflow-x-auto">
					<table
						class="w-full text-base text-left text-gray-700 border-collapse"
					>
						<thead class="bg-gray-200 text-gray-900">
							<tr>
								<th class="px-6 py-3">
									{{ t('Cart.product') }}
								</th>
								<th class="px-6 py-3">{{ t('Cart.image') }}</th>
								<th class="px-6 py-3">
									{{ t('Cart.quantity') }}
								</th>
								<th class="px-6 py-3">{{ t('Cart.price') }}</th>
								<th class="px-6 py-3">{{ t('Cart.total') }}</th>
								<th class="px-6 py-3"></th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="prod in carts[activeTab].products"
								:key="prod.id"
								class="bg-white border-b hover:bg-gray-50"
							>
								<td class="px-6 py-4 font-medium text-gray-900">
									<router-link
										:to="`/product/${prod.name_lat}`"
										class="hover:text-blue-500"
									>
										{{ prod.name }}
										<template v-if="prod.selected_char">
											, {{ prod.selected_char.char_name }}
										</template>
									</router-link>
								</td>
								<td class="px-6 py-4">
									<img
										v-if="prod.preview_path"
										:src="`${PICT_CDN_PROD_PREVIEW}/${prod.preview_path}`"
										alt="product image"
										class="w-20 h-20 object-cover rounded-md"
									/>
								</td>
								<td class="px-6 py-4">{{ prod.quantity }}</td>
								<td class="px-6 py-4">
									{{ formatPrice(prod.price ?? 0) }}
								</td>
								<td class="px-6 py-4 font-semibold">
									{{
										formatPrice(
											prod.quantity * (prod.price ?? 0),
										)
									}}
								</td>
								<td class="px-6 py-4">
									<button
										@click="removeItem(activeTab, prod)"
										class="text-red-600 hover:text-red-800 text-lg cursor-pointer"
										:title="t('Cart.btnRemoveTitle')"
									>
										🗑️
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div v-else class="text-gray-500 mt-4">
				{{ t('Cart.emptyText') }}
			</div>

			<!-- Total Amount -->
			<div
				class="mt-6 flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md"
			>
				<span class="font-semibold text-lg">
					{{ t('Cart.totalAmount') }}
				</span>

				<span class="font-bold text-2xl">
					{{ formatPrice(cartsStore.totalAmount(activeTab)) }}
				</span>
			</div>
		</div>
	</div>

	<Confirmation
		v-model="confirmation.show"
		:txt="confirmation.text"
		@confirm="confirmation.confirmed"
		@reject="confirmation.rejected"
	>
	</Confirmation>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import Confirmation from '@lib/components/Confirmation.vue';
// import Button from '@lib/components/Button.vue';
import { type FormConfirmation } from '@lib/types/form';

import { useCartsStore, type Cart } from '@/stores/useCartsStore';
import { PICT_CDN_PROD_PREVIEW } from '@/config/constants';
import type { ProductForCart } from '@/models/product';
import { formatPrice } from '@/utils/product';

const confirmation = reactive<FormConfirmation>({
	show: false,
	confirmed: undefined,
	rejected: undefined,
	text: '',
});

const { t } = useI18n();

const cartsStore = useCartsStore();
const activeTab = ref(0);

const carts = computed(() => cartsStore.carts);

const totalAmount = computed(() => cartsStore.totalAmount);

const removeItem = (cartIndex: number, prod: ProductForCart) => {
	cartsStore.removeProductFromCart(cartIndex, prod.id);
};

const isEditing = ref(false);
const editedName = ref('');

const removeCartCont = (cartIndex: number) => {
	cartsStore.carts.splice(cartIndex, 1);
	// If the removed cart was the active one, move selection
	if (activeTab.value >= carts.value.length) {
		activeTab.value = carts.value.length - 1;
	}
};
const removeCart = (cartIndex: number) => {
	if (carts.value.length > 1) {
		//if cart contains products - ask about removing
		if (carts.value[cartIndex].products.length > 0) {
			confirmation.confirmed = function () {
				removeCartCont(cartIndex);
			};
			confirmation.text = t('Cart.removeCartConfirmation');
			confirmation.show = true;
		} else {
			removeCartCont(cartIndex);
		}
	}
};

//switching to edit mode
const startEditing = () => {
	isEditing.value = true;
	editedName.value = carts.value[activeTab.value]?.name;
};

//saving cart name
const saveCartName = () => {
	if (editedName.value.trim()) {
		carts.value[activeTab.value].name = editedName.value.trim();
	}
	isEditing.value = false;
};

//adding a new cart
const addNewCart = () => {
	cartsStore.createCart();
	activeTab.value = carts.value.length - 1;
	startEditing();
};
</script>
