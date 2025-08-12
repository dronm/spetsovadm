<template>
	<!--
		style="position:relative; left:15px; 
		color: #0A0D12; font-size: 24px; font-family: Russo One; font-weight: 400; line-height: 32px; word-wrap: break-word;
		margin-bottom: 20px;"

-->
	<div 
		class="text-[color:var(--gray-950)] [font-family:var(--font-russo)] text-2xl font-normal 
		leading-8 mb-[28px] ml-[24px] mt-[28px]"
	>
		{{ title }}
	</div>
</template>

<script setup lang="ts">
interface Props {
	title: string;
}
const { title } = defineProps<Props>();

</script>
