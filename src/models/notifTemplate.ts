export interface NotifTemplate {
	id: number;
	notif_type: string;
	notif_provider: string;
	template: string;
	comment_text: string;
	fields?: NotifTemplateField[];
	provider_values?: NotifTemplateProviderValue[];
}

export interface NotifTemplateDetail {
	id: number;
	notif_type: string;
	notif_provider: string;
	template: string;
	comment_text: string;
	fields?: NotifTemplateField[];
	provider_values?: NotifTemplateProviderValue[];
}

export interface NotifTemplateList {
	id: number;
	notif_type: string;
	notif_provider: string;
	template: string;
}

//new data: insert, update
//validation?
export interface NotifTemplateNew {
	id?: number;
	notif_type: string;
	notif_provider: string;
	template: string;
	comment_text: string;
	fields: string;
	provider_values: string;
}

//key model for update, delete
export interface NotifTemplateKey {
	id: number;
}

//update model
export interface NotifTemplateUpdate {
	keys: NotifTemplateKey;
	model: NotifTemplateNew;
}

export type NotifTemplateDataType = 'notif_templates';

export interface NotifTemplateRef {
	keys: NotifTemplateKey;
	descr: string;
	dataType?: NotifTemplateDataType;
}

export interface NotifTemplateField {
	id: string;
}

export interface NotifTemplateProviderValue {
	id: string;
	val: string;
}
