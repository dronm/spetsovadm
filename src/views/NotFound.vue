<template>
	<section class="flex flex-col items-center gap-6 text-center mt-12">
		<h1 class="text-4xl font-bold text-gray-800">
			{{ $t('NotFound.pageNotFoundTxt') }}
		</h1>
		<h1 class="text-6xl font-extrabold text-red-600">404</h1>
		<h3 class="text-lg text-gray-500">
			{{ $t('NotFound.redirectTxt') }}
		</h3>
		<CountDownTimer :timeout="5" @onTimerEnd="redirectToHomepage" />
	</section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import CountDownTimer from '@/components/CountDownTimer.vue';

const router = useRouter();

const { t } = useI18n();

const redirectToHomepage = () => {
	router.replace('/');
};
</script>
