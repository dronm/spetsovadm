<template>
	<div class="flex justify-center gap-2.5">
		<!-- likes -->
		<ButtonLike
			:quantity="totalLikes"
			:title="$t('Header.HeadMenu.Likes.title')"
			@click="showLikes = true"
		>
		</ButtonLike>

		<ButtonCart :quantity="totalProductsAddedToCart"> </ButtonCart>

		<!-- user login -->
		<button
			id="login"
			v-if="!authed"
			:title="$t('Header.HeadMenu.UserLogin.title')"
			class="btn-badge"
			@click="showUserLogin = true"
		>
			<font-awesome-icon :icon="['fas', 'user']" />
		</button>
	</div>

	<!-- modals -->

	<!-- likes  -->
	<Teleport to="body">
		<modal
			:show="showLikes"
			dialogWidth="80%"
			borderRadius="5px"
			@close="showLikes = false"
		>
			<template #body>
				<Likes />
			</template>
		</modal>
	</Teleport>

	<!-- user login -->
	<Teleport to="body" v-if="showUserLogin">
		<modal
			@close="showUserLogin = false"
			dialogWidth="30%"
			borderRadius="5px"
		>
			<template #body>
				<UserLogin
					:userName="newUserLogin ?? ''"
					@closeModal="showUserLogin = false"
					@register="registerNewUser"
				>
				</UserLogin>
			</template>
		</modal>
	</Teleport>

	<!-- user register -->
	<Teleport to="body" v-if="showUserRegister">
		<modal
			@close="showUserRegister = false"
			dialogWidth="30%"
			borderRadius="5px"
		>
			<template #body>
				<UserRegister
					:userEmail="newUserLoginIsTel ? '' : (newUserLogin ?? '')"
					:userTel="newUserLoginIsTel ? (newUserLogin ?? '') : ''"
					@login="loginUser"
					@closeModal="showUserRegister = false"
				>
				</UserRegister>
			</template>
		</modal>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import Modal from '@lib/components/Modal.vue';

import UserLogin from '@/components/UserLogin.vue';
import UserRegister from '@/components/UserRegister.vue';
import Likes from '@/components/Likes.vue';
import ButtonCart from '@/components/ButtonCart.vue';
import ButtonLike from '@/components/ButtonLike.vue';
import { useLikeStore } from '@/stores/useLikeStore';
import { useCartsStore } from '@/stores/useCartsStore';
import { useAuthStore } from '@/stores/useAuthStore';

const { t } = useI18n();
const likeStore = useLikeStore();
const cartsStore = useCartsStore();

const authStore = useAuthStore();
const authed = computed(() => authStore.isAuthenticated());

const { totalLikes } = storeToRefs(likeStore);
const { totalProductsAddedToCart } = storeToRefs(cartsStore);

const showUserLogin = ref(false);
const newUserLogin = ref<string | undefined>(undefined); //tel or email
const newUserLoginIsTel = ref<boolean | undefined>(undefined);
const showUserRegister = ref(false);

const showLikes = ref(false);

const registerNewUser = (userLogin: string, loginIsTel: boolean) => {
	showUserLogin.value = false;
	newUserLogin.value = userLogin;
	newUserLoginIsTel.value = loginIsTel;
	showUserRegister.value = true;
};

const loginUser = (userLogin: string) => {
	showUserRegister.value = false;
	showUserLogin.value = true;
	newUserLogin.value = userLogin;
};
</script>
