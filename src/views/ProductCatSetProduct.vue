//----- template -----
<template>
	<div class="adm-view-content">
		<div class="flex">
			<!--w-1/4 bg-white p-4 shadow rounded -->
			<div class="flex w-[264px] h-screen flex-col items-start gap-2.5 shrink-0 border-r-[color:var(--gray-200)] px-4 py-6 border-r-2 border-solid">
				<ProductCatHierarchy returnCollectionName="productCatSetProduct" />
			</div>

			<!-- w-3/4 bg-white p-4 shadow rounded ml-4 -->
			<div class="">
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

import ProductCatHierarchy from '@/views/ProductCatHierarchy.vue';
import ProductList from '@/views/ProductList.vue';

</script>
