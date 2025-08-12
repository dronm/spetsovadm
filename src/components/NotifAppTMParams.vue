<template>
	<div class="detail-title">{{ t('NotifApp.tmParams.title') }}</div>

	<div>
		<Edit
			id="name"
			:label="$t('NotifApp.tmParams.token.label')"
			:title="$t('NotifApp.tmParams.token.title')"
			:placeholder="$t('NotifApp.tmParams.token.placeholder')"
			v-model="tmData.token"
		>
		</Edit>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';

import { type NotifTMParams } from '@/models/notifApp';

const { t } = useI18n();

const extTmData = defineModel<NotifTMParams>('tmData');

const defTmData: NotifTMParams = {
	token: '',
};
const tmData = ref<NotifTMParams>({ ...defTmData });

watch(
	() => extTmData.value,
	(newVal) => {
		if (newVal) {
			tmData.value = { ...defTmData, ...newVal };
		}
	},
	{ immediate: true },
);

watch(
	tmData,
	(newVal) => {
		if (JSON.stringify(extTmData.value) !== JSON.stringify(newVal)) {
			extTmData.value = { ...newVal };
		}
	},
	{ deep: true },
);
// const errors = defineModel<Record<string, string>>("errors");
// const data = ref<NotifTMParams>({
// 	token: ""
// });
</script>
