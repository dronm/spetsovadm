//id: {descr=field description in Locale, val=field value}
//id is a filter ID.
export type GridSearchPanelVal = { id: string; descr: string; val: string };

export interface GridSearchPanelProps {
	resultList: GridSearchPanelVal[];
}
