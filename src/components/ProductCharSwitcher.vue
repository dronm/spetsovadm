<template>
	<ul class="flex gap-2">
		<li
			v-for="char in chars"
			:key="char.char_id"
			:class="[
				'prod-char px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2',
				char.char_id === selectedCharId
					? 'bg-green-500 text-white hover:bg-green-600'
					: 'bg-slate-200 hover:bg-slate-300',
			]"
			@click="onSelectChar(char)"
		>
			<span class="font-medium">{{ char.char_name }}</span>
			<!--
			<span class="text-lg font-semibold text-red-800">{{
				formatPrice(char.price)
			}}</span>
-->
		</li>
	</ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { type ProductCharDetail } from '@/models/product';

interface Props {
	chars: ProductCharDetail[];
	defaultCharId: number | undefined;
}
const { chars, defaultCharId } = defineProps<Props>();

const emit = defineEmits(['selectChar']);

const selectedCharId = ref(defaultCharId);

const onSelectChar = (char: ProductCharDetail) => {
	selectedCharId.value = char.char_id;
	emit('selectChar', char);
};
</script>
