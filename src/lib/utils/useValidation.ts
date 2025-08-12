import { t } from "../i18n";

import { DataType } from "../types/dataTypes";
import { type ValidationRule, ValidationConstraint } from "../types/validation";
import { type FormControl } from "../types/form";
import { type DataFieldValue, type DataFieldValues } from "../types/dataField";

//form control errors.
// export interface FormErrorList {
// 	[fieldId: string]: string;
// }
export type FormErrorList = Record<string, string>;

export const useValidationForm = (
	controls: FormControl[],
	formData: DataFieldValues,
	isNew: boolean,
): FormErrorList => {
	const errors: FormErrorList = {};

	if (formData === null) {
		return errors;
	}

	controls.forEach((ctrl: FormControl) => {
		if (!ctrl.field || !ctrl.field.validRules) {
			return;
		}
		try {
			ctrl.field.validRules.forEach((rule: ValidationRule) => {
				useValidation(
					ctrl.id,
					ctrl.label || ctrl.id,
					ctrl.field?.dataType ?? DataType.text,
					rule,
					isNew,
					formData[ctrl.id],
				);
			});
		} catch (e: unknown) {
			if (e instanceof Error) {
				errors[ctrl.id] = e.message;
			} else {
				errors[ctrl.id] = String(e);
			}
		}
	});

	return errors;
};

export const useValidation = (
	fieldId: string,
	fieldAlias: string,
	dataType: DataType,
	rule: ValidationRule,
	isNew: boolean,
	value: DataFieldValue,
): void => {
	if (
		rule.constraint === ValidationConstraint.required &&
		rule.value !== false &&
		(value === null || (value === undefined && isNew))
	) {
		throw new Error(t("Validation.required", { field: fieldAlias }));
	}

	if (value === undefined || value === null) {
		return;
	}

	if (dataType === DataType.int) {
		let valTyped: number;
		if (typeof value === "string") {
			valTyped = parseInt(value, 10);
		} else if (typeof value !== "number") {
			throw new Error(
				t("Validation.dataType", { field: fieldAlias }),
			);
		} else {
			valTyped = value;
		}
		useValidationInt(fieldId, fieldAlias, rule, valTyped);
	} else if (dataType === DataType.float) {
		let valTyped: number;
		if (typeof value === "string") {
			valTyped = parseFloat(value);
		} else if (typeof value !== "number") {
			throw new Error(
				t("Validation.dataType", { field: fieldAlias }),
			);
		} else {
			valTyped = value;
		}
		useValidationFloat(fieldId, fieldAlias, rule, valTyped);
	} else if (dataType === DataType.text) {
		useValidationText(fieldId, fieldAlias, rule, value.toString());
	}
};

export const useValidationInt = (
	fieldId: string,
	fieldAlias: string,
	rule: ValidationRule,
	value: number,
): void => {
	if (rule.constraint === ValidationConstraint.minVal && value < rule.value) {
		throw new Error(
			t("Validation.minVal", {
				field: fieldAlias,
				minVal: value,
			}),
		);
	} else if (rule.constraint === ValidationConstraint.maxVal && value > rule.value) {
		throw new Error(
			t("Validation.maxVal", {
				field: fieldAlias,
				maxVal: value,
			}),
		);
	}
};

export const useValidationFloat = (
	fieldId: string,
	fieldAlias: string,
	rule: ValidationRule,
	value: number,
): void => {
	if (rule.constraint === ValidationConstraint.minVal && value < rule.value) {
		throw new Error(
			t("Validation.minVal", {
				field: fieldAlias,
				minVal: value,
			}),
		);
	} else if (rule.constraint === ValidationConstraint.maxVal && value > rule.value) {
		throw new Error(
			t("Validation.maxVal", {
				field: fieldAlias,
				maxVal: value,
			}),
		);
	} else if (rule.constraint === ValidationConstraint.precision) {
		const decimalPlaces = value.toString().split(".")[1]?.length || 0;
		if (decimalPlaces > rule.value) {
			throw new Error(
				t("Validation.precision", {
					field: fieldId,
					precision: rule.value,
				}),
			);
		}
	} else if (
		rule.constraint === ValidationConstraint.maxLen &&
		value.toString().length > rule.value
	) {
		throw new Error(
			t("Validation.maxLen", {
				field: fieldAlias,
				maxLen: rule.value,
			}),
		);
	} else if (
		rule.constraint === ValidationConstraint.fixList &&
		Array.isArray(rule.value) &&
		!rule.value.includes(value)
	) {
		throw new Error(t("Validation.fixList", { field: fieldAlias }));
	}
};

export const useValidationText = (
	fieldId: string,
	fieldAlias: string,
	rule: ValidationRule,
	value: string,
): void => {
	if (
		rule.constraint === ValidationConstraint.maxLen &&
		value.toString().length > rule.value
	) {
		throw new Error(
			t("Validation.maxLen", {
				field: fieldAlias,
				maxLen: rule.value,
			}),
		);
	} else if (
		rule.constraint === ValidationConstraint.fixLen &&
		value.toString().length != rule.value
	) {
		throw new Error(
			t("Validation.fixLen", {
				field: fieldAlias,
				maxLen: rule.value,
			}),
		);
	} else if (
		rule.constraint === ValidationConstraint.fixList &&
		Array.isArray(rule.value) &&
		!rule.value.includes(value)
	) {
		throw new Error(t("Validation.fixList", { field: fieldAlias }));
	} else if (
		rule.constraint === ValidationConstraint.regExp &&
		typeof rule.value === "string" &&
		!new RegExp(rule.value).test(rule.value)
	) {
		throw new Error(t("Validation.regExp", { field: fieldAlias }));
	}
};
