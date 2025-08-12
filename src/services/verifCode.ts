import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	VERIF_CODE_LIST,
	VERIF_CODE_DETAIL,
	VERIF_CODE_ADD,
	VERIF_CODE_DEL,
	VERIF_CODE_UPD,
} from '@/config/verifCode';
import type {
	VerifCode,
	VerifCodeKey,
	VerifCodeUpdate,
	VerifCodeNew,
} from '../models/verifCode.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface VerifCodeCollection {
	data: VerifCode[];
	agg: CollectionTotCount;
}
export const verifCodeList: APICall = {
	id: 'VerifCodeList',
	func: async (params?: CollectionParams): Promise<VerifCodeCollection> => {
		const data = await srvConn.get(VERIF_CODE_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const verifCodeDetail: APICall = {
	id: 'verifCodeDetail',
	func: async (keys: VerifCodeKey): Promise<VerifCode> => {
		const data = await srvConn.get(
			VERIF_CODE_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const verifCodeAdd: APICall = {
	id: 'VerifCodeAdd',
	func: async (verifCode: VerifCode): Promise<VerifCodeKey> => {
		return await srvConn.post(VERIF_CODE_ADD, verifCode);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const verifCodeUpdate: APICall = {
	id: 'VerifCodeUpdate',
	func: async (
		key: VerifCodeKey,
		verifCode: VerifCodeNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(VERIF_CODE_UPD, <VerifCodeUpdate>{
			keys: key,
			model: verifCode,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const verifCodeDel: APICall = {
	id: 'VerifCodeDel',
	func: async (key: VerifCodeKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(VERIF_CODE_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
