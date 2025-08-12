<template>
	<button
		:class="['button', variant, isActive && 'active']"
		type="button"
		:disabled="isDisabled"
	>
		<div :class="[text && 'container']" :style="{ display: !text && 'contents' }">
			<span class="text" v-if="text">{{ text }}</span>

			<slot></slot>
		</div>
	</button>
</template>

<script setup>
const props = defineProps({
	isDisabled: {
		type: Boolean,
		required: false,
		default: false,
	},
	iconColor: {
		type: String,
		required: false,
	},
	iconHoverColor: {
		type: String,
		required: false,
	},
	variant: {
		type: String,
		required: false,
	},
	isActive: {
		type: Boolean,
		required: false,
		default: false,
	},
	iconActiveColor: {
		type: String,
		required: false,
	},
	opacity: {
		type: String,
		required: false,
	},
	text: {
		type: String,
		required: false,
	},
});
</script>
