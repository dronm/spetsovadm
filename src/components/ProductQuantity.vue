<template>
	<div class="p-2">
		<Button @click="emit('decrement')">
			<font-awesome-icon :icon="['fas', 'minus']" />
		</Button>

		<span class="p-2">{{ quantity }}</span>

		<Button :disabled="isIncBtnDisabled" @click="emit('increment')">
			<font-awesome-icon :icon="['fas', 'plus']" />
		</Button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import Button from '@/lib/components/Button.vue';

const emit = defineEmits(['increment', 'decrement']);

interface Props {
	quantity?: number;
	totalQuantity?: number;
}

const { quantity = 1, totalQuantity = 0 } = defineProps<Props>();

// const isDecBtnDisabled = computed(() => quantity <= 1);
const isIncBtnDisabled = computed(
	() => totalQuantity != undefined && totalQuantity <= quantity,
);
</script>
