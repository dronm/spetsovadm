export interface NotifMessageOut {
	id: number;
	app_id: number;
	providers: string[];
	message: string;
	message_type: string;
	status: number;
	callback: boolean;
	created_at: Date;
	closed: boolean;
}

export interface NotifMessageOutDetail extends NotifMessageOut {}

//key model for update, delete
export interface NotifMessageOutKey {
	id: number;
}
