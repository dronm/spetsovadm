<template>
	<Button
		@click="onClick"
		:title="t('LoginDeviceBanBtn.title')"
		v-bind="{ ...props }"
		variant="btn-cmd"
	>
		<font-awesome-icon :icon="['fas', 'user-minus']" />
	</Button>
</template>

<script setup lang="ts">
import Button from '@/lib/components/Button.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps();

const emit = defineEmits(['command']);

const { t } = useI18n();

const onClick = () => {
	emit('command', 'set_ban');
};
</script>
