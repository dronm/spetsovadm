import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	COUNTRY_LIST,
	COUNTRY_DETAIL,
	COUNTRY_ADD,
	COUNTRY_DEL,
	COUNTRY_UPD,
} from '../config/constants';
import type { Country, CountryKey, CountryUpdate } from '../models/country.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface CountryCollection {
	data: Country[];
	agg: CollectionTotCount;
}
export const countryList: APICall = {
	id: 'countryList',
	func: async (params?: CollectionParams): Promise<CountryCollection> => {
		const data = await srvConn.get(COUNTRY_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const countryDetail: APICall = {
	id: 'ProductPublicDetail',
	func: async (keys: CountryKey): Promise<Country> => {
		const data = await srvConn.get(
			COUNTRY_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const countryAdd: APICall = {
	id: 'countryAdd',
	func: async (country: Country): Promise<CountryKey> => {
		return await srvConn.post(COUNTRY_ADD, country);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const countryUpdate: APICall = {
	id: 'countryUpdate',
	func: async (
		key: CountryKey,
		country: Country,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(COUNTRY_UPD, <CountryUpdate>{
			keys: key,
			model: country,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const countryDel: APICall = {
	id: 'countryDel',
	func: async (key: CountryKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(COUNTRY_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};
