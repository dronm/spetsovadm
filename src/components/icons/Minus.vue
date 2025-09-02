<template>
	<svg 
		:width="width" 
		:height="height" 
		viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M3.3335 8H12.6668" 
			:stroke="color" 
			stroke-width="1.336" stroke-linecap="round" stroke-linejoin="round"
		/>
	</svg>
</template>

<script setup>
defineProps({
  width: { type: [String, Number], default: 16 },
  height: { type: [String, Number], default: 16 },
  color: { type: String, default: '#0A0D12' },
});
</script>




