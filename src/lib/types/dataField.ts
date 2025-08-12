import { DataType } from "./dataTypes";
import type { ValidationRule } from "./validation";

export type DataFieldValue = string | number | Date | boolean | object | null;

export type DataFieldValues = Record<string, DataFieldValue>;
export type DataFields = Record<string, DataField>;
// export interface DataFields {
// 	[key: string]: DataField;
// }

export interface DataField {
	dataType: DataType;
	pKey?: boolean;
	srvCalc?: boolean;
	validRules?: ValidationRule[];

	writeBind?: Record<string, string> | string; //if no bind defined, control id is used as read field id.
	//field path where to set value <-> control path where to find value in control
}
