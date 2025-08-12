export enum FilterOperatorParam {
	E = "e", //equal
	L = "l", //less
	G = "g", //greater
	LE = "le", //less and equal
	GE = "ge", //greater and equal
	LK = "lk", //like
	ILK = "ilk", //ilike
	NE = "ne", //not equal
	I = "i", // IS
	IN = "in", // in
	INCL = "incl", //include
	ANY = "any", //Any
	OVERLAP = "overlap", //overlap
	CONTAINS = "contains", //contains
	TS = "fts", //full text search
}

export enum SortDirect {
	ASC = "a",
	DESC = "d",
}

export enum FilterJoinParam {
	AND = "and",
	OR = "or",
}

export interface CollectionSorter {
	f: string;
	d: SortDirect;
}

export interface CollectionFilterField {
	o: FilterOperatorParam;
	v: any;
}

export interface CollectionFilterFields {
	[key: string]: CollectionFilterField;
}

export interface CollectionFilter {
	j?: FilterJoinParam;
	f: CollectionFilterFields;
}

export interface SortChangeEvent {
	field: SortField;
	isAscending: boolean;
}

export interface SortField {
	name: string;
	descr: string;
	isAscending: boolean;
}

export interface CollectionParams {
	filter?: CollectionFilter[];
	sorter?: CollectionSorter[];
	from?: number;
	count?: number;
}

export interface CollectionTotCount {
	tot_count: number;
}

export type AggData = Record<string, number>;
