import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	LOGIN_DEVICE_USER_LIST,
	LOGIN_DEVICE_SET_BAN,
} from '../config/constants';
import type { LoginList } from '../models/login';
import { transformJSON } from '../lib/services/transformJSON';
import type { LoginDeviceSetBan } from '@/models/loginDevice';

export interface LoginDeviceCollection {
	data: LoginList[];
	agg: CollectionTotCount;
}

export const loginDeviceList: APICall = {
	id: 'LoginDeviceList',
	func: async (
		userId: number,
		params?: CollectionParams,
	): Promise<LoginDeviceCollection> => {
		console.log('loginDeviceList, userId:', userId, ',params:', params);
		const data = await srvConn.get(
			LOGIN_DEVICE_USER_LIST.replace('{{ID}}', userId.toString()),
			{ params: params },
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const loginDeviceSetBan: APICall = {
	id: 'LoginDeviceSetBan',
	func: async (params: LoginDeviceSetBan): Promise<void> => {
		return await srvConn.post(LOGIN_DEVICE_SET_BAN, params);
	},
	cachePolicy: CachePolicies.NoCache,
};
