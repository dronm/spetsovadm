<template>
	<svg 
		:width="width" 
		:height="height" 
		viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M17.0442 10.7444C16.8127 12.9193 15.5804 14.9574 13.5412 16.1347C10.1533 18.0907 5.8212 16.9299 3.86519 13.542L3.65686 13.1812M2.95515 9.25602C3.18665 7.08111 4.41898 5.043 6.45813 3.8657C9.84604 1.90969 14.1781 3.07047 16.1341 6.45838L16.3425 6.81922M2.91101 15.0552L3.52105 12.7785L5.79776 13.3886M14.202 6.61186L16.4787 7.2219L17.0888 4.94519" 
			:stroke="color" 
			stroke-width="1.66667" 
			stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
</template>

<script setup>
defineProps({
  width: { type: [String, Number], default: 20 },
  height: { type: [String, Number], default: 20 },
  color: { type: String, default: '#A4A7AE' },
})
</script>



