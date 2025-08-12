import { type GridCol } from "./grid";

export interface GridSearchProps {
	columns: GridCol[][];
	columnIndex?: number;
	initSearch?: string; //initial search
}

export enum GridSearchType {
	ON_BEG,
	ON_PART,
	ON_END,
	ON_EXACT,
}
