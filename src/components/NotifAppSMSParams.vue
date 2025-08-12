<template>
	<div class="detail-title">{{ t('NotifApp.smsParams.title') }}</div>

	<div>
		<Edit
			id="login"
			:label="$t('NotifApp.smsParams.login.label')"
			:title="$t('NotifApp.smsParams.login.title')"
			:placeholder="$t('NotifApp.smsParams.login.placeholder')"
			v-model="smsData.login"
		>
		</Edit>

		<Edit
			id="pwd"
			:label="$t('NotifApp.smsParams.pwd.label')"
			:title="$t('NotifApp.smsParams.pwd.title')"
			:placeholder="$t('NotifApp.smsParams.pwd.placeholder')"
			v-model="smsData.pwd"
		>
		</Edit>

		<Edit
			id="sign"
			:label="$t('NotifApp.smsParams.sign.label')"
			:title="$t('NotifApp.smsParams.sign.title')"
			:placeholder="$t('NotifApp.smsParams.sign.placeholder')"
			v-model="smsData.sign"
		>
		</Edit>

		<EditCheckbox
			id="active"
			:label="$t('NotifApp.smsParams.active.label')"
			:title="$t('NotifApp.smsParams.active.title')"
			v-model="smsData.active"
		>
		</EditCheckbox>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';
import EditCheckbox from '@/lib/components/EditCheckbox.vue';

import { type NotifSMSParams } from '@/models/notifApp';

const { t } = useI18n();

const extSMSData = defineModel<NotifSMSParams>('smsData');

const defSMSData: NotifSMSParams = {
	login: '',
	pwd: '',
	sign: '',
	active: false,
};
const smsData = ref<NotifSMSParams>({ ...defSMSData });

watch(
	() => extSMSData.value,
	(newVal) => {
		if (newVal) {
			smsData.value = { ...defSMSData, ...newVal };
		}
	},
	{ immediate: true },
);

watch(
	smsData,
	(newVal) => {
		if (JSON.stringify(extSMSData.value) !== JSON.stringify(newVal)) {
			extSMSData.value = { ...newVal };
		}
	},
	{ deep: true },
);
// const errors = defineModel<Record<string, string>>("errors");
// const data = ref<NotifsmsParams>({
// 	token: ""
// });
</script>
