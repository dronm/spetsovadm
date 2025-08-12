import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	TIME_ZONE_LOCALE_LIST,
	TIME_ZONE_LOCALE_DETAIL,
	TIME_ZONE_LOCALE_ADD,
	TIME_ZONE_LOCALE_DEL,
	TIME_ZONE_LOCALE_UPD,
} from '../config/constants';
import type {
	TimeZoneLocale,
	TimeZoneLocaleKey,
	TimeZoneLocaleUpdate,
	TimeZoneLocaleNew,
} from '../models/timeZoneLocale.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface TimeZoneLocaleCollection {
	data: TimeZoneLocale[];
	agg: CollectionTotCount;
}

export const timeZoneLocaleList: APICall = {
	id: 'timeZoneLocaleList',
	func: async (
		params?: CollectionParams,
	): Promise<TimeZoneLocaleCollection> => {
		const data = await srvConn.get(TIME_ZONE_LOCALE_LIST, {
			params: params,
		});
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const timeZoneLocaleDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: TimeZoneLocaleKey): Promise<TimeZoneLocale> => {
		const data = await srvConn.get(
			TIME_ZONE_LOCALE_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const timeZoneLocaleAdd: APICall = {
	id: 'timeZoneLocaleAdd',
	func: async (
		timeZoneLocale: TimeZoneLocale,
	): Promise<TimeZoneLocaleKey> => {
		return await srvConn.post(TIME_ZONE_LOCALE_ADD, timeZoneLocale);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const timeZoneLocaleUpdate: APICall = {
	id: 'TimeZoneLocaleUpdate',
	func: async (
		key: TimeZoneLocaleKey,
		timeZoneLocale: TimeZoneLocaleNew,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(TIME_ZONE_LOCALE_UPD, <TimeZoneLocaleUpdate>{
			keys: key,
			model: timeZoneLocale,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const timeZoneLocaleDel: APICall = {
	id: 'timeZoneLocaleDel',
	func: async (key: TimeZoneLocaleKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(TIME_ZONE_LOCALE_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
