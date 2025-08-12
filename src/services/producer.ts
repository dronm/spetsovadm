import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	PRODUCER_LIST,
	PRODUCER_DETAIL,
	PRODUCER_ADD,
	PRODUCER_DEL,
	PRODUCER_UPD,
} from '../config/constants';
import type {
	Producer,
	ProducerKey,
	ProducerUpdate,
	ProducerNew,
} from '../models/producer.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface ProducerCollection {
	data: Producer[];
	agg: CollectionTotCount;
}
export const producerList: APICall = {
	id: 'ProducerList',
	func: async (params?: CollectionParams): Promise<ProducerCollection> => {
		const data = await srvConn.get(PRODUCER_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const producerDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: ProducerKey): Promise<Producer> => {
		const data = await srvConn.get(
			PRODUCER_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const producerAdd: APICall = {
	id: 'ProducerAdd',
	func: async (producer: Producer): Promise<ProducerKey> => {
		return await srvConn.post(PRODUCER_ADD, producer);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const producerUpdate: APICall = {
	id: 'ProducerUpdate',
	func: async (
		key: ProducerKey,
		producer: ProducerNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCER_UPD, <ProducerUpdate>{
			keys: key,
			model: producer,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const producerDel: APICall = {
	id: 'ProducerDel',
	func: async (key: ProducerKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(PRODUCER_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
