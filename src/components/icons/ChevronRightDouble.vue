<template>
	<svg 
		:width="width" 
		:height="height" 
		viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5 14.1668L9.16667 10.0002L5 5.8335M10.8333 14.1668L15 10.0002L10.8333 5.8335"
			:stroke="color" 
			stroke-width="1.66667" 
			stroke-linecap="round" stroke-linejoin="round"
		/>
	</svg>
</template>

<script setup>
defineProps({
  width: { type: [String, Number], default: 20 },
  height: { type: [String, Number], default: 20 },
  color: { type: String, default: '#097350' },
})
</script>



