import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '@/lib/types/collection';
import { transformJSON } from '@/lib/services/transformJSON';

import srvConn from './srvConn';
import { CONST_LIST, CONST_GET, CONST_SET } from '@/config/constant';
import type {
	Constant_set,
	ConstantList,
	ConstantValList,
} from '@/models/constant.ts';

export interface ConstantCollection {
	data: ConstantList[];
	agg: CollectionTotCount;
}
export const constantList: APICall = {
	id: 'ConstantList',
	func: async (params?: CollectionParams): Promise<ConstantCollection> => {
		const data = await srvConn.get(CONST_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const constantGet: APICall = {
	id: 'ConstantGet',
	func: async (idList: string[]): Promise<ConstantValList> => {
		const data = await srvConn.get(CONST_GET, { ids: idList });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const constantSet: APICall = {
	id: 'ConstantSet',
	func: async (id: string, constVal: string): Promise<void> => {
		const data = await srvConn.post(CONST_SET.replace('{{ID}}', id), <
			Constant_set
		>{ val: constVal });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
