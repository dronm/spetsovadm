<template>
	<Edit
		id="email"
		:label="t('UserEmail.email.label')"
		type="text"
		v-model="email"
		required
		:title="$t('UserEmail.email.title')"
	/>

	<div v-if="emailConfirmed" class="mt-2 text-sm text-gray-500 text-center">
		{{ $t('UserEmail.confirmed') }}
	</div>
	<Button v-else @click="handleConfirm">
		{{ $t('UserEmail.confirm') }}
	</Button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';
import Button from '@/lib/components/Button.vue';

import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';
import { NOTE_NOTIF_TIMEOUT, ERROR_NOTIF_TIMEOUT } from '@/config/constants';
import { EMAIL_REG_EXP } from '@/config/constants';
import { userSendEmailVerif } from '@/services/user';

const { t } = useI18n();
const notificationStore = useNotificationStore();

const email = defineModel<string>('email');
const emailConfirmed = defineModel<boolean>('emailConfirmed');

const validateEmail = () => {
	if (!email.value || !EMAIL_REG_EXP.test(email.value)) {
		throw new Error(t('UserEmail.errNotValie'));
	}
};

const handleConfirm = async () => {
	validateEmail();

	try {
		await userSendEmailVerif.func(email.value);
		notificationStore.addNotification(
			t('UserEmail.confirmSent'),
			NOTE_NOTIF_TIMEOUT,
			MessageType.Info,
		);
		emailConfirmed.value = true;
	} catch (error: unknown) {
		notificationStore.addNotification(
			t('UserEmail.errSending'),
			ERROR_NOTIF_TIMEOUT,
			MessageType.Err,
		);
	}
};
</script>
