<template>
	<div class="inline-block">
		<Edit
			id="grid_product_search"
			type="text"
			placeholder="введите строку для поска товара"
			v-model="searchValue"
		>
		</Edit>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import Edit from '@/lib/components/Edit.vue';

const emit = defineEmits(['command']);

const searchValue = ref<string | null>(null);
watch(searchValue, (newVal: string | null) => {
	emit('command', { id: 'search', val: newVal });
});

</script>
