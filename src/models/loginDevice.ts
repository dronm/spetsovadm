export interface LoginDeviceList {
	user_id: number;
	user_descr: string;
	date_time_in: Date | null;
	user_agent: string;
	banned: boolean;
	ban_hash: string;
}

//set_ban method
export interface LoginDeviceSetBan {
	user_id: number;
	device_hash: string;
	ban: boolean;
}
