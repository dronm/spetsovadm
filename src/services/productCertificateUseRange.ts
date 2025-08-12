import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PROD_CERT_USE_RANGE_LIST,
	PROD_CERT_USE_RANGE_DETAIL,
	PROD_CERT_USE_RANGE_ADD,
	PROD_CERT_USE_RANGE_DEL,
	PROD_CERT_USE_RANGE_UPD,
} from '../config/constants';
import type {
	ProductCertificateUseRange,
	ProductCertificateUseRangeKey,
	ProductCertificateUseRangeUpdate,
	ProductCertificateUseRangeNew,
} from '../models/productCertificateUseRange.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ProductCertificateUseRangeCollection {
	data: ProductCertificateUseRange[];
	agg: CollectionTotCount;
}
export const productCertificateUseRangeList: APICall = {
	id: 'ProductCertificateUseRangeList',
	func: async (
		params?: CollectionParams,
	): Promise<ProductCertificateUseRangeCollection> => {
		const data = await srvConn.get(PROD_CERT_USE_RANGE_LIST, {
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCertificateUseRangeDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (
		keys: ProductCertificateUseRangeKey,
	): Promise<ProductCertificateUseRange> => {
		let url = PROD_CERT_USE_RANGE_DETAIL.replace(
			'{{PROD_ID}}',
			keys.product_id.toString(),
		);
		url = url.replace('{{CAT_ID}}', keys.product_cat_id.toString());
		const data = await srvConn.get(url);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCertificateUseRangeAdd: APICall = {
	id: 'ProductCertificateUseRangeAdd',
	func: async (
		productCertificateUseRange: ProductCertificateUseRange,
	): Promise<ProductCertificateUseRangeKey> => {
		return await srvConn.post(
			PROD_CERT_USE_RANGE_ADD,
			productCertificateUseRange,
		);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCertificateUseRangeUpdate: APICall = {
	id: 'ProductCertificateUseRangeUpdate',
	func: async (
		key: ProductCertificateUseRangeKey,
		productCertificateUseRange: ProductCertificateUseRangeNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROD_CERT_USE_RANGE_UPD, <
			ProductCertificateUseRangeUpdate
		>{
			keys: key,
			model: productCertificateUseRange,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCertificateUseRangeDel: APICall = {
	id: 'ProductCertificateUseRangeDel',
	func: async (
		key: ProductCertificateUseRangeKey,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROD_CERT_USE_RANGE_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
