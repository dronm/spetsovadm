import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PRODUCT_CAT_FILTER_LIST,
	PRODUCT_CAT_FILTER_DETAIL,
	PRODUCT_CAT_FILTER_ADD,
	PRODUCT_CAT_FILTER_DEL,
	PRODUCT_CAT_FILTER_UPD,
} from '@/config/productCatFilter';
import type {
	ProductCatFilter,
	ProductCatFilterKey,
	ProductCatFilterUpdate,
	ProductCatFilterNew,
} from '../models/productCatFilter.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ProductCatFilterCollection {
	data: ProductCatFilter[];
	agg: CollectionTotCount;
}
export const productCatFilterList: APICall = {
	id: 'ProductCatFilterList',
	func: async (
		params?: CollectionParams,
	): Promise<ProductCatFilterCollection> => {
		const data = await srvConn.get(PRODUCT_CAT_FILTER_LIST, {
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatFilterDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: ProductCatFilterKey): Promise<ProductCatFilter> => {
		const data = await srvConn.get(
			PRODUCT_CAT_FILTER_DETAIL.replace('{{REF_1C}}', keys.ref_1c),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatFilterAdd: APICall = {
	id: 'ProductCatFilterAdd',
	func: async (
		productCatFilter: ProductCatFilter,
	): Promise<ProductCatFilterKey> => {
		return await srvConn.post(PRODUCT_CAT_FILTER_ADD, productCatFilter);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatFilterUpdate: APICall = {
	id: 'ProductCatFilterUpdate',
	func: async (
		key: ProductCatFilterKey,
		productCatFilter: ProductCatFilterNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_CAT_FILTER_UPD, <
			ProductCatFilterUpdate
		>{
			keys: key,
			model: productCatFilter,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatFilterDel: APICall = {
	id: 'ProductCatFilterDel',
	func: async (key: ProductCatFilterKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_CAT_FILTER_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
