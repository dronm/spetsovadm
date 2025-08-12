import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	SUPPLIER_LIST,
	SUPPLIER_DETAIL,
	SUPPLIER_ADD,
	SUPPLIER_DEL,
	SUPPLIER_UPD,
} from '@/config/supplier';
import type {
	Supplier,
	SupplierKey,
	SupplierUpdate,
	SupplierNew,
	SupplierDetail,
} from '../models/supplier.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface SupplierCollection {
	data: Supplier[];
	agg: CollectionTotCount;
}
export const supplierList: APICall = {
	id: 'SupplierList',
	func: async (params?: CollectionParams): Promise<SupplierCollection> => {
		const data = await srvConn.get(SUPPLIER_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const supplierDetail: APICall = {
	id: 'supplierDetail',
	func: async (keys: SupplierKey): Promise<SupplierDetail> => {
		const data = await srvConn.get(
			SUPPLIER_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const supplierAdd: APICall = {
	id: 'SupplierAdd',
	func: async (supplier: Supplier): Promise<SupplierKey> => {
		return await srvConn.post(SUPPLIER_ADD, supplier);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const supplierUpdate: APICall = {
	id: 'SupplierUpdate',
	func: async (
		key: SupplierKey,
		supplier: SupplierNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(SUPPLIER_UPD, <SupplierUpdate>{
			keys: key,
			model: supplier,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const supplierDel: APICall = {
	id: 'SupplierDel',
	func: async (key: SupplierKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(SUPPLIER_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
