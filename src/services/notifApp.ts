import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import { NOTIF_APP_DETAIL, NOTIF_APP_UPD } from '@/config/notifApp';
import type {
	NotifApp,
	NotifAppKey,
	NotifAppUpdate,
	NotifAppNew,
} from '../models/notifApp.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface NotifAppCollection {
	data: NotifApp[];
	agg: CollectionTotCount;
}

export const notifAppDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (): Promise<NotifApp> => {
		const data = await srvConn.get(NOTIF_APP_DETAIL);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const notifAppUpdate: APICall = {
	id: 'NotifAppUpdate',
	func: async (notifApp: NotifAppNew): Promise<CollectionAlterResult> => {
		return await srvConn.post(NOTIF_APP_UPD, <NotifAppUpdate>{
			model: notifApp,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};
