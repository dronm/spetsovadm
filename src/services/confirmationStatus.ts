import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	CONFIRMATION_STATUS_LIST,
	CONFIRMATION_STATUS_DETAIL,
	CONFIRMATION_STATUS_ADD,
	CONFIRMATION_STATUS_DEL,
	CONFIRMATION_STATUS_UPD,
} from '@/config/confirmationStatus';
import type {
	ConfirmationStatus,
	ConfirmationStatusKey,
	ConfirmationStatusUpdate,
	ConfirmationStatusNew,
} from '../models/confirmationStatus.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ConfirmationStatusCollection {
	data: ConfirmationStatus[];
	agg: CollectionTotCount;
}
export const confirmationStatusList: APICall = {
	id: 'ConfirmationStatusList',
	func: async (
		params?: CollectionParams,
	): Promise<ConfirmationStatusCollection> => {
		const data = await srvConn.get(CONFIRMATION_STATUS_LIST, {
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const confirmationStatusDetail: APICall = {
	id: 'confirmationStatusDetail',
	func: async (keys: ConfirmationStatusKey): Promise<ConfirmationStatus> => {
		const data = await srvConn.get(
			CONFIRMATION_STATUS_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const confirmationStatusAdd: APICall = {
	id: 'ConfirmationStatusAdd',
	func: async (
		confirmationStatus: ConfirmationStatus,
	): Promise<ConfirmationStatusKey> => {
		return await srvConn.post(CONFIRMATION_STATUS_ADD, confirmationStatus);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const confirmationStatusUpdate: APICall = {
	id: 'ConfirmationStatusUpdate',
	func: async (
		key: ConfirmationStatusKey,
		confirmationStatus: ConfirmationStatusNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(CONFIRMATION_STATUS_UPD, <
			ConfirmationStatusUpdate
		>{
			keys: key,
			model: confirmationStatus,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const confirmationStatusDel: APICall = {
	id: 'ConfirmationStatusDel',
	func: async (
		key: ConfirmationStatusKey,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(CONFIRMATION_STATUS_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
