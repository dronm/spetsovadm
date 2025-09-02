<template>
	<!-- go back -->
	<div class="inline-flex justify-center items-center gap-1.5 ml-[24px] cursor-pointer"
		@click="goBack"
	> 
		<ChevronLeft />
		<span class="text-[color:var(--gray-600)] [font-family:Inter] text-sm font-semibold leading-5">
			{{ backTitle }}
		</span>
	</div>

	<!-- title -->
	<div 
		class="text-[color:var(--gray-95)] [font-family:var(--font-russo)] text-3xl font-bold leading-[38px] ml-[24px] mb-[28px] mt-[24px]"
	>
		{{ title }}
	</div>

</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import ChevronLeft from '@/components/icons/ChevronLeft.vue';

interface Props {
	backTitle: string;
	title: string;
	backRoute: string;
}
const { backTitle, title, backRoute } = defineProps<Props>();

const router = useRouter();
const goBack = () => {
	router.push({ name: backRoute });
}
	
</script>
