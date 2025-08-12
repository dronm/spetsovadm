//all components used for rendering
import Edit from "../components/Edit.vue";
import EditTel from "../components/EditTel.vue";
import EditInt from "../components/EditInt.vue";
import EditFloat from "../components/EditFloat.vue";
import EditCheckbox from "../components/EditCheckbox.vue";
import EditDate from "../components/EditDate.vue";
import EditPassword from "../components/EditPassword.vue";
import EditRef from "../components/EditRef.vue";

import { DataType } from "../types/dataTypes";
import type { DataField, DataFieldValue } from "../types/dataField";
import type { FormControl, FormEdit } from "../types/form";
import type { VueComponent, VueComponentProps } from "../types/comp";
import { ValidationConstraint } from "../types/validation";
import { type ValidationRule } from "../types/validation";
import { ControlType } from "../types/controlTypes";
import { type Ref } from "../types/ref";
import { type FormData } from "../types/form";

//useEditComponent resolves component for editting.
export function useEditComponent(
	id: string,
	control: FormEdit | undefined,
	controlType: ControlType | undefined,
	dataType: DataType | undefined,
): VueComponent {
	if (control && control.comp) {
		return control.comp;
	}

	if (controlType === undefined) {
		//resolve control type based on data type
		if (dataType === undefined) {
			throw new Error(
				`useEditComponent() failed for id '${id}': dataType or contolType must be defined`,
			);
		}
		controlType = dataToControlTypeMatch[dataType];
	}

	let comp: any;
	switch (controlType) {
		case ControlType.num:
			comp = dataType === DataType.float ? EditFloat : EditInt;
			break;
		case ControlType.tel:
			comp = EditTel;
			break;
		case ControlType.check:
			comp = EditCheckbox;
			break;
		case ControlType.date:
			comp = EditDate;
			break;
		case ControlType.pwd:
			comp = EditPassword;
			break;
		case ControlType.ref:
			comp = EditRef;
			break;
		default:
			comp = Edit; //default
	}
	return comp;
}

export const dataToControlTypeMatch = {
	[DataType.int]: ControlType.num,
	[DataType.float]: ControlType.num,
	[DataType.datetime]: ControlType.date,
	[DataType.date]: ControlType.date,
	[DataType.text]: ControlType.text,
	[DataType.bool]: ControlType.check,
	[DataType.ref]: ControlType.ref,
	[DataType.json]: undefined,
	[DataType.array]: undefined,
	// [DataType.array]: ControlType.array,
};

export function useEditComponentOpts(
	id: string,
	control: FormEdit | undefined,
	dataField: DataField | undefined,
): VueComponentProps | undefined {
	// if (control === undefined && dataField != undefined) {
	// 	control = dataToControlTypeMatch[dataField.dataType];
	// }

	let opts = control?.compProps ? control.compProps : {};
	opts.id = opts.id || id;

	if (dataField?.dataType == DataType.date && (!control || !control?.compProps) ){
		opts.time = true;//date+time is a default
	}

	if (dataField?.validRules && dataField?.validRules.length) {
		//validation rules to component options
		dataField?.validRules.forEach((rule: ValidationRule) => {
			if (rule.constraint == ValidationConstraint.required) {
				opts.required = true;
			} else if (rule.constraint == ValidationConstraint.maxLen && rule.value) {
				opts.maxLength = rule.value;
			}
		});
	}
	//sometimes do not need title
	// opts.title = opts.title || opts.id;
	// console.log("useEditComponentOpts, returning ", opts)

	//some defaults based on control dataType

	return opts;
}

//useSetEditValue returns corrected value.
//If value is empty (incorrect number|Date, empty string)
//then it is not added in insert mode,
//and added ad null value in update mode.
export function useSetEditValue(
	newValue: any,
	editData: any,
	field: DataField,
	id: string,
	isInsert: boolean,
): void {
	let isEmpty = false;
	if (field.dataType === DataType.int || field.dataType === DataType.float) {
		isEmpty = isNaN(newValue as number);
	} else if (field.dataType === DataType.date || field.dataType === DataType.datetime) {
		isEmpty =
			!((newValue as Date) instanceof Date) ||
			isNaN((newValue as Date).getTime());
	} else if (field.dataType === DataType.text) {
		isEmpty = newValue === "";
	} else if (field.dataType === DataType.ref) {
		const keys = (newValue as Ref).keys;
		for (let key in keys) {
			if (keys[key] === undefined || keys[key] === null) {
				isEmpty = true;
				break;
			}
		}
		//lazy field write bind
		if (typeof field.writeBind === "string") {
			field.writeBind = { [field.writeBind]: "keys.id" };
		}
	}

	console.log("writeBind is", field.writeBind);

	let writeFieldId = "";
	let writeFieldPath = field.writeBind || id; //default
	if (typeof writeFieldPath !== "string") {
		let valuePath = "";
		[writeFieldId, valuePath] = Object.entries(writeFieldPath)[0];
		newValue = getObjValueByPath(editData, valuePath);
	}

	if (isInsert && isEmpty) {
		setObjValueByPath(editData, writeFieldId, undefined);
	} else if (!isInsert && isEmpty) {
		setObjValueByPath(editData, writeFieldId, null);
	} else {
		console.log("setting value to ", newValue, "for a field", writeFieldId);
		setObjValueByPath(editData, writeFieldId, newValue);
	}
}

//dataForSubmit constructs object for submition.
export function dataForSubmit(
	controlList: FormControl[],
	oldForm: FormData,
	newForm: FormData,
	isNew: boolean,
): Record<string, DataFieldValue> {
	//compare old values with new ones and generate submit data,
	//1) if update - do not include unmodified;
	//2) if insert - do not include empty values;
	//3) if update - empty values change to nulls;
	//4) validate against constraints;
	//If not modified (no data to submit), issue cancel(false)
	//If there are validation errors - show, do not submit
	// console.log("newForm=", newForm)
	// console.log("oldForm=", oldForm)
	const submitValue = <Record<string, DataFieldValue>>{};
	controlList.forEach((ctrl: FormControl) => {
		// debugger
		let newValue = newForm[ctrl.id]; //can change
		const ctrlIsObj = ctrl.id.includes(".");
		// const oldValue = getObjValueByPath(oldForm, ctrl.id);
		// console.log(" newValue:",newValue," id:",ctrl.id)

		if (
			(isNew && newValue === undefined && !ctrlIsObj && !ctrl.defaultValue) ||
			(!isNew && deepEqual(newValue, oldForm[ctrl.id]) && !ctrlIsObj)
		) {
			//default velue
			// console.log("skeeping value for column:"+ctrl.id+" newValue:",newValue)
			return;
		}

		const field = ctrl.field;
		if (!field) {
			return;
			// throw new Error("field is not defined for control " + ctrl.id);
		}

		let isEmpty = false;
		if (field.dataType === DataType.int || field.dataType === DataType.float) {
			isEmpty = isNaN(newValue as number);
			if (
				!isEmpty &&
				typeof newValue === "string" &&
				field.dataType === DataType.int
			) {
				//casting
				newValue = parseInt(newValue, 10);
			} else if (
				!isEmpty &&
				typeof newValue === "string" &&
				field.dataType === DataType.float
			) {
				//casting
				newValue = parseFloat(newValue);
			}
		} else if (
			field.dataType === DataType.date ||
			field.dataType === DataType.datetime
		) {
			let timestamp: Date | undefined;
			if (newValue instanceof Date) {
				timestamp = newValue;
			} else if (typeof newValue === "string" || typeof newValue === "number") {
				timestamp = new Date(newValue);
			}
			isEmpty = !timestamp || isNaN(timestamp.getTime());

			//format for api
			if (field.dataType === DataType.date && !isEmpty && timestamp) {
				const pad = (n: number) => String(n).padStart(2, "0");
				newValue = `${timestamp.getFullYear()}-${pad(timestamp.getMonth() + 1)}-${pad(timestamp.getDate())}`;
			}
		} else if (field.dataType === DataType.text) {
			isEmpty = newValue === "" || newValue === undefined || newValue === null;

		} else if (field.dataType === DataType.ref) {
			//lazy field write bind
			if (typeof field.writeBind === "string") {
				field.writeBind = { [field.writeBind]: "keys.id" };
			}
		} else if (
			field.dataType === DataType.json &&
			!isNew &&
			ctrlIsObj &&
			newValue === undefined
		) {
			newValue = getObjValueByPath(oldForm, ctrl.id);
		} else if (
			field.dataType === DataType.json &&
			isNew &&
			ctrlIsObj &&
			newValue === undefined
		) {
			newValue = getObjValueByPath(newForm, ctrl.id);
		}

		let valuePath = ctrl.id;
		let fieldPath = field.writeBind || ctrl.id; //default
		if (field.writeBind !== undefined && typeof field.writeBind !== "string") {
			[fieldPath, valuePath] = Object.entries(field.writeBind)[0];
			newValue = getObjValueByPath(newForm, ctrl.id + "." + valuePath);
			if (newValue === undefined) {
				isEmpty = true;
			}
			// console.log(`newValue:${newValue}`)
		}

		if (!isEmpty && field.dataType === DataType.ref) {
			const keys = (newValue as Ref).keys;
			for (let key in keys) {
				if (keys[key] === undefined || keys[key] === null) {
					isEmpty = true;
					break;
				}
			}
		}

		if (isEmpty && isNew) {
			return;
		}

		if (isEmpty) {
			setObjValueByPath(submitValue, fieldPath as string, null);
		} else {
			setObjValueByPath(submitValue, fieldPath as string, newValue);
		}
	});

	return submitValue;
}

export function getObjValueByPath(obj: Record<string, any>, path: string): any {
	const keys = path.split(".");
	let current = obj;

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];

		if (!(key in current) || typeof current[key] !== "object") {
			current[key] = {};
		}

		current = current[key];
		if (!current) {
			break;
		}
	}

	if (!current) {
		return undefined;
	}
	return current[keys[keys.length - 1]];
}

export function setObjValueByPath(obj: Record<string, any>, path: string, value: any): void {
	const keys = path.split(".");
	let current = obj;

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];

		if (
			!(key in current) ||
			typeof current[key] !== "object" ||
			current[key] === null
		) {
			current[key] = {};
		}

		current = current[key];
	}

	if (value === undefined) {
		delete current[keys[keys.length - 1]];
	} else {
		current[keys[keys.length - 1]] = value;
	}
}

export function deepEqual(obj1: any, obj2: any): boolean {
	if (obj1 === obj2) return true; // Same reference or primitive

	if (obj1 instanceof Date && obj2 instanceof Date) {
		return obj1.getTime() === obj2.getTime(); // Compare timestamps
	}

	if (
		typeof obj1 !== "object" ||
		typeof obj2 !== "object" ||
		obj1 === null ||
		obj2 === null
	) {
		return false; // If either is not an object or is null, return false
	}

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false; // Different number of keys

	return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
}
