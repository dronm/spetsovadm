<template>
	<Transition name="fade">
		<slot></slot>
	</Transition>
</template>

<script setup lang="ts">
interface Props {
	duration?: number;
}

const { duration = 0.3 } = defineProps<Props>();
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
