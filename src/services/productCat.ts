import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PRODUCT_CAT_LIST,
	PRODUCT_CAT_HIERARCHY,
	PRODUCT_CAT_DETAIL,
	PRODUCT_CAT_ADD,
	PRODUCT_CAT_DEL,
	PRODUCT_CAT_UPD,
	PRODUCT_CAT_POP_LIST,
	PRODUCT_CAT_PUBLIC_LIST,
	PRODUCT_CAT_PUBLIC_DETAIL,
	PRODUCT_CAT_UPLOAD_PICTURE,
} from '../config/constants';
import type {
	ProductCat,
	ProductCatKey,
	ProductCatUpdate,
	ProductCatPublicList,
	ProductCatDetail,
	ProductCatList,
	ProductCatNew,
} from '../models/productCat.ts';
import { type ProductCatHierarchy } from '../models/productCatHierarchy';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ProductCatCollection {
	data: ProductCatList[];
	agg: CollectionTotCount;
}

export const productCatList: APICall = {
	id: 'ProductCatList',
	func: async (params?: CollectionParams): Promise<ProductCatCollection> => {
		const data = await srvConn.get(PRODUCT_CAT_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: ProductCatKey): Promise<ProductCatDetail> => {
		const data = await srvConn.get(
			PRODUCT_CAT_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatAdd: APICall = {
	id: 'ProductCatAdd',
	func: async (productCat: ProductCat): Promise<ProductCatKey> => {
		return await srvConn.post(PRODUCT_CAT_ADD, productCat);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatUpdate: APICall = {
	id: 'ProductCatUpdate',
	func: async (
		key: ProductCatKey,
		productCat: ProductCatNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_CAT_UPD, <ProductCatUpdate>{
			keys: key,
			model: productCat,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatDel: APICall = {
	id: 'ProductCatDel',
	func: async (key: ProductCatKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCT_CAT_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};

//********************************************
//
//no aggregation
export const productCatPopList: APICall = {
	id: 'ProductCatPopList',
	func: async (): Promise<ProductCatPublicList[]> => {
		const data = await srvConn.get(PRODUCT_CAT_POP_LIST);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

//no aggregation
export const productCatPublicList: APICall = {
	id: 'ProductCatPublicList',
	func: async (): Promise<ProductCatPublicList[]> => {
		const data = await srvConn.get(PRODUCT_CAT_PUBLIC_LIST);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

//no aggregation, one element
export const productCatPublicDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (nameLat: string): Promise<ProductCatPublicList> => {
		const data = await srvConn.get(
			PRODUCT_CAT_PUBLIC_DETAIL.replace('{{CAT_NAME_LAT}}', nameLat),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatUploadPicture: APICall = {
	id: 'ProductCatUploadPicture',
	func: async (formData: FormData): Promise<void> => {
		return await srvConn.postForm(PRODUCT_CAT_UPLOAD_PICTURE, formData);
	},
	cachePolicy: CachePolicies.NoCache,
};

//
export interface ProductCatHierarchyCollection {
	data: ProductCatHierarchy[];
	agg: CollectionTotCount;
}

export const productCatHierarchy: APICall = {
	id: 'ProductCatHierarchy',
	func: async (
		params?: CollectionParams,
	): Promise<ProductCatHierarchyCollection> => {
		const data = await srvConn.get(PRODUCT_CAT_HIERARCHY, {
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
//
