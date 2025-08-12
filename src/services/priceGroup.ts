import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PRICE_GROUP_LIST,
	PRICE_GROUP_DETAIL,
	PRICE_GROUP_ADD,
	PRICE_GROUP_DEL,
	PRICE_GROUP_UPD,
} from '../config/constants';
import type {
	PriceGroup,
	PriceGroupKey,
	PriceGroupUpdate,
	PriceGroupNew,
} from '../models/priceGroup.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface PriceGroupCollection {
	data: PriceGroup[];
	agg: CollectionTotCount;
}
export const priceGroupList: APICall = {
	id: 'PriceGroupList',
	func: async (params?: CollectionParams): Promise<PriceGroupCollection> => {
		const data = await srvConn.get(PRICE_GROUP_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const priceGroupDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: PriceGroupKey): Promise<PriceGroup> => {
		const data = await srvConn.get(
			PRICE_GROUP_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const priceGroupAdd: APICall = {
	id: 'PriceGroupAdd',
	func: async (priceGroup: PriceGroup): Promise<PriceGroupKey> => {
		return await srvConn.post(PRICE_GROUP_ADD, priceGroup);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const priceGroupUpdate: APICall = {
	id: 'PriceGroupUpdate',
	func: async (
		key: PriceGroupKey,
		priceGroup: PriceGroupNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRICE_GROUP_UPD, <PriceGroupUpdate>{
			keys: key,
			model: priceGroup,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const priceGroupDel: APICall = {
	id: 'PriceGroupDel',
	func: async (key: PriceGroupKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRICE_GROUP_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
