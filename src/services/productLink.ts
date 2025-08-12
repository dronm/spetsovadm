import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '@/lib/types/collection';
import { type CollectionAlterResult } from '@/lib/services/types';
import { transformJSON } from '@/lib/services/transformJSON';

import srvConn from './srvConn';
import {
	PRODUCT_LINK_LIST,
	PRODUCT_LINK_DETAIL,
	PRODUCT_LINK_ADD,
	PRODUCT_LINK_DEL,
	PRODUCT_LINK_UPD,
} from '@/config/productLink';
import type {
	ProductLink,
	ProductLinkList,
	ProductLinkKey,
	ProductLinkUpdate,
	ProductLinkNew,
} from '@/models/productLink';

export interface ProductLinkListCollection {
	data: ProductLinkList[];
	agg: CollectionTotCount;
}

export const productLinkList: APICall = {
	id: 'ProductLinkList',
	func: async (
		params?: CollectionParams,
	): Promise<ProductLinkListCollection> => {
		const data = await srvConn.get(PRODUCT_LINK_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productLinkUpdate: APICall = {
	id: 'ProductLinkUpdate',
	func: async (
		key: ProductLinkKey,
		brand: ProductLinkNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_LINK_UPD, <ProductLinkUpdate>{
			keys: key,
			model: brand,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};
export const productLinkDel: APICall = {
	id: 'ProductLinkDel',
	func: async (key: ProductLinkKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_LINK_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productLinkDetail: APICall = {
	id: 'ProductLinkDetail',
	func: async (keys: ProductLinkKey): Promise<ProductLink> => {
		const data = await srvConn.get(
			PRODUCT_LINK_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productLinkAdd: APICall = {
	id: 'ProductLinkAdd',
	func: async (productLink: ProductLink): Promise<ProductLinkKey> => {
		return await srvConn.post(PRODUCT_LINK_ADD, productLink);
	},
	cachePolicy: CachePolicies.NoCache,
};
