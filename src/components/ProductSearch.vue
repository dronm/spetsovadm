<template>
	<!-- product search autocomplete -->
	<Edit
		id="product_search"
		type="text"
		:title="$t('Header.ProductSearch.title')"
		:placeholder="$t('Header.ProductSearch.placeholder')"
		:autocomplete="autocompleteProps"
		v-model="searchValue"
		@keyup.enter="doSearch"
	>
		<template #actions>
			<Button
				variant="btn-info"
				:title="$t('Header.ProductSearch.btnTitle')"
				@click="doSearch"
			>
				<font-awesome-icon :icon="['fas', 'magnifying-glass']" />
			</Button>
		</template>
	</Edit>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from '@/lib/components/Button.vue';
import Edit from '@/lib/components/Edit.vue';
import { type EditAutocomplete } from '@/lib/types/editAutocomplete';

import { productSearchResultCollection } from '@/services/product';
import {
	PICT_CDN_CAT_PREVIEW,
	PICT_CDN_PROD_PREVIEW,
} from '../config/constants';

const autocompleteProps = <EditAutocomplete>{
	apiCall: productSearchResultCollection,
	minLenForQuery: 0,
	descrFields: ['name'],
	resultTableClass: 'product-search-list',
	resultRowClass: 'product-search-item',
	resultRowContClass: 'product-search-item-container',
	formatResultHtml: true,
	formatFunction: (row: any): string => {
		const basePath =
			row.data_type == 'products'
				? PICT_CDN_PROD_PREVIEW
				: PICT_CDN_CAT_PREVIEW;

		let res = '';
		if (row.preview_path && row.preview_path.length) {
			res = `<img class="product-search-item-img" src="${basePath}/${row.preview_path}"></img>`;
		}
		const cat = row.data_type == 'products' ? 'product' : 'product-cat';
		res += `<a href="/${cat}/${row.name_lat}" class="product-search-name">${row.name}</a>`;
		return res;
	},
};

const searchValue = ref('');

const router = useRouter();
const doSearch = () => {
	router.push({
		name: 'searchResult',
		params: { search: searchValue.value },
	});
};
</script>
