<template>
	<div class="space-y-4">
		<div>
			<label for="tel" class="label-public">{{
				t('Login.tel.label')
			}}</label>
			<input
				id="tel"
				required
				:disabled="telDisabled"
				type="text"
				v-maska:telUnmasked.unmasked="TEL_MASK"
				:value="telMasked"
				class="control-public"
			/>
		</div>

		<template v-if="!telConfirmed">
			<div v-if="codeIntervalVis" class="mt-2 text-sm text-gray-600">
				{{ checkCodeSentText }}
			</div>
			<button
				v-else
				@click="sendCode"
				class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
			>
				{{ $t('Login.resendCode') }}
			</button>

			<div title="$t('Login.code.title')">
				<label for="code" class="label-public">
					{{ $t('Login.code.label') }}
				</label>
				<input
					id="code"
					ref="pwdInput"
					:disabled="codeDisabled"
					type="text"
					v-model="verifCode"
					class="control-public"
					:placeholder="$t('Login.code.placeholder')"
				/>
			</div>

			<div
				v-if="codeIntervalVis"
				class="mt-2 text-sm text-gray-500 text-center"
			>
				{{ formattedTime }}
			</div>

			<button
				:disabled="codeDisabled"
				@click="verifyCode"
				class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
			>
				{{ $t('Login.verifyCode') }}
			</button>
		</template>

		<template v-else>
			<div class="mt-2 text-sm text-gray-500 text-center">
				{{ $t('UserProfile.tel.confirmed') }}
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '@/stores/useAuthStore';
import type {
	UserLoginNotification,
	UserSendTelCodeResult,
} from '@/services/user';
import { userVerifyTel, userSendTelCode } from '@/services/user';
import { type User_login_tel, type User_send_tel_code } from '../models/user';
import {
	TEL_MASK,
	TEL_REG_EXP,
	NOTE_NOTIF_TIMEOUT,
	ERROR_NOTIF_TIMEOUT,
} from '@/config/constants';
import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';

const { t } = useI18n();
const authStore = useAuthStore();

const verifCode = ref<string>('');

const tel = defineModel<string>('tel'); //unmasked tel
const telConfirmed = defineModel<boolean>('telConfirmed');

const telUnmasked = ref(''); //tel.value
// const telMasked = ref(applyTelMask(tel.value ?? "")); //tel with applied v-maska
const telMasked = ref(''); //tel with applied v-maska
watch(
	() => tel.value,
	(newTel) => {
		// if (newTel !== undefined && newTel !== telUnmasked.value) {
		telMasked.value = newTel ?? '';
		// }
	},
	{ immediate: true },
);
watch(telUnmasked, (newTel) => {
	console.log('setting tel value to ', newTel);
	tel.value = newTel;
});

const telDisabled = ref(telConfirmed.value);
const codeDisabled = ref(true);

const formattedTime = computed(() => {
	if (authStore.authProcess.countdown !== undefined) {
		const minutes = String(
			Math.floor(authStore.authProcess.countdown / 60),
		).padStart(2, '0');
		const seconds = String(authStore.authProcess.countdown % 60).padStart(
			2,
			'0',
		);
		return t('Login.code.timeLeft', { tm: `${minutes}:${seconds}` });
	}
	return '';
});

const codeIntervalVis = computed(() => {
	return (
		authStore.authProcess.countdown !== undefined &&
		authStore.authProcess.countdown > 0
	);
});

const checkCodeSentText = computed(() => {
	let txt = '';
	if (!checkCodeType.value) {
		return txt;
	}
	if (checkCodeType.value.sms) {
		txt = t('Login.code.sentSMS');
	} else if (checkCodeType.value.wa) {
		txt = t('Login.code.sentWA');
	} else if (checkCodeType.value.tm) {
		txt = t('Login.code.sentTM');
	}
	return txt;
});

const notificationStore = useNotificationStore();

const validateTel = () => {
	if (!telUnmasked.value || !telUnmasked.value?.length) {
		throw new Error(t('UserTel.errTelNotSet'));
	}
	if (!TEL_REG_EXP.test(telUnmasked.value)) {
		throw new Error(t('UserTel.errTelIncorrect'));
	}
};

const checkCodeType = ref<UserLoginNotification | undefined>(undefined);
const sendCode = async () => {
	validateTel();
	telDisabled.value = true;

	try {
		const resp: UserSendTelCodeResult = await userSendTelCode.func(<
			User_send_tel_code
		>{ tel: telUnmasked.value });

		let notifText = '';
		checkCodeType.value = resp.login_notification;
		if (resp.notified) {
			notifText = t('Login.notifSendCode');
		} else {
			notifText = t('Login.notifCheckCode');
		}
		notificationStore.addNotification(
			notifText,
			NOTE_NOTIF_TIMEOUT,
			MessageType.Info,
		);

		authStore.authProcess.checked = true; //show code authStore.authProcess.isTel = true;
		authStore.startVerifTimer(resp.sec_left); //left or start over
		codeDisabled.value = false;
	} catch (error: unknown) {
		telDisabled.value = false;
		notificationStore.addNotification(
			t('Login.notifLogError'),
			ERROR_NOTIF_TIMEOUT,
			MessageType.Err,
		);
	}
};

const verifyCode = async () => {
	validateTel();

	if (!verifCode.value || !verifCode.value?.length) {
		throw new Error(t('UserTel.errCodeNotSet'));
	}

	try {
		await userVerifyTel.func(<User_login_tel>{
			tel: telUnmasked.value,
			code: verifCode.value,
		});
		notificationStore.addNotification(
			t('UserTel.telConfirmed'),
			NOTE_NOTIF_TIMEOUT,
			MessageType.Info,
		);
		telConfirmed.value = true;
	} catch (error: unknown) {
		notificationStore.addNotification(
			t('UserTel.errCodeIncorrect'),
			ERROR_NOTIF_TIMEOUT,
			MessageType.Err,
		);
	}
};

defineExpose({ telUnmasked });
</script>
