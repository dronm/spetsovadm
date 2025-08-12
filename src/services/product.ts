import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PROD_LIST,
	PROD_STOCK_LIST,
	PROD_PRICE_LIST,
	PROD_DETAIL,
	PROD_ADD,
	PROD_DEL,
	PROD_UPD,
	PROD_SEARCH,
	PROD_PUBLIC_LIST,
	PROD_PUBLIC_DETAIL,
	PROD_UPLOAD_PICTURE,
	PROD_POP,
	PROD_SET_PICTURE_MAIN,
	PROD_DEL_PICTURE,
	PROD_CAT_SEARCH,
} from '../config/constants';
import type {
	Product,
	ProductKey,
	ProductSearchResult,
	ProductUpdate,
	ProductPreview,
	ProductList,
	ProductPublicDetail,
} from '../models/product.ts';
import { type ProductStockList } from '@/models/productStockList';
import { type ProductPriceList } from '@/models/productPriceList';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';
import type { ProductCatPublicList } from '@/models/productCat';

export interface ProductCollection {
	data: Product[];
	agg: CollectionTotCount;
}

export interface ProductListCollection {
	data: ProductList[];
	agg: CollectionTotCount;
}

export const productSearchResultCollection: APICall = {
	id: 'ProductSearchResult',
	func: async (criteria: string): Promise<ProductSearchResult[]> =>
		await srvConn.get(`${PROD_SEARCH}/${criteria}`),
	cachePolicy: CachePolicies.NoCache,
};

export const productList: APICall = {
	id: 'productList',
	func: async (params?: CollectionParams): Promise<ProductListCollection> => {
		const data = await srvConn.get(PROD_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: ProductKey): Promise<Product> => {
		const data = await srvConn.get(
			PROD_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productAdd: APICall = {
	id: 'productAdd',
	func: async (product: Product): Promise<ProductKey> => {
		return await srvConn.post(PROD_ADD, product);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productUpdate: APICall = {
	id: 'productUpdate',
	func: async (
		key: ProductKey,
		product: Product,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROD_UPD, <ProductUpdate>{
			keys: key,
			model: product,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productDel: APICall = {
	id: 'productDel',
	func: async (key: ProductKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROD_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};

//*****************************************
export interface ProductPreviewRes {
	data: ProductPreview[];
	agg: CollectionTotCount;
}

export interface ProductCatPublicListRes {
	data: ProductCatPublicList[];
	agg: CollectionTotCount;
}

export interface ProductCatSearchRes {
	products: ProductPreviewRes;
	categories: ProductCatPublicListRes;
	search: string;
}

//with totals
export const productPublicList: APICall = {
	id: 'ProductPublicList',
	func: async (
		catId: number,
		params?: CollectionParams,
	): Promise<ProductPreviewRes> => {
		const data = await srvConn.get(PROD_PUBLIC_LIST, {
			cat: catId,
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

//simple structure, no aggregation
export const productPopList: APICall = {
	id: 'ProductPop',
	func: async (): Promise<ProductPreview[]> => {
		const data = await srvConn.get(PROD_POP);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

//simple structure, no aggregation
export const productPublicDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (prodNameLat: string): Promise<ProductPublicDetail> => {
		const data = await srvConn.get(
			PROD_PUBLIC_DETAIL.replace('{{PRODUCT_NAME_LAT}}', prodNameLat),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productUploadPicture: APICall = {
	id: 'ProductUploadPicture',
	func: async (formData: FormData): Promise<void> => {
		return await srvConn.postForm(PROD_UPLOAD_PICTURE, formData);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productSetPictureMain: APICall = {
	id: 'ProductSetPictureMain',
	func: async (
		key: ProductKey,
		pictRef1c: string,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROD_SET_PICTURE_MAIN, {
			keys: key,
			ref_1c: pictRef1c,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productDelPicture: APICall = {
	id: 'ProductDelPicture',
	func: async (
		key: ProductKey,
		pictRef1c: string,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PROD_DEL_PICTURE, {
			keys: key,
			ref_1c: pictRef1c,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const productCatSearch: APICall = {
	id: 'ProductCatSearch',
	func: async (
		search,
		params?: CollectionParams,
	): Promise<ProductCatSearchRes[]> => {
		const data = await srvConn.get(
			PROD_CAT_SEARCH.replace('{{SEARCH}}', search),
			{ params: params },
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
//
export interface ProductStockListCollection {
	data: ProductStockList[];
	agg: CollectionTotCount;
}

export const productStockList: APICall = {
	id: 'productStockList',
	func: async (
		params?: CollectionParams,
	): Promise<ProductStockListCollection> => {
		const data = await srvConn.get(PROD_STOCK_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export interface ProductPriceListCollection {
	data: ProductPriceList[];
	agg: CollectionTotCount;
}

export const productPriceList: APICall = {
	id: 'productPriceList',
	func: async (
		params?: CollectionParams,
	): Promise<ProductPriceListCollection> => {
		const data = await srvConn.get(PROD_PRICE_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
