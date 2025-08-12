import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	USER_LOGIN_EMAIL,
	USER_LOGIN,
	USER_LOGIN_TEL,
	USER_LOGOUT,
	USER_CHECK_CRED,
	USER_REGISTER,
	USER_LIST,
	USER_DETAIL,
	USER_ADD,
	USER_DEL,
	USER_UPD,
	USER_UPD_PROFILE,
	USER_UPD_PWD,
	USER_PROFILE,
	USER_VERIFY_TEL,
	USER_SEND_TEL_CODE,
	USER_SEND_EMAIL_VERIF,
} from '../config/constants';
import type {
	User,
	UserKey,
	UserUpdate,
	User_login_email,
	User_login,
	User_login_tel,
	UserLogin,
	User_check_cred,
	User_register,
	UserProfile,
	User_send_tel_code,
	User_update_password,
	User_send_email_verif,
} from '../models/user';
import { type Auth } from '../models/auth';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface UserCollection {
	data: User[];
	agg: CollectionTotCount;
}
export const userList: APICall = {
	id: 'UserList',
	func: async (params?: CollectionParams): Promise<UserCollection> => {
		const data = await srvConn.get(USER_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userDetail: APICall = {
	id: 'UserDetail',
	func: async (keys: UserKey): Promise<User> => {
		const data = await srvConn.get(
			USER_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userAdd: APICall = {
	id: 'UserAdd',
	func: async (user: User): Promise<UserKey> => {
		return await srvConn.post(USER_ADD, user);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userUpdate: APICall = {
	id: 'UserUpdate',
	func: async (key: UserKey, user: User): Promise<CollectionAlterResult> => {
		return await srvConn.post(USER_UPD, <UserUpdate>{
			keys: key,
			model: user,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userDel: APICall = {
	id: 'UserDel',
	func: async (key: UserKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(USER_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};

export interface UserLoginResult {
	user: UserLogin;
	auth: Auth;
}

export interface UserLoginNotification {
	sms: boolean;
	tm: boolean;
	wa: boolean;
}

export interface UserSendTelCodeResult {
	notified: boolean;
	login_notification: UserLoginNotification;
	sec_left: number;
}

export interface UserCheckCredResult extends UserSendTelCodeResult {
	exists: boolean;
	is_enterprise: boolean;
	// notified: boolean;
	// login_notification: UserLoginNotification;
	// sec_left: number;
}

export const userLogin: APICall = {
	id: 'UserLogin',
	func: async (login: User_login): Promise<UserLoginResult> => {
		return await srvConn.post(USER_LOGIN, login);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userLoginEmail: APICall = {
	id: 'UserLoginEmail',
	func: async (login: User_login_email): Promise<UserLoginResult> => {
		return await srvConn.post(USER_LOGIN_EMAIL, login);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userLoginTel: APICall = {
	id: 'UserLoginTel',
	func: async (login: User_login_tel): Promise<UserLoginResult> => {
		return await srvConn.post(USER_LOGIN_TEL, login);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userLogout: APICall = {
	id: 'UserLogout',
	func: async (): Promise<void> => {
		return await srvConn.post(USER_LOGOUT);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userCheckCred: APICall = {
	id: 'UserCheckCred',
	func: async (login: User_check_cred): Promise<UserCheckCredResult> => {
		return await srvConn.post(USER_CHECK_CRED, login);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userVerifyTel: APICall = {
	id: 'UserVerifyTel',
	func: async (data: User_login_tel): Promise<void> => {
		await srvConn.post(USER_VERIFY_TEL, data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userSendTelCode: APICall = {
	id: 'userSendTelCode',
	func: async (data: User_send_tel_code): Promise<UserCheckCredResult> => {
		return await srvConn.post(USER_SEND_TEL_CODE, data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userRegister: APICall = {
	id: 'UserRegister',
	func: async (login: User_register): Promise<UserLoginResult> => {
		return await srvConn.post(USER_REGISTER, login);
	},
	cachePolicy: CachePolicies.NoCache,
};

//
export const userProfile: APICall = {
	id: 'UserProfile',
	func: async (): Promise<UserProfile> => {
		const data = await srvConn.get(USER_PROFILE);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userProfileUpdate: APICall = {
	id: 'userProfileUpdate',
	func: async (
		keys: UserKey,
		profile: UserProfile,
	): Promise<CollectionAlterResult> => {
		//discard keys
		return await srvConn.post(USER_UPD_PROFILE, profile);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userPasswordUpdate: APICall = {
	id: 'userPasswordUpdate',
	func: async (newPassword: string): Promise<void> => {
		return await srvConn.post(USER_UPD_PWD, <User_update_password>{
			pwd: newPassword,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const userSendEmailVerif: APICall = {
	id: 'userSendEmailVerif',
	func: async (emailStr: string): Promise<void> => {
		return await srvConn.post(USER_SEND_EMAIL_VERIF, <
			User_send_email_verif
		>{ email: emailStr });
	},
	cachePolicy: CachePolicies.NoCache,
};
