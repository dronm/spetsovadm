import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import { CLIENT_CONTRACT_LIST } from '@/config/clientContract';
import type { ClientContract } from '../models/clientContract.ts';
import { transformJSON } from '../lib/services/transformJSON';

export interface ClientContractCollection {
	data: ClientContract[];
	agg: CollectionTotCount;
}
export const clientContractList: APICall = {
	id: 'ClientContractList',
	func: async (
		params?: CollectionParams,
	): Promise<ClientContractCollection> => {
		const data = await srvConn.get(CLIENT_CONTRACT_LIST, {
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
