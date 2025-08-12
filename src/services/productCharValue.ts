import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PRODUCT_CHAR_VALUE_LIST,
	PRODUCT_CHAR_VALUE_DETAIL,
	PRODUCT_CHAR_VALUE_ADD,
	PRODUCT_CHAR_VALUE_DEL,
	PRODUCT_CHAR_VALUE_UPD,
} from '../config/constants';
import type {
	ProductCharValue,
	ProductCharValueKey,
	ProductCharValueUpdate,
	ProductCharValueNew,
} from '../models/productCharValue.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ProductCharValueCollection {
	data: ProductCharValue[];
	agg: CollectionTotCount;
}
export const productCharValueList: APICall = {
	id: 'ProductCharValueList',
	func: async (
		params?: CollectionParams,
	): Promise<ProductCharValueCollection> => {
		const data = await srvConn.get(PRODUCT_CHAR_VALUE_LIST, {
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCharValueDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: ProductCharValueKey): Promise<ProductCharValue> => {
		const data = await srvConn.get(
			PRODUCT_CHAR_VALUE_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCharValueAdd: APICall = {
	id: 'ProductCharValueAdd',
	func: async (
		productCharValue: ProductCharValue,
	): Promise<ProductCharValueKey> => {
		return await srvConn.post(PRODUCT_CHAR_VALUE_ADD, productCharValue);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCharValueUpdate: APICall = {
	id: 'ProductCharValueUpdate',
	func: async (
		key: ProductCharValueKey,
		productCharValue: ProductCharValueNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_CHAR_VALUE_UPD, <
			ProductCharValueUpdate
		>{
			keys: key,
			model: productCharValue,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCharValueDel: APICall = {
	id: 'ProductCharValueDel',
	func: async (key: ProductCharValueKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_CHAR_VALUE_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
