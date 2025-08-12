import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import { CLIENT_PAY_LIST } from '@/config/clientPay';
import type { ClientPay } from '../models/clientPay.ts';
import { transformJSON } from '../lib/services/transformJSON';

export interface ClientPayCollection {
	data: ClientPay[];
	agg: CollectionTotCount;
}
export const clientPayList: APICall = {
	id: 'ClientPayList',
	func: async (params?: CollectionParams): Promise<ClientPayCollection> => {
		const data = await srvConn.get(CLIENT_PAY_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
