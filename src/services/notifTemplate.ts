import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	NOTIF_TEMPLATE_LIST,
	NOTIF_TEMPLATE_DETAIL,
	NOTIF_TEMPLATE_ADD,
	NOTIF_TEMPLATE_DEL,
	NOTIF_TEMPLATE_UPD,
} from '@/config/notifTemplate';
import type {
	NotifTemplate,
	NotifTemplateList,
	NotifTemplateKey,
	NotifTemplateUpdate,
	NotifTemplateNew,
} from '../models/notifTemplate.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface NotifTemplateCollection {
	data: NotifTemplateList[];
	agg: CollectionTotCount;
}
export const notifTemplateList: APICall = {
	id: 'NotifTemplateList',
	func: async (
		params?: CollectionParams,
	): Promise<NotifTemplateCollection> => {
		const data = await srvConn.get(NOTIF_TEMPLATE_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const notifTemplateDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: NotifTemplateKey): Promise<NotifTemplate> => {
		const data = await srvConn.get(
			NOTIF_TEMPLATE_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const notifTemplateAdd: APICall = {
	id: 'NotifTemplateAdd',
	func: async (notifTemplate: NotifTemplate): Promise<NotifTemplateKey> => {
		return await srvConn.post(NOTIF_TEMPLATE_ADD, notifTemplate);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const notifTemplateUpdate: APICall = {
	id: 'NotifTemplateUpdate',
	func: async (
		key: NotifTemplateKey,
		notifTemplate: NotifTemplateNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(NOTIF_TEMPLATE_UPD, <NotifTemplateUpdate>{
			keys: key,
			model: notifTemplate,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const notifTemplateDel: APICall = {
	id: 'NotifTemplateDel',
	func: async (key: NotifTemplateKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(NOTIF_TEMPLATE_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
