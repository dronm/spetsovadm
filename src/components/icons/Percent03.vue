<template>
	<svg 
		:width="width" 
		:height="height" 
		viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_14124_5108)">
			<path d="M7.49996 7.49999H7.50829M12.5 12.5H12.5083M13.3333 6.66666L6.66663 13.3333M7.91663 7.49999C7.91663 7.73011 7.73008 7.91666 7.49996 7.91666C7.26984 7.91666 7.08329 7.73011 7.08329 7.49999C7.08329 7.26987 7.26984 7.08332 7.49996 7.08332C7.73008 7.08332 7.91663 7.26987 7.91663 7.49999ZM12.9166 12.5C12.9166 12.7301 12.7301 12.9167 12.5 12.9167C12.2698 12.9167 12.0833 12.7301 12.0833 12.5C12.0833 12.2699 12.2698 12.0833 12.5 12.0833C12.7301 12.0833 12.9166 12.2699 12.9166 12.5ZM18.3333 9.99999C18.3333 14.6024 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6024 1.66663 9.99999C1.66663 5.39762 5.39759 1.66666 9.99996 1.66666C14.6023 1.66666 18.3333 5.39762 18.3333 9.99999Z" stroke="#535862" 
				:stroke="color" 
				stroke-width="1.66667" 
				stroke-linecap="round" 
				stroke-linejoin="round"/>
		</g>
		<defs>
			<clipPath id="clip0_14124_5108">
				<rect :width="width" :height="height" fill="white"/>
			</clipPath>
		</defs>
	</svg>
</template>

<script setup>
defineProps({
  width: { type: [String, Number], default: 20 },
  height: { type: [String, Number], default: 20 },
  color: { type: String, default: '#A4A7AE' },
})
</script>


