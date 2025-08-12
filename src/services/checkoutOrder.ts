import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	CHECKOUT_ORDER_LIST,
	CHECKOUT_ORDER_DETAIL,
	CHECKOUT_ORDER_ADD,
	CHECKOUT_ORDER_DEL,
	CHECKOUT_ORDER_UPD,
} from '../config/checkoutOrder';
import type {
	CheckoutOrder,
	CheckoutOrderKey,
	CheckoutOrderUpdate,
} from '../models/checkoutOrder.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface CheckoutOrderCollection {
	data: CheckoutOrder[];
	agg: CollectionTotCount;
}
export const checkoutOrderList: APICall = {
	id: 'checkoutOrderList',
	func: async (
		params?: CollectionParams,
	): Promise<CheckoutOrderCollection> => {
		const data = await srvConn.get(CHECKOUT_ORDER_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const checkoutOrderDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: CheckoutOrderKey): Promise<CheckoutOrder> => {
		const data = await srvConn.get(
			CHECKOUT_ORDER_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const checkoutOrderAdd: APICall = {
	id: 'checkoutOrderAdd',
	func: async (checkoutOrder: CheckoutOrder): Promise<CheckoutOrderKey> => {
		return await srvConn.post(CHECKOUT_ORDER_ADD, checkoutOrder);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const checkoutOrderUpdate: APICall = {
	id: 'checkoutOrderUpdate',
	func: async (
		key: CheckoutOrderKey,
		checkoutOrder: CheckoutOrder,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(CHECKOUT_ORDER_UPD, <CheckoutOrderUpdate>{
			keys: key,
			model: checkoutOrder,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const checkoutOrderDel: APICall = {
	id: 'checkoutOrderDel',
	func: async (key: CheckoutOrderKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(CHECKOUT_ORDER_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
