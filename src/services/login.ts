import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import { LOGIN_LIST, LOGIN_DETAIL } from '../config/constants';
import type { LoginList, LoginKey } from '../models/login';
import { transformJSON } from '../lib/services/transformJSON';
import { type LoginDetail } from '../models/login';

export interface LoginCollection {
	data: LoginList[];
	agg: CollectionTotCount;
}
export const loginList: APICall = {
	id: 'LoginList',
	func: async (params?: CollectionParams): Promise<LoginCollection> => {
		const data = await srvConn.get(LOGIN_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const loginDetail: APICall = {
	id: 'LoginDetail',
	func: async (keys: LoginKey): Promise<LoginDetail> => {
		const data = await srvConn.get(
			LOGIN_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
