import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PROD_CERT_LIST,
	PROD_CERT_DETAIL,
	PROD_CERT_ADD,
	PROD_CERT_DEL,
	PROD_CERT_UPD,
} from '@/config/constants';
import type {
	ProductCertificate,
	ProductCertificateKey,
	ProductCertificateUpdate,
	ProductCertificateNew,
} from '../models/productCertificate.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ProductCertificateCollection {
	data: ProductCertificate[];
	agg: CollectionTotCount;
}
export const productCertificateList: APICall = {
	id: 'ProductCertificateList',
	func: async (
		params?: CollectionParams,
	): Promise<ProductCertificateCollection> => {
		const data = await srvConn.get(PROD_CERT_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCertificateDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: ProductCertificateKey): Promise<ProductCertificate> => {
		const data = await srvConn.get(
			PROD_CERT_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCertificateAdd: APICall = {
	id: 'ProductCertificateAdd',
	func: async (
		productCertificate: ProductCertificate,
	): Promise<ProductCertificateKey> => {
		return await srvConn.post(PROD_CERT_ADD, productCertificate);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCertificateUpdate: APICall = {
	id: 'ProductCertificateUpdate',
	func: async (
		key: ProductCertificateKey,
		productCertificate: ProductCertificateNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROD_CERT_UPD, <ProductCertificateUpdate>{
			keys: key,
			model: productCertificate,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCertificateDel: APICall = {
	id: 'ProductCertificateDel',
	func: async (
		key: ProductCertificateKey,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROD_CERT_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
