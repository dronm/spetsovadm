//----- template -----
<template>
	<div class="adm-view-content">
		<div class="list-title"> 
			{{$t('ProductCatSetProduct.title')}}
		</div>

		<div class="flex">
			<div class="w-1/4 bg-white p-4 shadow rounded">
				<ProductCatHierarchy returnCollectionName="productCatSetProduct" />
			</div>

			<div class="w-3/4 bg-white p-4 shadow rounded ml-4">
				<ProductList
					returnCollectionName="productCatSetProduct"
					:draggable="true"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
//ProductCatList collection component
import { useI18n } from 'vue-i18n';

import ProductCatHierarchy from '@/views/ProductCatHierarchy.vue';
import ProductList from '@/views/ProductList.vue';

const { t } = useI18n();
</script>
