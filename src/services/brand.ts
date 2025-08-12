import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	BRAND_LIST,
	BRAND_DETAIL,
	BRAND_ADD,
	BRAND_DEL,
	BRAND_UPD,
} from '@/config/brand';
import type {
	Brand,
	BrandKey,
	BrandUpdate,
	BrandNew,
} from '../models/brand.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface BrandCollection {
	data: Brand[];
	agg: CollectionTotCount;
}
export const brandList: APICall = {
	id: 'BrandList',
	func: async (params?: CollectionParams): Promise<BrandCollection> => {
		const data = await srvConn.get(BRAND_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const brandDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: BrandKey): Promise<Brand> => {
		const data = await srvConn.get(
			BRAND_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const brandAdd: APICall = {
	id: 'BrandAdd',
	func: async (brand: Brand): Promise<BrandKey> => {
		return await srvConn.post(BRAND_ADD, brand);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const brandUpdate: APICall = {
	id: 'BrandUpdate',
	func: async (
		key: BrandKey,
		brand: BrandNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(BRAND_UPD, <BrandUpdate>{
			keys: key,
			model: brand,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const brandDel: APICall = {
	id: 'BrandDel',
	func: async (key: BrandKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(BRAND_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
