import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PROM_CODE_LIST,
	PROM_CODE_DETAIL,
	PROM_CODE_ADD,
	PROM_CODE_DEL,
	PROM_CODE_UPD,
} from '../config/promCode';
import type {
	PromCode,
	PromCodeKey,
	PromCodeUpdate,
	PromCodeNew,
} from '../models/promCode.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface PromCodeCollection {
	data: PromCode[];
	agg: CollectionTotCount;
}
export const promCodeList: APICall = {
	id: 'promCodeList',
	func: async (params?: CollectionParams): Promise<PromCodeCollection> => {
		const data = await srvConn.get(PROM_CODE_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promCodeDetail: APICall = {
	id: 'promCodeDetail',
	func: async (keys: PromCodeKey): Promise<PromCode> => {
		const data = await srvConn.get(
			PROM_CODE_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promCodeAdd: APICall = {
	id: 'promCodeAdd',
	func: async (promCode: PromCode): Promise<PromCodeKey> => {
		return await srvConn.post(PROM_CODE_ADD, promCode);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promCodeUpdate: APICall = {
	id: 'PromCodeUpdate',
	func: async (
		key: PromCodeKey,
		promCode: PromCodeNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROM_CODE_UPD, <PromCodeUpdate>{
			keys: key,
			model: promCode,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promCodeDel: APICall = {
	id: 'promCodeDel',
	func: async (key: PromCodeKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROM_CODE_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
