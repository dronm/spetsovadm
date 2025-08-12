<template>
	<div class="relative bg-gray-100 py-10 px-4">
		<!-- Go Back Button -->
		<button
			@click="goBack"
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

		<div class="flex items-center justify-center bg-gray-100">
			<div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
				<h2 class="text-2xl font-bold text-center text-gray-700 mb-6">
					{{ t('UserRegister.title') }}
				</h2>
				<div class="space-y-4">
					<div>
						<label for="name" class="label-public">{{
							t('Login.name.label')
						}}</label>
						<input
							id="name"
							ref="name"
							type="text"
							v-model="registerInf.name"
							required
							class="control-public"
							:placeholder="$t('Login.name.placeholder')"
							:title="$t('Login.name.title')"
						/>
					</div>

					<div>
						<label for="email" class="label-public">{{
							t('Login.email.label')
						}}</label>
						<input
							id="email"
							required
							type="text"
							v-model="registerInf.email"
							class="control-public"
							:placeholder="$t('Login.email.placeholder')"
						/>
					</div>

					<!-- tel is not verified yet -->
					<UserTel
						v-model:tel="registerInf.tel"
						v-model:telConfirmed="telConfirmed"
					>
					</UserTel>

					<!-- is_enterprise radio group -->
					<UserIsEnterprise v-model="registerInf.is_enterprise">
					</UserIsEnterprise>

					<div>
						<label for="sendActionInf" class="label-public">{{
							t('Login.sendActionInf.label')
						}}</label>
						<input
							id="sendActionInf"
							type="checkbox"
							v-model="registerInf.send_action_inf"
						/>
					</div>

					<!-- code -->
					<div title="$t('Login.password.title')">
						<label for="password" class="label-public">
							{{ t('Login.password.label') }}
						</label>
						<input
							type="password"
							id="password"
							v-model="registerInf.pwd"
							required
							class="control-public"
							:placeholder="$t('Login.password.placeholder')"
						/>
					</div>

					<button
						@click="handleRegister"
						class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
					>
						{{ t('UserRegister.submit') }}
					</button>
				</div>
				<p v-if="errorMessage" class="mt-4 text-center text-red-500">
					{{ errorMessage }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/useAuthStore';
import { type User_register } from '@/models/user';
import { errorText } from '@/utils/errorText';
import { TEL_REG_EXP, EMAIL_REG_EXP } from '@/config/constants';
import UserTel from '@/components/UserTel.vue';
import UserIsEnterprise from '@/components/UserIsEnterprise.vue';
import { applyTelMask } from '@/utils/telMask';
import { isStrongPassword } from '@/utils/isStrongPassword';

const { t } = useI18n();

interface UserRegisterProps {
	userEmail?: string;
	userTel?: string;
}
const { userEmail, userTel } = defineProps<UserRegisterProps>();

const authStore = useAuthStore();
const router = useRouter();

const registerInf = ref<User_register>({
	name: '',
	pwd: '',
	is_enterprise: false,
	email: userEmail ?? '',
	tel: userTel ?? '',
	send_action_inf: false,
});
const telConfirmed = ref(false);
const errorMessage = ref('');
const name = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
	closeModal: [];
	login: [name: string];
}>();

const handleRegister = async () => {
	//check required fields, validate
	console.log('val:', registerInf.value);
	if (!telConfirmed.value) {
		throw new Error(t('UserRegister.errTelNotVerified'));
	}

	if (!registerInf.value.pwd.length) {
		throw new Error(t('UserRegister.errNoPassword'));
	}
	if (!isStrongPassword(registerInf.value.pwd)) {
		throw new Error(t('UserPassword.tooWeak'));
	}

	if (!registerInf.value.name.length) {
		throw new Error(t('UserRegister.errNoName'));
	}
	if (!TEL_REG_EXP.test(registerInf.value.tel)) {
		throw new Error(t('Header.HeadMenu.UserLogin.errIncorrectTel'));
	}
	if (!EMAIL_REG_EXP.test(registerInf.value.email)) {
		throw new Error(t('Header.HeadMenu.UserLogin.errIncorrectEmail'));
	}
	errorMessage.value = '';
	try {
		await authStore.register(registerInf.value);

		emit('closeModal');
		router.push('/');
	} catch (error: unknown) {
		errorMessage.value = errorText(error);
	}
};

const goBack = () => {
	emit(
		'login',
		registerInf.value.tel.length
			? applyTelMask(registerInf.value.tel)
			: registerInf.value.email,
	);
};

onMounted(() => {
	name.value?.focus();
});
</script>
