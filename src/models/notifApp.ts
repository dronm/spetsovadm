export interface NotifTMParams {
	token: string;
}

export interface NotifWAParams {
	qr_code: string;
}

export interface NotifEmailParams {
	host: string;
	user: string;
	pwd: string;
}

export interface NotifSMSParams {
	sign: string;
	pwd: string;
	login: string;
	active: boolean;
}

export interface NotifProviderParams {
	tm: NotifTMParams;
	email: NotifEmailParams;
	wa: NotifWAParams;
	sms: NotifSMSParams;
}

// object model for insert/update
export interface NotifApp {
	id: number;
	name: string;
	provider_params: NotifProviderParams;
	callback_url: string;
	callback_key: string;
	pwd: string;
}

export interface NotifAppDetail extends NotifApp {}

//new data: insert, update
//validation?
export interface NotifAppNew {
	provider_params: NotifProviderParams;
	callback_url: string;
	callback_key: string;
	pwd: string;
}

//key model for update, delete
export interface NotifAppKey {
	id: number;
}

//update model
export interface NotifAppUpdate {
	model: NotifAppNew;
}

export type NotifAppDataType = 'notif_apps';
