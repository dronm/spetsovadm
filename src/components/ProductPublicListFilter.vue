<template>
	<div class="m-2 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-md">
		<!-- Price Filter -->
		<div class="space-y-4">
			<div>
				<label
					for="min-price"
					class="block text-sm font-medium text-gray-700"
				>
					{{ t('ProductPublicListFilter.minPrice') }}:
				</label>
				<input
					type="number"
					id="min-price"
					v-model="filters.min_price"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					:placeholder="
						t('ProductPublicListFilter.minPricePlaceholder')
					"
				/>
			</div>

			<div>
				<label
					for="max-price"
					class="block text-sm font-medium text-gray-700"
				>
					{{ t('ProductPublicListFilter.maxPrice') }}:
				</label>
				<input
					type="number"
					id="max-price"
					v-model="filters.max_price"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					:placeholder="
						t('ProductPublicListFilter.maxPricePlaceholder')
					"
				/>
			</div>
		</div>

		<!-- Other Filters -->
		<ul class="space-y-4 mt-6">
			<li
				v-if="category.brand_values && category.brand_values.length > 1"
			>
				<label
					for="brand-filter"
					class="block text-sm font-medium text-gray-700"
				>
					{{ t('ProductPublicListFilter.brandFilterTitle') }}:
				</label>
				<select
					name="brand"
					id="brand-filter"
					v-model="filters.brand_id"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				>
					<option value="undefined">
						{{ $t('ProductPublicListFilter.selectNoValue') }}
					</option>
					<option
						v-for="br in category.brand_values"
						:key="br.id"
						:value="br.id"
					>
						{{ br.name }}
					</option>
				</select>
			</li>

			<li
				v-if="
					category.country_values &&
					category.country_values.length > 1
				"
			>
				<label
					for="country-filter"
					class="block text-sm font-medium text-gray-700"
				>
					{{ t('ProductPublicListFilter.countryFilterTitle') }}:
				</label>
				<select
					name="country"
					id="country-filter"
					v-model="filters.country_id"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				>
					<option value="undefined">
						{{ $t('ProductPublicListFilter.selectNoValue') }}
					</option>
					<option
						v-for="ct in category.country_values"
						:key="ct.id"
						:value="ct.id"
					>
						{{ ct.name }}
					</option>
				</select>
			</li>

			<li v-for="attr in category.filter_attrs" :key="attr.ref_1c">
				<label
					:for="attr.ref_1c"
					class="block text-sm font-medium text-gray-700"
				>
					{{ attr.name }}:
				</label>
				<select
					:id="attr.ref_1c"
					:modelValue="
						filters.product_attr_vals
							? filters.product_attr_vals[attr.ref_1c]
							: ''
					"
					@update:modelValue="
						(val: string) => {
							if (!filters.product_attr_vals) {
								filters.product_attr_vals = {};
							}
							filters.product_attr_vals[attr.ref_1c] = val;
						}
					"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				>
					<option value="undefined">
						{{ $t('ProductPublicListFilter.selectNoValue') }}
					</option>
					<option
						v-for="val in attr.values"
						:key="val.ref_1c"
						:value="val.ref_1c"
					>
						{{ val.name }}
					</option>
				</select>
			</li>
		</ul>

		<!-- Apply Button -->
		<div class="mt-6">
			<Button
				:title="$t('ProductPublicListFilter.submitTitle')"
				@click.prevent="applyFilters"
				class="px-4 py-2 btn btn-info"
			>
				{{ t('ProductPublicListFilter.submitCaption') }}
			</Button>
		</div>

		<!-- Reset Button -->
		<div class="mt-6">
			<Button
				:title="$t('ProductPublicListFilter.resetTitle')"
				@click.prevent="resetFilters"
				class="px-4 py-2 btn btn-info"
			>
				{{ t('ProductPublicListFilter.resetCaption') }}
			</Button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Button from '@/lib/components/Button.vue';

import { type ProductCatPublicList } from '@/models/productCat';
import { type ProductPreviewFilter } from '@/models/product';

const emit = defineEmits(['apply']);

interface Props {
	category: ProductCatPublicList;
}

const { category } = defineProps<Props>();
//console.log("category:",category)

const { t } = useI18n();

const filters = ref<ProductPreviewFilter>({
	min_price: undefined,
	max_price: undefined,
	brand_id: undefined,
	country_id: undefined,
	product_attr_vals: {} as Record<string, string>,
});

const applyFilters = () => {
	emit('apply', filters.value);
};

const resetFilters = () => {
	filters.value = {
		min_price: undefined,
		max_price: undefined,
		brand_id: undefined,
		country_id: undefined,
		product_attr_vals: {} as Record<string, string>,
	};
	emit('apply', filters.value);
};
</script>
