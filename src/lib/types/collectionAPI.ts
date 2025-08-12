import { type Ref } from "vue";

import { type CollectionLocal } from "./collectionLocal";
import { type GridSrvOperations } from "./gridSrv";
import { type AggData } from "./collection";
import { type CollectionParams } from "./collection";

export type FetchArgsFunc = (p: CollectionParams) => any[];

export interface CollectionAPI extends CollectionLocal {
	srvOperations: Ref<GridSrvOperations | undefined>;
	setSrvOperations(operations: GridSrvOperations): void;
	setFetchParams(params: CollectionParams): void;
	getFetchParams(): CollectionParams;
	aggData: Ref<AggData | undefined>;
	setFetchArgs: (f: FetchArgsFunc) => void;
}
