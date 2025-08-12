<template>
	<div class="mt-8 space-y-4">
		<p class="text-red-600">{{ $t('UserPassword.requirements') }}</p>
		<div>
			<label for="pwd" class="label-public">{{
				t('UserPassword.pwd.label')
			}}</label>
			<input
				id="pwd"
				:maxlength="50"
				type="password"
				v-model="newPassword"
				required
				class="control-public"
				:title="$t('UserPassword.pwd.title')"
			/>
		</div>

		<div>
			<label for="pwd_conf" class="label-public">{{
				t('UserPassword.pwd_conf.label')
			}}</label>
			<input
				id="pwd_conf"
				:maxlength="50"
				type="password"
				required
				v-model="passwordConf"
				class="control-public"
				:title="$t('UserPassword.pwd_conf.title')"
			/>
		</div>

		<div
			v-if="newPassword.length && !isStrongPassword"
			class="text-sm text-red-600"
		>
			{{ $t('UserPassword.tooWeak') }}
		</div>
		<div
			v-else-if="
				(newPassword.length || passwordConf.length) && passwordMatch
			"
			class="text-sm text-gray-600"
		>
			{{ $t('UserPassword.match') }}
		</div>
		<div
			v-else-if="
				(newPassword.length || passwordConf.length) && !passwordMatch
			"
			class="text-sm text-red-600"
		>
			{{ $t('UserPassword.noMatch') }}
		</div>

		<Button
			:disabled="!passwordMatch || !newPassword.length"
			@click="handleUpdate"
		>
			{{ t('UserPassword.update') }}
		</Button>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Button from '@/lib/components/Button.vue';

import { userPasswordUpdate } from '@/services/user';
import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';
import { NOTE_NOTIF_TIMEOUT, ERROR_NOTIF_TIMEOUT } from '@/config/constants';
import { isStrongPassword } from '@/utils/isStrongPassword';

const { t } = useI18n();
const notificationStore = useNotificationStore();

const newPassword = ref('');
const passwordConf = ref('');

const passwordMatch = computed(() => newPassword.value == passwordConf.value);

const handleUpdate = async () => {
	if (!newPassword.value || !newPassword.value.length) {
		throw new Error('password incorrect');
	}

	if (newPassword.value != passwordConf.value) {
		throw new Error('password does not match');
	}

	try {
		await userPasswordUpdate.func(newPassword.value);
		notificationStore.addNotification(
			t('UserPassword.notifUpdated'),
			NOTE_NOTIF_TIMEOUT,
			MessageType.Info,
		);
	} catch (error: unknown) {
		notificationStore.addNotification(
			t('UserPassword.notifError'),
			ERROR_NOTIF_TIMEOUT,
			MessageType.Err,
		);
	}
};
</script>
