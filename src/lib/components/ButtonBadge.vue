<template>
	<button :class="['button-badge', quantity && 'activeIcon']">
		<slot></slot>

		<div class="button-badge__count" v-if="quantity">{{ quantity }}</div>
	</button>
</template>

<script setup lang="ts">
interface Props {
	quantity?: number;
}

const { quantity } = defineProps<Props>();
</script>
