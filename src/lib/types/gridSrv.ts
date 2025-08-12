import type { APICall } from "./apiCall";

//all possible API grid operations
export enum GridSrvOperation {
	insert = "insert",
	delete = "delete",
	update = "update",
	detail = "detail",
	list = "list",
}

export type GridSrvOperations = {
	[key in GridSrvOperation]?: APICall; //all keys are optianal
};

export const newGridSrvOperations = (
	opInsert: APICall,
	opDelete: APICall,
	opUpdate: APICall,
	opDetail: APICall,
	opList: APICall,
) => {
	const operations = <GridSrvOperations>{};
	operations[GridSrvOperation.insert] = opInsert;
	operations[GridSrvOperation.delete] = opDelete;
	operations[GridSrvOperation.update] = opUpdate;
	operations[GridSrvOperation.detail] = opDetail;
	operations[GridSrvOperation.list] = opList;

	return operations;
};
