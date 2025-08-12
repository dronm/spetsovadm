<template>
	<!-- Full screen container -->
	<div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
		<!-- Centered Form Card -->
		<div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
			<h2 class="text-2xl font-bold text-center text-gray-700 mb-6">
				{{ t('Login.title.auth') }}
			</h2>

			<form @submit.prevent="handleLogin" class="space-y-4">
				<div>
					<label for="userLogin" class="label-public">
						{{ $t('Login.loginPwd.label') }}
					</label>
					<input
						id="userLogin"
						ref="loginInput"
						type="text"
						v-model="userLogin"
						required
						class="control-public"
						:placeholder="$t('Login.loginPwd.placeholder')"
						:title="$t('Login.loginPwd.title')"
					/>
				</div>

				<div>
					<label for="userPwd" class="label-public">
						{{ $t('Login.password.label') }}
					</label>
					<input
						id="userPwd"
						ref="loginPwd"
						type="password"
						v-model="userPwd"
						required
						class="control-public"
						:placeholder="$t('Login.password.placeholder')"
					/>
				</div>

				<button
					type="submit"
					class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
				>
					{{ t('Login.submit') }}
				</button>
			</form>

			<p v-if="errorMessage" class="mt-4 text-center text-red-500">
				{{ errorMessage }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/useAuthStore';
import { errorText } from '@/utils/errorText';
import { type User_login } from '@/models/user';

const { t } = useI18n();

const authStore = useAuthStore();
const router = useRouter();

const userLogin = ref<string>(''); //unmasked value
const userPwd = ref('');
const errorMessage = ref('');

const loginInput = ref<HTMLInputElement | null>(null);

const handleLogin = async () => {
	errorMessage.value = '';
	try {
		await authStore.login(<User_login>{
			name: userLogin.value,
			pwd: userPwd.value,
		});

		router.push('/');
	} catch (error: unknown) {
		console.log("error:",error)
		errorMessage.value = errorText(error);
	}
};

onMounted(() => {
	loginInput.value?.focus();
});
</script>
