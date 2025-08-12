<template>
	<!-- go back -->
	<div class="inline-flex justify-center items-center gap-1.5 cursor-pointer"
		@click="goBack"
	> 
		<ChevronLeft />
		<span class="text-[color:var(--Gray-600,#535862)] [font-family:Inter] text-sm font-semibold leading-5">
			{{ backTitle }}
		</span>
	</div>

	<!-- title -->
	<div class="detail-title">{{ title }}</div>

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
