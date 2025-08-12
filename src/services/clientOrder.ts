import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import { CLIENT_ORDER_LIST } from '@/config/clientOrder';
import type { ClientOrder } from '../models/clientOrder.ts';
import { transformJSON } from '../lib/services/transformJSON';

export interface ClientOrderCollection {
	data: ClientOrder[];
	agg: CollectionTotCount;
}
export const clientOrderList: APICall = {
	id: 'ClientOrderList',
	func: async (params?: CollectionParams): Promise<ClientOrderCollection> => {
		const data = await srvConn.get(CLIENT_ORDER_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
