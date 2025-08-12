import type { Ref } from '@/lib/types/ref';

export interface LoginList {
	id: number;
	date_time_in: Date;
	date_time_out: Date | null;
	user_id: number;
	users_ref: Ref;
	set_date_time: Date;
	user_agent_descr: string;
}

export interface LoginDetail {
	id: number;
	date_time_in: Date;
	date_time_out: Date | null;
	ip: string;
	session_id: string;
	user_id: number;
	users_ref: Ref;
	pub_key: string;
	set_date_time: Date;
	user_agent_descr: string;
	user_agent: string;
	headers: string;
}

//key model for update, delete
export interface LoginKey {
	id: number;
}
