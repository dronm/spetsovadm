<template>
	<button :title="title" :class="['btn-badge', { active: active }]">
		<font-awesome-icon :icon="['fas', 'star']" />

		<div class="btn-badge-count" v-if="quantity">{{ quantity }}</div>
	</button>
</template>

<script setup lang="ts">
//this button is shown from HeadMenu and from ProductPublicListCard
interface Props {
	quantity?: number;
	active?: boolean;
	title?: string;
}

const { quantity = 0, active = false, title } = defineProps<Props>();
</script>
