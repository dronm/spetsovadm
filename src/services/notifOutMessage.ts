import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	NOTIF_OUT_MESSAGE_DETAIL,
	NOTIF_OUT_MESSAGE_LIST,
} from '@/config/notifOutMessage';
import type {
	NotifOutMessage,
	NotifOutMessageKey,
} from '@/models/notifOutMessage';
import { transformJSON } from '../lib/services/transformJSON';

export interface NotifOutMessageCollection {
	data: NotifOutMessage[];
	agg: CollectionTotCount;
}

export const notifOutMessageDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: NotifOutMessageKey): Promise<NotifOutMessage> => {
		const data = await srvConn.get(
			NOTIF_OUT_MESSAGE_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const notifOutMessageList: APICall = {
	id: 'NotifOutMessageList',
	func: async (
		params?: CollectionParams,
	): Promise<NotifOutMessageCollection> => {
		const data = await srvConn.get(NOTIF_OUT_MESSAGE_LIST, {
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
