import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PROM_ACTION_LIST,
	PROM_ACTION_DETAIL,
	PROM_ACTION_ADD,
	PROM_ACTION_DEL,
	PROM_ACTION_UPD,
} from '../config/promAction';
import type {
	PromAction,
	PromActionKey,
	PromActionUpdate,
	PromActionNew,
} from '../models/promAction.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface PromActionCollection {
	data: PromAction[];
	agg: CollectionTotCount;
}
export const promActionList: APICall = {
	id: 'promActionList',
	func: async (params?: CollectionParams): Promise<PromActionCollection> => {
		const data = await srvConn.get(PROM_ACTION_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promActionDetail: APICall = {
	id: 'promActionDetail',
	func: async (keys: PromActionKey): Promise<PromAction> => {
		const data = await srvConn.get(
			PROM_ACTION_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promActionAdd: APICall = {
	id: 'promActionAdd',
	func: async (promAction: PromAction): Promise<PromActionKey> => {
		return await srvConn.post(PROM_ACTION_ADD, promAction);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promActionUpdate: APICall = {
	id: 'PromActionUpdate',
	func: async (
		key: PromActionKey,
		promAction: PromActionNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROM_ACTION_UPD, <PromActionUpdate>{
			keys: key,
			model: promAction,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promActionDel: APICall = {
	id: 'promActionDel',
	func: async (key: PromActionKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROM_ACTION_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
