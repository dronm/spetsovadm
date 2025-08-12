export enum CachePolicies {
	NoCache,
	Local,
	Session,
}

export type APIFunction = (...args: any[]) => any;

interface APICache {
	policy: CachePolicies; //how to cache server response deprecated
	duration?: number; //cache persistance time in ms
	createdAt?: Date;
}

export interface APICall {
	id: string;
	func: APIFunction;
	cachePolicy?: CachePolicies; //how to cache server response deprecated
	cache?: APICache;
}
