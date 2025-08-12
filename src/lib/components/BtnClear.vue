<template>
	<Button :title="t('BtnClear.title')" class="action" variant="btn-cmd">
		<font-awesome-icon :icon="['fas', 'xmark']" />
	</Button>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import Button from "./Button.vue";

const { t } = useI18n();
</script>
