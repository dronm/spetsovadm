<template>
	<button v-bind="$attrs" :class="['btn', variant]" type="button">
		<slot> </slot>
	</button>
</template>

<script setup lang="ts">
interface Props {
	variant?: string;
}

const { variant = "btn-info" } = defineProps<Props>();
</script>
