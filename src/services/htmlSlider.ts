import { CachePolicies } from '../lib/types/apiCall';
import type { APICall } from '../lib/types/apiCall';
import type {
	CollectionParams,
	CollectionTotCount,
} from '../lib/types/collection';

import srvConn from './srvConn';
import {
	HTML_SLIDER_LIST,
	HTML_SLIDER_DETAIL,
	HTML_SLIDER_ADD,
	HTML_SLIDER_DEL,
	HTML_SLIDER_UPD,
	HTML_SLIDER_PUBLIC,
} from '../config/constants';
import type {
	HtmlSlider,
	HtmlSliderKey,
	HtmlSliderUpdate,
} from '../models/htmlSlider.ts';
import { type CollectionAlterResult } from '../lib/services/types';
import { transformJSON } from '../lib/services/transformJSON';

export interface HtmlSliderCollection {
	data: HtmlSlider[];
	agg: CollectionTotCount;
}
export const htmlSliderList: APICall = {
	id: 'HtmlSliderList',
	func: async (params?: CollectionParams): Promise<HtmlSliderCollection> => {
		const data = await srvConn.get(HTML_SLIDER_LIST, { params: params });
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const htmlSliderDetail: APICall = {
	id: 'HtmlSliderDetail',
	func: async (keys: HtmlSliderKey): Promise<HtmlSlider> => {
		const data = await srvConn.get(
			HTML_SLIDER_DETAIL.replace('{{ID}}', keys.id.toString()),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const htmlSliderAdd: APICall = {
	id: 'HtmlSliderAdd',
	func: async (htmlSlider: HtmlSlider): Promise<HtmlSliderKey> => {
		return await srvConn.post(HTML_SLIDER_ADD, htmlSlider);
	},
	cachePolicy: CachePolicies.NoCache,
};

export const htmlSliderUpdate: APICall = {
	id: 'HtmlSliderUpdate',
	func: async (
		key: HtmlSliderKey,
		htmlSlider: HtmlSlider,
	): Promise<CollectionAlterResult> => {
		return await srvConn.post(HTML_SLIDER_UPD, <HtmlSliderUpdate>{
			keys: key,
			model: htmlSlider,
		});
	},
	cachePolicy: CachePolicies.NoCache,
};

export const htmlSliderDel: APICall = {
	id: 'HtmlSliderDel',
	func: async (key: HtmlSliderKey): Promise<CollectionAlterResult> => {
		return await srvConn.post(HTML_SLIDER_DEL, key);
	},
	cachePolicy: CachePolicies.NoCache,
};

//*******************************
//no aggredation
export const htmlSliderPublic: APICall = {
	id: 'HtmlSlider',
	func: async (name: string): Promise<HtmlSlider> => {
		const data = await srvConn.get(
			HTML_SLIDER_PUBLIC.replace('{{SLIDER_NAME}}', name),
		);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.NoCache,
};
