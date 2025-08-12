<template>
	<div v-if="categoryLoading" class="catalog-loader">
		<Loader />
	</div>

	<div v-if="!categoryLoading">
		<div v-if="categoryError">
			{{ categoryError }}
		</div>

		<!-- category path  -->
		<nav class="breadcrumb">
			<ul>
				<li v-for="(crumb, index) in breadcrumbs" :key="index">
					<span v-if="crumb.path === route.path">{{
						crumb.label
					}}</span>
					<router-link v-else :to="crumb.path">{{
						crumb.label
					}}</router-link>
					<span v-if="index < breadcrumbs.length - 1"> / </span>
				</li>
			</ul>
		</nav>

		<!-- category name  -->
		<ViewHeader>
			{{ category.name }}
		</ViewHeader>

		<!-- children as cards -->
		<ul
			v-if="category.children && category.children.length"
			class="cat-list"
		>
			<CatPublicListCard
				v-for="child in category.children"
				:key="child.id"
				:category="child"
			>
			</CatPublicListCard>
		</ul>

		<!-- if no children - show group products -->
		<div v-if="!category.is_group" class="flex justify-center">
			<div v-if="prodLoading">
				<Loader />
			</div>
			<div v-if="prodError">
				{{ prodError }}
			</div>

			<ProductPublicListFilter
				:category="category"
				class="w-1/6"
				@apply="onApplyFilters"
			>
			</ProductPublicListFilter>

			<div class="w-5/6">
				<ProductPublicSort
					:fields="collectionSortings"
					:sort-field="collectionSorter"
					@sort-changed="onSortChanged"
				/>

				<!--class="flex flex-col h-full" -->
				<div v-if="products && products.length" class="product-list">
					<ProductPublicListCard
						v-for="prod in products"
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
					:currentPage="0"
					@page-changed="onPageChanged"
				>
				</GridPagination>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
//Product detail card, fetch from strore
import { ref, toRaw, computed, onMounted, watch } from 'vue';
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
import CatPublicListCard from '@/components/CatPublicListCard.vue';
import ProductPublicListCard from '../components/ProductPublicListCard.vue';
import ViewHeader from '../components/ViewHeader.vue';
import ProductPublicSort from '../components/ProductPublicSort.vue';
import ProductPublicListFilter from '../components/ProductPublicListFilter.vue';

import { productCatPublicDetail } from '../services/productCat';
import { productPublicList } from '../services/product';

import type { ProductPreviewRes } from '../services/product';
import type { ProductPreviewFilter } from '../models/product';
import type { ProductCatPublicList } from '../models/productCat';
import { PROD_PUBLIC_COUNT } from '../config/constants';
import { ERROR_NOTIF_TIMEOUT } from '../config/constants';

const route = useRoute();
const { t } = useI18n();

const collectionId = 'ProductPreview'; //this collection ID
const collectionSortings = [
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
	// e.field.isAscending = e.isAscending;
	const newSortField: SortField = {
		name: e.field.name,
		descr: e.field.descr,
		isAscending: e.isAscending,
	};
	collectSortStore.setSorting(collectionId, newSortField);
	fetchProducts();
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
	fetchProducts();
};

const onPageChanged = (currentPage: number) => {
	collectionFromRow.value = (currentPage - 1) * PROD_PUBLIC_COUNT;
	fetchProducts();
};

const productCollection = useAPIFetch(ERROR_NOTIF_TIMEOUT);
const products = computed(
	() => (productCollection.result.value as ProductPreviewRes).data,
);

const collectionTotRows = computed<number>(() => {
	const collectRef = productCollection.result.value as ProductPreviewRes;

	if (collectRef && collectRef.agg) {
		const collect = toRaw(collectRef.agg);
		return collect && collect.tot_count ? collect.tot_count : 0;
	}
	return 0;
});
const prodLoading = computed(() => productCollection.loading.value);
const prodError = computed(() => productCollection.error.value);
const fetchProducts = async () => {
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
	//add search filter if prop is set
	await productCollection.fetch(productPublicList, category.value.id, params);
};

const categoryCollection = useAPIFetch(ERROR_NOTIF_TIMEOUT);
const category = computed(
	() => categoryCollection.result.value as ProductCatPublicList,
);
const categoryLoading = computed(() => categoryCollection.loading.value);
const categoryError = computed(() => categoryCollection.error.value);

const fetchCatDetail = async () => {
	await categoryCollection.fetch(
		productCatPublicDetail,
		route.params.nameLat,
	);

	if (!category.value.is_group) {
		fetchProducts();
	}
};

watch(
	() => route.params.nameLat,
	() => {
		fetchCatDetail();
	},
);

const breadcrumbs = computed(() => {
	const res = [{ label: t('MainLayout.routes.Main.caption'), path: '/' }];
	if (
		category.value &&
		category.value.parents &&
		category.value.parents.length
	) {
		category.value.parents.forEach((cat) => {
			res.push({
				label: cat.name,
				path: `/product-cat/${cat.name_lat}`,
			});
		});
		//add self
		res.push({
			label: category.value.name,
			path: `/product-cat/${category.value.name_lat}`,
		});
	}
	return res;
});

onMounted(() => {
	fetchCatDetail();
});
</script>
