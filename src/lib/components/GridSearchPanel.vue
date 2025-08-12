<template>
	<span v-for="res in resultList" :key="res.id">
		<span :title="$t('GridSearchPanel.descrTitle')"> {{ res.descr }}: </span>
		<span :title="$t('GridSearchPanel.valueTitle')">
			{{ res.val }}
		</span>
		<span
			:title="$t('GridSearchPanel.removeTitle')"
			@click="emit('remove', res.id)"
			class="cursor-pointer"
		>
			<font-awesome-icon :icon="['fas', 'xmark']" />
		</span>
	</span>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { type GridSearchPanelProps } from "../types/GridSearchPanel";

const { t } = useI18n();

const { resultList } = defineProps<GridSearchPanelProps>();

const emit = defineEmits<{
	remove: [id: string];
}>();
</script>
