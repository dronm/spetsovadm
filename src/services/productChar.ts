import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PRODUCT_CHAR_LIST,
	PRODUCT_CHAR_DETAIL,
	PRODUCT_CHAR_ADD,
	PRODUCT_CHAR_DEL,
	PRODUCT_CHAR_UPD,
} from '../config/constants';
import type {
	ProductChar,
	ProductCharKey,
	ProductCharUpdate,
	ProductCharNew,
} from '../models/productChar.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ProductCharCollection {
	data: ProductChar[];
	agg: CollectionTotCount;
}
export const productCharList: APICall = {
	id: 'ProductCharList',
	func: async (params?: CollectionParams): Promise<ProductCharCollection> => {
		const data = await srvConn.get(PRODUCT_CHAR_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCharDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: ProductCharKey): Promise<ProductChar> => {
		const data = await srvConn.get(
			PRODUCT_CHAR_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCharAdd: APICall = {
	id: 'ProductCharAdd',
	func: async (productChar: ProductChar): Promise<ProductCharKey> => {
		return await srvConn.post(PRODUCT_CHAR_ADD, productChar);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCharUpdate: APICall = {
	id: 'ProductCharUpdate',
	func: async (
		key: ProductCharKey,
		productChar: ProductCharNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_CHAR_UPD, <ProductCharUpdate>{
			keys: key,
			model: productChar,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCharDel: APICall = {
	id: 'ProductCharDel',
	func: async (key: ProductCharKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_CHAR_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
