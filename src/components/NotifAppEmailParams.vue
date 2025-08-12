<template>
	<div class="detail-title">{{ t('NotifApp.emailParams.title') }}</div>

	<div>
		<Edit
			id="host"
			:label="$t('NotifApp.emailParams.host.label')"
			:title="$t('NotifApp.emailParams.host.title')"
			:placeholder="$t('NotifApp.emailParams.host.placeholder')"
			v-model="emailData.host"
		>
		</Edit>

		<Edit
			id="user"
			:label="$t('NotifApp.emailParams.user.label')"
			:title="$t('NotifApp.emailParams.user.title')"
			:placeholder="$t('NotifApp.emailParams.user.placeholder')"
			v-model="emailData.user"
		>
		</Edit>

		<Edit
			id="pwd"
			:label="$t('NotifApp.emailParams.pwd.label')"
			:title="$t('NotifApp.emailParams.pwd.title')"
			:placeholder="$t('NotifApp.emailParams.pwd.placeholder')"
			v-model="emailData.pwd"
		>
		</Edit>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';

import { type NotifEmailParams } from '@/models/notifApp';

const { t } = useI18n();

const extEmailData = defineModel<NotifEmailParams>('emailData');

const defEmailData: NotifEmailParams = {
	user: '',
	pwd: '',
	host: '',
};
const emailData = ref<NotifEmailParams>({ ...defEmailData });

watch(
	() => extEmailData.value,
	(newVal) => {
		if (newVal) {
			emailData.value = { ...defEmailData, ...newVal };
		}
	},
	{ immediate: true },
);

watch(
	emailData,
	(newVal) => {
		if (JSON.stringify(extEmailData.value) !== JSON.stringify(newVal)) {
			extEmailData.value = { ...newVal };
		}
	},
	{ deep: true },
);
// const errors = defineModel<Record<string, string>>("errors");
// const data = ref<NotifemailParams>({
// 	token: ""
// });
</script>
