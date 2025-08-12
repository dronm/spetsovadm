<template>
	<div v-if="!is_admin" class="flex flex-col gap-8">
		<MainCarousel />
		<PopCat />
	</div>
</template>

<script setup lang="ts">
import MainCarousel from '../components/MainCarousel.vue';
import PopCat from '../components/PopCat.vue';

const is_admin = import.meta.env.VITE_IS_ADMIN;
</script>
