import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PROM_POINT_LIST,
	PROM_POINT_DETAIL,
	PROM_POINT_ADD,
	PROM_POINT_DEL,
	PROM_POINT_UPD,
} from '../config/promPoint';
import type {
	PromPoint,
	PromPointKey,
	PromPointUpdate,
	PromPointNew,
} from '../models/promPoint.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface PromPointCollection {
	data: PromPoint[];
	agg: CollectionTotCount;
}
export const promPointList: APICall = {
	id: 'promPointList',
	func: async (params?: CollectionParams): Promise<PromPointCollection> => {
		const data = await srvConn.get(PROM_POINT_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promPointDetail: APICall = {
	id: 'promPointDetail',
	func: async (keys: PromPointKey): Promise<PromPoint> => {
		const data = await srvConn.get(
			PROM_POINT_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promPointAdd: APICall = {
	id: 'promPointAdd',
	func: async (promPoint: PromPoint): Promise<PromPointKey> => {
		return await srvConn.post(PROM_POINT_ADD, promPoint);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promPointUpdate: APICall = {
	id: 'PromPointUpdate',
	func: async (
		key: PromPointKey,
		promPoint: PromPointNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROM_POINT_UPD, <PromPointUpdate>{
			keys: key,
			model: promPoint,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const promPointDel: APICall = {
	id: 'promPointDel',
	func: async (key: PromPointKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROM_POINT_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
