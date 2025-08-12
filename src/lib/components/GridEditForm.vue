/* old approach v-on=" col.editControl && col.editControl.compEvents ? col.editControl.compEvents :
{} " @update:modelValue="($e: FormDataValue) => setObjValueByPath(editRow, col.id, $e)" */
<template>
	<tr @keypress="onKeyPress">
		<td
			v-for="(col, colIndex) in columnList.filter((c) => c.visible !== false)"
			:key="`col-${colIndex}`"
			:class="{
				'text-center':
					col.editable === false &&
					col.textAlign &&
					col.textAlign === GridColTextAlign.center,
				'text-left':
					col.editable === false &&
					col.textAlign &&
					col.textAlign === GridColTextAlign.left,
				'text-rigth':
					col.editable === false &&
					col.textAlign &&
					col.textAlign === GridColTextAlign.right,
				...customFormatClass(col, editRow),
			}"
		>
			<template v-if="col.field && col.editable !== false">
				<component
					:is="
						useEditComponent(
							col.id,
							col.editControl,
							col.controlType,
							col.field?.dataType,
						)
					"
					v-bind="
						useEditComponentOpts(
							col.id,
							col.editControl,
							col.field,
						)
					"
					:id="col.id"
					v-on="{
						...(col.editControl?.compEvents || {}),
						...(typeof col.editControl?.compEvents?.[
							'update:modelValue'
						] === 'function'
							? {}
							: {
									'update:modelValue': (
										$e: FormDataValue,
									) =>
										setObjValueByPath(
											editRow,
											col.id,
											$e,
										),
								}),
					}"
					:modelValue="getObjValueByPath(editRow, col.id)"
					:name="col.id"
					:placeholder="col.header || col.id"
					:focus="col.focus === true || currentCol === colIndex"
					:error="fieldErrors[col.id]"
				/>
			</template>
			<template
				v-else-if="col.formatResultHtml"
				v-html="renderCellData(row, col, typeFormatter)"
			>
			</template>
			<template v-else>
				{{ renderCellData(row, col, typeFormatter) }}
			</template>
		</td>
	</tr>
	<tr>
		<td class="text-right" :colspan="columnList.length">
			<div v-if="formError" class="text-left form-error">
				{{ formError }}
			</div>
			<div class="container-form-cmd">
				<Button @click="onSubmit" :title="$t('Form.submitTitle')">
					{{ t("Form.submitCaption") }}
				</Button>

				<Button @click="onCancel" :title="$t('Form.cancelTitle')">
					{{ t("Form.cancelCaption") }}
				</Button>
			</div>
		</td>
	</tr>
</template>

<script setup lang="ts">
/**
 *	GridEditForm.vue is used for Grid inline editing.
 *	By Andrey Mikhalevich, 2025
 */
import { ref, reactive, watch, computed } from "vue";
import { type Ref } from "vue";
import { useI18n } from "vue-i18n";
import Button from "./Button.vue";
import type { GridCol } from "../types/grid";
import {
	useEditComponent,
	useEditComponentOpts,
	dataForSubmit,
	getObjValueByPath,
	setObjValueByPath,
} from "../utils/useForm";
import { renderCellData, useFormControlList } from "../utils/useGrid";
import { GridColTextAlign } from "../types/grid";
import type { FormData, FormDataValue } from "../types/form";
import type { TypeFormatter } from "../types/controlTypes.ts";
import { type FormErrorList, useValidationForm } from "../utils/useValidation";
import type { DataFieldValues } from "../types/dataField";

//properties
export interface GridEditFormProps {
	typeFormatter: TypeFormatter;
	columnList: GridCol[];
	currentCol?: number;
	row: FormData;
	isNew: boolean;
	error?: string;
}

const {
	typeFormatter,
	columnList,
	currentCol = 0,
	row,
	isNew,
	error,
} = defineProps<GridEditFormProps>();

// const editRow = ref<FormData>(JSON.parse(JSON.stringify(row)));
const editRow = ref<FormData>({ ...row });

const fieldErrors = reactive<FormErrorList>({});
const formError = ref<string | undefined>(error);

watch(
	() => error,
	(newError: string | undefined) => {
		formError.value = newError;
	},
);

//emitted events
const emit = defineEmits<{
	submit: [submitRow: FormData, editRow: FormData];
	cancel: [modified: boolean];
}>();

const { t } = useI18n();

const onKeyPress = (e: KeyboardEvent) => {
	if (e.key === "Enter" && e.ctrlKey) {
		onSubmit();
	} else if (e.key === "Escape") {
		onCancel();
	}
};

const controlList = computed(() => useFormControlList(columnList));

const validateForm = (formData: DataFieldValues): boolean => {
	if (!controlList.value) {
		return true;
	}
	formError.value = undefined;
	console.log("formIsNew:", isNew, "data for validation:", formData);
	const errors = useValidationForm(controlList.value, formData, isNew);
	console.log("validateForm is ", errors);
	Object.keys(fieldErrors).forEach((key) => delete fieldErrors[key]); // Clear previous errors
	Object.assign(fieldErrors, errors);

	if (Object.keys(errors).length > 0) {
		formError.value = t("Form.validationError");
		return false;
	}
	return true;
};

const onSubmit = () => {
	const ctrlList = useFormControlList(columnList);
	const submitRow = dataForSubmit(ctrlList, row, editRow.value, isNew);
	console.log("original:", row, "editRow:", editRow.value, "diff:", submitRow);

	if (!validateForm(editRow.value as unknown as DataFieldValues)) {
		return;
	}
	// fieldErrors.value = useValidationForm(ctrlList, submitRow, isNew);
	// formError.value = undefined;
	// if (Object.keys(errors.value).length > 0) {
	// 	formError.value = t('Form.validationError');
	// 	return;
	// }

	if (Object.keys(submitRow).length == 0) {
		emit("cancel", false);
	} else {
		emit("submit", submitRow, editRow.value);
	}
};

const customFormatClass = (col: GridCol, rowValue: any) => {
	if (col.editClass) {
		let result: string | Record<string, boolean> | undefined;
		if (typeof col.editClass === "string") {
			//plain value
			result = col.editClass;
		} else {
			//function
			result = col.editClass(rowValue);
		}

		if (typeof result === "string") {
			return result
				.split(" ")
				.filter(Boolean)
				.reduce((acc: Record<string, boolean>, cls: string) => {
					acc[cls] = true;
					return acc;
				}, {});
		}
	} else {
		//default value
		return { "p-0.5 border": true };
	}
};

const onCancel = () => {
	const ctrlList = useFormControlList(columnList);
	const submitRow = dataForSubmit(ctrlList, row, editRow.value, isNew);
	emit("cancel", Object.keys(submitRow).length > 0);
};

export interface GridEditFormExpose {
	editRow: Ref;
}
defineExpose<GridEditFormExpose>({ editRow });
</script>
