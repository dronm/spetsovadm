import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	STORE_LIST,
	STORE_DETAIL,
	STORE_ADD,
	STORE_DEL,
	STORE_UPD,
	STORE_PUBLIC_LIST,
} from '../config/constants';
import type {
	Store,
	StoreKey,
	StoreUpdate,
	StoreNew,
} from '../models/store.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface StoreCollection {
	data: Store[];
	agg: CollectionTotCount;
}
export const storeList: APICall = {
	id: 'storeList',
	func: async (params?: CollectionParams): Promise<StoreCollection> => {
		const data = await srvConn.get(STORE_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const storeDetail: APICall = {
	id: 'storeDetail',
	func: async (keys: StoreKey): Promise<Store> => {
		const data = await srvConn.get(
			STORE_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const storeAdd: APICall = {
	id: 'storeAdd',
	func: async (store: Store): Promise<StoreKey> => {
		return await srvConn.post(STORE_ADD, store);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const storeUpdate: APICall = {
	id: 'StoreUpdate',
	func: async (
		key: StoreKey,
		store: StoreNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(STORE_UPD, <StoreUpdate>{
			keys: key,
			model: store,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const storeDel: APICall = {
	id: 'storeDel',
	func: async (key: StoreKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(STORE_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};

//******************************************************
export const storePublicList: APICall = {
	id: 'storePublicList',
	func: async (): Promise<StoreCollection> => {
		const data = await srvConn.get(STORE_PUBLIC_LIST);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
