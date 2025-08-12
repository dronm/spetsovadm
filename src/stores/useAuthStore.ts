import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

import { type Auth } from '@/models/auth';
import {
	type User_login_tel,
	type User_login_email,
	type User_login,
	type User_register,
	type UserLogin,
} from '@/models/user';
import {
	userLoginEmail,
	userLoginTel,
	userLogin,
	type UserLoginResult,
	type UserLoginNotification,
	userRegister,
	userLogout,
} from '@/services/user';
import { errorText } from '@/utils/errorText';
import { SEND_LOGIN_CODE_THROTLE_SEC } from '@/config/constants';

export interface AuthProcess {
	login?: string;
	isTel?: boolean;
	checked?: boolean;
	codeType?: UserLoginNotification;
	verifTimer?: ReturnType<typeof setInterval> | null;
	countdown?: number;
}

export const useAuthStore = defineStore('auth', () => {
	let authStruct = null;
	let userStruct = null;

	// const tokenToHeader = (token: string) => {
	// 	srvConn.defaultHTTPHeaders['Authorization'] =
	// 		`Bearer ${token}`;
	// }

	const authStored = localStorage.getItem('auth');
	if (authStored) {
		authStruct = JSON.parse(authStored) as Auth;
	}

	const userStored = localStorage.getItem('user');
	if (userStored) {
		userStruct = JSON.parse(userStored) as UserLogin;
	}

	const auth = ref<Auth | null>(authStruct);
	const user = ref<UserLogin | null>(userStruct);
	// if(auth.value?.token) {
	// 	tokenToHeader(auth.value?.token);
	// }

	//authentication state
	const authProcess = reactive<AuthProcess>({
		countdown: 0,
	});

	const isAuthenticated = (): boolean => {
		return !!auth.value?.token;
	};

	const loginTel = async (credentials: User_login_tel): Promise<void> => {
		try {
			const response: UserLoginResult =
				await userLoginTel.func(credentials);
			setUserLogged(response);
		} catch (error: unknown) {
			// throw new Error(t("AuthStore.errLogin", {ERROR: }));
			const msg = errorText(error);
			throw new Error(msg);
		}
	};

	const loginEmail = async (credentials: User_login_email): Promise<void> => {
		try {
			const response: UserLoginResult =
				await userLoginEmail.func(credentials);
			setUserLogged(response);
		} catch (error: unknown) {
			// throw new Error(t("AuthStore.errLogin", {ERROR: }));
			const msg = errorText(error);
			throw new Error(msg);
		}
	};

	const login = async (credentials: User_login): Promise<void> => {
		try {
			const response: UserLoginResult = await userLogin.func(credentials);
			setUserLogged(response);
		} catch (error: unknown) {
			// throw new Error(t("AuthStore.errLogin", {ERROR: }));
			const msg = errorText(error);
			throw new Error(msg);
		}
	};

	const register = async (userInfo: User_register): Promise<void> => {
		try {
			const response: UserLoginResult = await userRegister.func(userInfo);
			setUserLogged(response);
		} catch (error) {
			// throw new Error(t("AuthStore.errRegister"));
			const msg = errorText(error);
			throw new Error(msg);
		}
	};

	//call on 401 error code
	const setUserUnlogged = () => {
		auth.value = null;
		user.value = null;
		localStorage.removeItem('auth');
		localStorage.removeItem('user');
		// delete srvConn.defaultHTTPHeaders['Authorization'];
	};

	const logout = async (): Promise<void> => {
		await userLogout.func(); //server logout
		setUserUnlogged();
	};

	//private function
	const setUserLogged = (srvResp: UserLoginResult) => {
		auth.value = srvResp.auth;
		user.value = srvResp.user;

		localStorage.setItem('auth', JSON.stringify(srvResp.auth));
		localStorage.setItem('user', JSON.stringify(srvResp.user));
		// tokenToHeader(auth.value?.token);
		resetProcess();
	};

	const resetProcess = () => {
		// authProcess.login = undefined;
		// authProcess.isTel = undefined;
		// authProcess.codeType = undefined;
		authProcess.checked = undefined;
		resetVerifTimer();
	};

	const startVerifTimer = (seconds: number | undefined) => {
		stopVerifTimer(); // Make sure no previous timer is running
		authProcess.countdown = seconds ? seconds : SEND_LOGIN_CODE_THROTLE_SEC;
		authProcess.verifTimer = setInterval(() => {
			if (authProcess.countdown! > 0) {
				authProcess.countdown!--;
			} else {
				stopVerifTimer();
			}
		}, 1000);
	};

	const stopVerifTimer = () => {
		if (authProcess.verifTimer) {
			clearInterval(authProcess.verifTimer);
			authProcess.verifTimer = null;
		}
	};

	const resetVerifTimer = () => {
		stopVerifTimer();
		authProcess.countdown = undefined;
	};

	return {
		auth,
		user,
		authProcess,
		isAuthenticated,
		loginEmail,
		login,
		loginTel,
		logout,
		register,
		setUserUnlogged,
		startVerifTimer,
		stopVerifTimer,
		resetVerifTimer,
		resetProcess,
	};
});
