<template>
	<AdminLayout v-if="is_admin == '1'" />
	<MainLayout v-else />
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

const is_admin = import.meta.env.VITE_IS_ADMIN;
</script>
