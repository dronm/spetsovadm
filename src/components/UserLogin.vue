<template>
	<div class="relative bg-gray-100 py-10 px-4">
		<!-- Go Back Button -->
		<button
			v-if="authStore.authProcess.checked"
			@click="authStore.authProcess.checked = false"
			class="absolute top-4 left-4 flex items-center text-sm text-gray-600 hover:text-green-600 transition cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 mr-1"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
			<span>{{ $t('Login.goBack') }}</span>
		</button>

		<!-- Centered Form -->
		<div class="flex items-center justify-center">
			<div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
				<h2 class="text-2xl font-bold text-center text-gray-700 mb-6">
					{{ formTitle }}
				</h2>
				<form @submit.prevent="handleClick" class="space-y-4">
					<!-- email or tel -->
					<div>
						<label for="userLogin" class="label-public">{{
							$t('Login.login.label')
						}}</label>
						<input
							id="userLogin"
							ref="loginInput"
							type="text"
							v-maska="maskOptions"
							v-model="userLogin"
							:disabled="authStore.authProcess.checked"
							@keydown="handleKeydown"
							@paste="handlePaste"
							required
							class="control-public"
							:placeholder="$t('Login.login.placeholder')"
						/>
					</div>

					<template v-if="authStore.authProcess.checked">
						<template v-if="authStore.authProcess.isTel">
							<div
								v-if="codeIntervalVis"
								class="mt-2 text-sm text-gray-600"
							>
								{{ checkCodeSentText }}
							</div>
							<button
								v-else
								type="submit"
								class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
								@click="handleCheckCred"
							>
								{{ $t('Login.resendCode') }}
							</button>

							<div>
								<label for="code" class="label-public">
									{{ $t('Login.code.label') }}
								</label>
								<input
									id="code"
									ref="pwdInput"
									type="text"
									v-model="userPassword"
									required
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
						</template>

						<!-- password login -->
						<template v-else>
							<div title="$t('Login.password.title')">
								<label for="password" class="label-public">
									{{ $t('Login.password.label') }}
								</label>
								<input
									id="password"
									ref="pwdInput"
									type="password"
									v-model="userPassword"
									required
									class="control-public"
									:placeholder="
										$t('Login.password.placeholder')
									"
								/>
							</div>
						</template>
					</template>

					<button
						type="submit"
						class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
					>
						{{ t('Login.submit') }}
					</button>
				</form>
				<p v-if="errorMessage" class="mt-4 text-center text-red-500">
					{{ errorMessage }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { vMaska } from 'maska/vue';
import type { MaskInputOptions } from 'maska';

import { useAuthStore } from '@/stores/useAuthStore';
import {
	type User_check_cred,
	type User_login_tel,
	type User_login_email,
} from '../models/user';
import { errorText } from '@/utils/errorText';
import { userCheckCred } from '@/services/user';
import type {
	UserCheckCredResult,
	UserLoginNotification,
} from '@/services/user';
import {
	TEL_MASK,
	TEL_REG_EXP,
	EMAIL_REG_EXP,
	NOTE_NOTIF_TIMEOUT,
	ERROR_NOTIF_TIMEOUT,
} from '@/config/constants';
import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';
import { applyTelMask, removeTelMask } from '@/utils/telMask';

const { t } = useI18n();

interface UserLoginProps {
	userName: string;
}
const { userName } = defineProps<UserLoginProps>();

const authStore = useAuthStore();
const router = useRouter();

const checkCodeType = ref<UserLoginNotification | undefined>(undefined);

const userLogin = ref<string>(
	authStore.authProcess.checked && authStore.authProcess.login
		? authStore.authProcess.login
		: userName,
); //unmasked valur
const userPassword = ref('');
const errorMessage = ref('');
const loginInput = ref<HTMLInputElement | null>(null);
const pwdInput = ref<HTMLInputElement | null>(null);
watch(pwdInput, (newValue) => {
	if (newValue) {
		newValue.focus();
	}
});

const emit = defineEmits<{
	closeModal: [];
	register: [userLogin: string, loginIsTel: boolean];
}>();

const maskOptions = reactive<MaskInputOptions>({
	mask: null,
});

const handleKeydown = (event: KeyboardEvent) => {
	const allowedKeys = [
		'Backspace',
		'ArrowLeft',
		'ArrowRight',
		'Delete',
		'Tab',
		'Enter',
	];

	if (
		maskOptions.mask === null &&
		TEL_REG_EXP.test(userLogin.value + event.key)
	) {
		//no mask && all digits starting with 3/4/9
		maskOptions.mask = TEL_MASK;
	} else if (
		maskOptions.mask !== null &&
		!/^\d$/.test(event.key) &&
		!allowedKeys.includes(event.key)
	) {
		//mask && not a digit has come
		maskOptions.mask = null;
		userLogin.value = removeTelMask(userLogin.value);
	}
};

const handlePaste = (e: ClipboardEvent) => {
	const pastedText = e.clipboardData?.getData('text') || '';
	const digitsOnly = pastedText.replace(/\D/g, ''); // remove non-digits

	let normalized = digitsOnly;
	if (normalized.startsWith('7')) {
		normalized = normalized.slice(1); // remove leading '7'
	}

	if (normalized.length === 10 && TEL_REG_EXP.test(normalized)) {
		// Valid Russian phone number
		e.preventDefault();
		maskOptions.mask = TEL_MASK;

		// Apply formatted value
		userLogin.value = applyTelMask(normalized);
	} else {
		// Treat as email or raw string
		maskOptions.mask = null;
		userLogin.value = pastedText;
	}
};

const handleClick = () => {
	if (!authStore.authProcess.checked) {
		handleCheckCred();
	} else {
		handleLogin();
	}
};

const notificationStore = useNotificationStore();

const handleCheckCred = async () => {
	errorMessage.value = '';
	userPassword.value = '';
	try {
		let unmasked = '';
		const digitsOnly = userLogin.value.replace(/\D/g, '');

		let isTel = false;
		if (
			(digitsOnly.length === 11 && digitsOnly.startsWith('7')) ||
			(digitsOnly.length === 10 && TEL_REG_EXP.test(digitsOnly))
		) {
			unmasked = digitsOnly.slice(-10); // last 10 digits
			maskOptions.mask = TEL_MASK;
			isTel = true;
		} else if (EMAIL_REG_EXP.test(userLogin.value)) {
			unmasked = userLogin.value;
			maskOptions.mask = null;
		} else {
			throw new Error(t('Header.HeadMenu.UserLogin.errIncorrectInput'));
		}
		const resp: UserCheckCredResult = await userCheckCred.func(<
			User_check_cred
		>{ login: unmasked });

		if (resp.exists) {
			//registered
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

			authStore.authProcess.checked = true; //show code
			authStore.authProcess.login = userLogin.value;
			authStore.authProcess.isTel = isTel;
			authStore.startVerifTimer(resp.sec_left); //left or start over
		} else {
			//new registration
			notificationStore.addNotification(
				t('Login.notifRegister'),
				NOTE_NOTIF_TIMEOUT,
				MessageType.Info,
			);

			emit('register', isTel ? unmasked : userLogin.value, isTel);
			authStore.resetProcess();
		}
	} catch (error: unknown) {
		notificationStore.addNotification(
			t('Login.notifLogError'),
			ERROR_NOTIF_TIMEOUT,
			MessageType.Err,
		);
		errorMessage.value = errorText(error);
	}
};

const handleLogin = async () => {
	errorMessage.value = '';
	try {
		const unmasked =
			maskOptions.mask != null
				? removeTelMask(userLogin.value)
				: userLogin.value;
		if (unmasked.length == 0 || userPassword.value.length == 0) {
			throw new Error('invalid name');
		}

		if (authStore.authProcess.isTel) {
			await authStore.loginTel(<User_login_tel>{
				tel: unmasked,
				code: userPassword.value,
			});
		} else {
			await authStore.loginEmail(<User_login_email>{
				email: unmasked,
				pwd: userPassword.value,
			});
		}

		emit('closeModal');
		router.push('/');
	} catch (error: unknown) {
		notificationStore.addNotification(
			t('Login.notifLogError'),
			ERROR_NOTIF_TIMEOUT,
			MessageType.Err,
		);
		errorMessage.value = errorText(error);
	}
};

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

//title depends on userCredChecked
const formTitle = computed(() => {
	let titleAttr = 'all';
	if (authStore.authProcess.checked) {
		titleAttr = 'auth';
	}
	return t('Login.title.' + titleAttr);
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

onMounted(() => {
	loginInput.value?.focus();
});
</script>
