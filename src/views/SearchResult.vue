<template>
	<div class="text-2xl">
		{{ t('SearchResult.resultText') }}
		<strong>"{{ collectionSearch }}"</strong>,
		{{ t('SearchResult.resultProductCntText') }}: {{ collectionTotRows }}
	</div>

	<div v-if="prodLoading">
		<Loader />
	</div>

	<div v-if="prodError">
		{{ prodError }}
	</div>

	<div v-if="collectionCategories?.length">
		<div class="text-2xl font-semibold">
			{{ t('SearchResult.catTitle') }}
		</div>

		<ul class="cat-list">
			<CatPublicListCard
				v-for="cat in collectionCategories"
				:key="cat?.id"
				:category="cat"
			>
			</CatPublicListCard>
		</ul>
	</div>

	<div v-if="collectionProducts?.length">
		<div class="text-2xl font-semibold">
			{{ t('SearchResult.productTitle') }}
		</div>

		<div class="flex justify-center">
			<!--
			<ProductPublicListFilter
				:category="category"
				class="w-1/6"
				@apply="onApplyFilters"
			>
			</ProductPublicListFilter>
			-->

			<div class="w-5/6">
				<ProductPublicSort
					:fields="collectionSortings"
					:sort-field="collectionSorter"
					@sort-changed="onSortChanged"
				/>

				<!--class="flex flex-col h-full" -->
				<div class="product-list">
					<ProductPublicListCard
						v-for="prod in collectionProducts"
						:key="prod.id"
						:product="prod"
					>
					</ProductPublicListCard>
				</div>

				<!-- pagination -->
				<GridPagination
					:totalRows="collectionTotRows"
					:showPages="5"
					:rowsPerPage="collectionRowsPerPage"
					@page-changed="onPageChanged"
				>
				</GridPagination>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
//Product detail card, fetch from strore
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

//library
import Loader from '@/lib/components/Loader.vue';
import GridPagination from '@/lib/components/GridPagination.vue';
import { useAPIFetch } from '@/lib/composables/useAPIFetch';

import {
	SortDirect,
	FilterJoinParam,
	FilterOperatorParam,
	type SortChangeEvent,
	type CollectionParams,
	type SortField,
	type CollectionFilter,
} from '../lib/types/collection';
import { useCollectionSortStore } from '@/lib/stores/useCollectionSortStore';

//project components
import ProductPublicListCard from '../components/ProductPublicListCard.vue';
import ProductPublicSort from '../components/ProductPublicSort.vue';
import CatPublicListCard from '../components/CatPublicListCard.vue';

import { productCatSearch } from '../services/product';

import type { ProductCatSearchRes } from '../services/product';
import type { ProductPreviewFilter, ProductPreview } from '../models/product';
import { PROD_PUBLIC_COUNT } from '../config/constants';
import { ERROR_NOTIF_TIMEOUT } from '../config/constants';
import type { ProductCatPublicList } from '@/models/productCat';

const route = useRoute();
const { t } = useI18n();

//*********************
const collectionId = 'ProductSearch'; //this collection ID
const collectionSortings = [
	{ name: 'weight', descr: 'Реливантность', isAscending: false },
	{ name: 'popularity', descr: 'Популярность', isAscending: false },
	{ name: 'price', descr: 'Цена', isAscending: false },
]; //all possible sortings
const collectionFromRow = ref<number>(0);
const collectionRowsPerPage = ref<number>(PROD_PUBLIC_COUNT);

const collectSortStore = useCollectionSortStore();
const collectionSorter = computed<SortField>(() => {
	const s = collectSortStore.getSorting(collectionId, collectionSortings[0]);
	return s;
});

const onSortChanged = (e: SortChangeEvent) => {
	const newSortField: SortField = {
		name: e.field.name,
		descr: e.field.descr,
		isAscending: e.isAscending,
	};
	collectSortStore.setSorting(collectionId, newSortField);
	fetchAll();
};

const collectionFilter = ref<CollectionFilter[]>([]);
const onApplyFilters = (f: ProductPreviewFilter) => {
	collectionFilter.value = [];
	if (
		f.brand_id != undefined &&
		!isNaN(f.brand_id) &&
		typeof f.brand_id === 'number'
	) {
		collectionFilter.value.push({
			j: FilterJoinParam.AND,
			f: { brand_id: { v: f.brand_id, o: FilterOperatorParam.E } },
		});
	}
	if (
		f.country_id != undefined &&
		!isNaN(f.country_id) &&
		typeof f.country_id === 'number'
	) {
		collectionFilter.value.push({
			j: FilterJoinParam.AND,
			f: { country_id: { v: f.country_id, o: FilterOperatorParam.E } },
		});
	}
	if (
		f.min_price != undefined &&
		!isNaN(f.min_price) &&
		typeof f.min_price === 'number'
	) {
		collectionFilter.value.push({
			j: FilterJoinParam.AND,
			f: { price: { v: f.min_price, o: FilterOperatorParam.GE } },
		});
	}
	if (
		f.max_price != undefined &&
		!isNaN(f.max_price) &&
		typeof f.max_price === 'number'
	) {
		collectionFilter.value.push({
			j: FilterJoinParam.AND,
			f: { price: { v: f.max_price, o: FilterOperatorParam.LE } },
		});
	}

	if (f.product_attr_vals) {
		let attrFilter: string[] = [];
		Object.keys(f.product_attr_vals).forEach((attrId: string) => {
			if (
				f.product_attr_vals?.[attrId] &&
				f.product_attr_vals[attrId].length
			) {
				attrFilter.push(attrId + '=' + f.product_attr_vals[attrId]);
			}
		});
		// for (let attrId: string in f.product_attr_vals) {
		// 	if(f.product_attr_vals[attrId] && f.product_attr_vals[attrId].length){
		// 		attrFilter.push(attrId+"="+f.product_attr_vals[attrId]);
		// 	}
		// }
		if (attrFilter.length) {
			const setFilters = attrFilter.filter((v: string) => {
				const pair = v.split('=');
				return pair.length == 2 && pair[1].trim() !== 'undefined';
			});
			if (setFilters.length) {
				// console.log("sending filter to server:",setFilters)
				collectionFilter.value.push({
					j: FilterJoinParam.AND,
					f: {
						attr_filter: {
							v: setFilters,
							o: FilterOperatorParam.CONTAINS,
						},
					},
				});
			}
		}
	}
	fetchAll();
};

const onPageChanged = (currentPage: number) => {
	collectionFromRow.value = (currentPage - 1) * PROD_PUBLIC_COUNT;
	fetchAll();
};

const productCollection = useAPIFetch(ERROR_NOTIF_TIMEOUT);
// const products = computed(
// 	() => (productCollection.result.value as ProductPreviewRes).data,
// );

const collectionTotRows = ref(0);
const collectionSearch = ref('');
const collectionProducts = ref<ProductPreview[] | null>(null);
const collectionCategories = ref<ProductCatPublicList[] | null>(null);
// const collectionTotRows = computed<number>(() => {
// 	const collectRef = productCollection.result.value as ProductPreviewRes;
//
// 	if (collectRef && collectRef.agg) {
// 		const collect = toRaw(collectRef.agg);
// 		return collect && collect.tot_count ? collect.tot_count : 0;
// 	}
// 	return 0;
// });
const prodLoading = computed(() => productCollection.loading.value);
const prodError = computed(() => productCollection.error.value);
const fetchAll = async () => {
	//add search filter
	if (!search.value || !search.value.length) {
		return;
	}

	// +filters, sortings
	const params: CollectionParams = {
		from: collectionFromRow.value,
		count: PROD_PUBLIC_COUNT,
		sorter: [
			{
				f: collectionSorter.value.name,
				d: collectionSorter.value.isAscending
					? SortDirect.ASC
					: SortDirect.DESC,
			},
		],
		filter: collectionFilter.value,
	};
	// filter: [ ...collectionFilter.value,
	// 	<CollectionFilter>{
	// 		f: {"search_column": {
	// 			o: FilterOperatorParam.TS,
	// 			v: search.value
	// 		}}
	// 	}
	// ],
	await productCollection.fetch(productCatSearch, search.value, params);

	const queryRes = productCollection.result.value as ProductCatSearchRes;
	collectionTotRows.value = queryRes.products.agg.tot_count;
	collectionSearch.value = queryRes.search;
	collectionProducts.value = queryRes.products.data;
	collectionCategories.value = queryRes.categories.data;
};

const search = computed(() => route.params.search);
watch(
	() => route.params.search,
	() => {
		fetchAll();
	},
);

onMounted(() => {
	fetchAll();
});
</script>
