import type { Ref } from '@/lib/types/ref';
import type { ClientDetail } from './client';

export interface User {
	id: number;
	name: string;
}

//user.login_email
export interface User_login_email {
	email: string;
	pwd: string;
}

export interface User_login {
	name: string;
	pwd: string;
}

export interface User_login_tel {
	tel: string;
	code: string;
}

export interface User_send_tel_code {
	tel: string;
}

export interface User_send_email_verif {
	email: string;
}

//user.check_cred()
export interface User_check_cred {
	login: string;
}

//user structure from register
export interface User_register {
	name: string;
	email: string;
	tel: string;
	pwd: string;
	is_enterprise: boolean;
	send_action_inf: boolean;
}

//user structure from auth
export interface UserLogin {
	name: string;
	name_full: string;
	role_id: string;
	created_at: Date;
	pub_key: string;
	time_zone_locales_ref: Ref;
}

export interface UserDetail {
	id: number;
	name: string;
	name_full: string;
}

//new data: insert, update
//validation?
export interface UserNew {
	id?: number;
	name: string;
	name_full: string;
	is_enterprise: boolean;
}

//key model for update, delete
export interface UserKey {
	id: number;
}

//update model
export interface UserUpdate {
	keys: UserKey;
	model: UserNew;
}

export type UserDataType = 'users';

export interface UserRef {
	keys: UserKey;
	descr: string;
	dataType?: UserDataType;
}

export interface User_update_password {
	pwd: string;
}

export interface UserProfile {
	id: number;
	name: string;
	email?: string;
	tel?: string;
	tel_confirmed: boolean;
	email_confirmed: boolean;
	is_enterprise: boolean;
	send_action_inf: boolean;
	client?: ClientDetail;
}
