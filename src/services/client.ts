import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	CLIENT_LIST,
	CLIENT_DETAIL,
	CLIENT_ADD,
	CLIENT_DEL,
	CLIENT_UPD,
	CLIENT_FIND_BY_INN,
} from '@/config/client';
import type {
	Client,
	ClientKey,
	ClientUpdate,
	ClientNew,
	ClientDetail,
} from '../models/client.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ClientCollection {
	data: Client[];
	agg: CollectionTotCount;
}
export const clientList: APICall = {
	id: 'ClientList',
	func: async (params?: CollectionParams): Promise<ClientCollection> => {
		const data = await srvConn.get(CLIENT_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const clientDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: ClientKey): Promise<Client> => {
		const data = await srvConn.get(
			CLIENT_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const clientAdd: APICall = {
	id: 'ClientAdd',
	func: async (client: Client): Promise<ClientKey> => {
		return await srvConn.post(CLIENT_ADD, client);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const clientUpdate: APICall = {
	id: 'ClientUpdate',
	func: async (
		key: ClientKey,
		client: ClientNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(CLIENT_UPD, <ClientUpdate>{
			keys: key,
			model: client,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const clientDel: APICall = {
	id: 'ClientDel',
	func: async (key: ClientKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(CLIENT_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const clientByInn: APICall = {
	id: 'ClientByInn',
	func: async (inn: string): Promise<ClientDetail> => {
		const data = await srvConn.get(
			CLIENT_FIND_BY_INN.replace('{{INN}}', inn),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.Local,
};
