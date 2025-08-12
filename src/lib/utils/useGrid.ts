import { t } from "../i18n";

import type { GridCol } from "../types/grid.ts";
import { type FormatDateOpts, type TypeFormatter } from "../types/controlTypes";
import { dataToControlTypeMatch } from "./useForm";
import { type FormControl, type FormData } from "../types/form";
import { getObjValueByPath } from "./useForm";
import { ControlType } from "../types/controlTypes";
import { DataType } from "../types/dataTypes";

//useGridColumnList flattens grid columns for use in grids
export function flattenColumnList(columns: GridCol[][]): GridCol[] {
	const colTracker: GridCol[] = []; // Tracks the final column order
	const spannedCols = new Map(); // Tracks active spans across rows

	columns.forEach((headerRow: GridCol[], rowIndex: number) => {
		let colIndex = 0;

		headerRow.forEach((col: GridCol) => {
			// if(col.visible === false){
			// 	return;
			// }
			// Skip already spanned columns
			while (spannedCols.get(colIndex)) colIndex++;

			if (col.field || col.formatFunction || col.formatControl) {
				colTracker[colIndex] = col; // Place the column in the correct slot
			}

			// Handle spans
			if (col.colspan && col.colspan > 1) {
				for (let i = 0; i < col.colspan; i++) {
					spannedCols.set(
						colIndex + i,
						rowIndex + (col.rowspan || 1),
					); // Span to the next rows
				}
			} else {
				spannedCols.set(colIndex, rowIndex + (col.rowspan || 1));
			}

			colIndex++;
		});

		// Cleanup spans no longer active for this row
		spannedCols.forEach((endRow, index) => {
			if (endRow === rowIndex + 1) {
				spannedCols.delete(index);
			}
		});
	});

	// Filter to include only relevant columns
	return colTracker.filter((col) => col?.field || col?.formatFunction || col?.formatControl);
}

// Function to handle data rendering
export function renderCellData(row: FormData, col: GridCol, typeFormatter: TypeFormatter): string {
	let result = "";
	if (col.formatFunction) {
		//html or text
		result = col.formatFunction(row);
	} else if (!col.formatControl) {
		const ctrlType = colControlType(col);
		//read binding with dot
		const colVal = getObjValueByPath(row, col.id);

		if (
			ctrlType == ControlType.date &&
			col.field &&
			col.field.dataType == DataType.datetime &&
			col.formatOpts == undefined
		) {
			//defualt opts for datatime field
			col.formatOpts = <FormatDateOpts>{
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			};
		}
		result = typeFormatter(colVal, ctrlType, col.formatOpts);
	}
	return result;
}

export function colControlType(col: GridCol): ControlType {
	let res: ControlType;
	if (col.controlType) {
		res = col.controlType;
	} else if (col.field && dataToControlTypeMatch[col.field.dataType]) {
		res = dataToControlTypeMatch[col.field.dataType] ?? ControlType.text;
	} else {
		res = ControlType.text;
	}
	return res;
}

export function useKeyColumns(columns: GridCol[]): any {
	return columns.filter((col: GridCol) => col.field?.pKey === true && col.id);
}

export function useRowKeys(rowIndex: number, columns: GridCol[], listData: any[]): any {
	const keyColumns = useKeyColumns(columns);
	if (!keyColumns || !keyColumns.length) {
		throw new Error("useRowKeys() failed: keyColumns key not defined!");
	}

	if (rowIndex >= listData.length || rowIndex < 0) {
		throw new Error(
			t("Grid.errRowIndexOutOfBounds", {
				rowIndex: rowIndex,
				upBound: listData.length - 1,
			}),
		);
	}

	let keys: any = {}; //key values
	keyColumns.forEach((col: GridCol) => {
		for (let dataField in listData[rowIndex]) {
			if (col.id == dataField) {
				keys[col.id] = listData[rowIndex][dataField];
			}
		}
	});
	return keys;
}
//
export function isEditRowModified(isInsert: boolean, editRow: any, originalRow: any): boolean {
	let modified = false;
	Object.keys(editRow).forEach((f: string) => {
		if (editRow[f] !== undefined && (isInsert || editRow[f] !== originalRow[f])) {
			modified = true;
			return;
		}
	});

	return modified;
}

export function useFormControlList(columnList: GridCol[]): FormControl[] {
	let ctrlList: FormControl[] = [];
	columnList.forEach((col: GridCol) => {
		// && col.visible !== false - problem with default vaues
		if (col.editable !== false) {
			ctrlList.push(<FormControl>{
				id: col.id,
				field: col.field,
				label: col.header,
				defaultValue: col.defaultValue,
				focus: col.focus,
				editControl: col.editControl,
			});
		}
	});

	return ctrlList;
}
