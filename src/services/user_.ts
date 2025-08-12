import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '@/lib/types/collection';
import { type CollectionAlterResult } from '@/lib/services/types';
import { transformJSON } from '@/lib/services/transformJSON';

import srvConn from './srvConn';
import {
	USER_LIST,
	USER_DETAIL,
	USER_ADD,
	USER_DEL,
	USER_UPD,
} from '@/config/user';
import type {
	User,
	UserKey,
	UserUpdate,
	UserNew,
} from '@/models/user';

export interface UserListCollection {
	data: UserModelList[];
	agg: CollectionTotCount;
}

export const userList: APICall = {
	id: 'UserList',
	func: async (params?: CollectionParams): Promise<UserListCollection> => {
		const data = await srvConn.get(USER_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
export const UserDetail: APICall = {
	id: 'UserDetail',
	func: async (keys: UserKey): Promise<_DETAIL.replace('', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
export const userAdd: APICall = {
	id: 'User',
	func: async (params: _ADD, params);
	},
	cachePolicy: CachePolicies.NoCache,
}; 
export const brandUpdate: APICall = {
	id: 'UserUpdate',
	func: async (
		key: UserKey,
		brand: UserNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(USER_UPD, <UserUpdate>{
			keys: key,
			model: brand,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};
export const userDel: APICall = {
	id: 'UserDel',
	func: async (key: UserKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(USER_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
