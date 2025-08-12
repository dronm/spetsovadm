/** * This component is used for grid modal form. */
<template>
	<form @keypress="onKeyPress">
		<div v-if="$slots.default">
			<slot />
		</div>
		<div v-else>
			<template v-for="ctrl in controlList">
				<component
					v-if="ctrl.field"
					:is="
						useEditComponent(
							ctrl.id,
							ctrl.editControl,
							ctrl.controlType,
							ctrl.field.dataType,
						)
					"
					v-bind="
						useEditComponentOpts(
							ctrl.id,
							ctrl.editControl,
							ctrl.field,
						)
					"
					v-model="formData[ctrl.id]"
					:id="ctrl.id"
					:name="ctrl.id"
					:disabled="!enabled"
					:placeholder="ctrl.label || ctrl.id"
					:label="ctrl.label || ctrl.id + ':'"
					:focus="ctrl.focus === true || ctrl.id === currentId"
					:error="errors[ctrl.id]"
				/>
			</template>
		</div>
		<div>
			<!-- error section -->
			<div v-if="formError" class="form-error">
				{{ formError }}
			</div>

			<slot name="commands" v-bind="{ onSubmit, onCancel, onSave }">
				<FormCommands
					@submit="onSubmit"
					@cancel="onCancel"
					@save="onSave"
				/>
			</slot>
		</div>
	</form>
</template>

<script setup lang="ts">
import { ref, watch, toRaw, computed, useSlots } from "vue";
import { useI18n } from "vue-i18n";
import { useEditComponent, useEditComponentOpts, dataForSubmit } from "../utils/useForm";
import type { FormControl, FormData } from "../types/form";
import { type FormErrorList, useValidationForm } from "../utils/useValidation";

import FormCommands from "./FormCommands.vue";
import { type DataFieldValue, type DataFieldValues } from "../types/dataField";

//properties
export interface FormProps {
	controlList: FormControl[];
	data?: FormData;
	newCustomFormData?: FormData; //if custom template as a slot is used
	currentId?: string;
	isNew: boolean;
	enabled?: boolean;
}
const {
	controlList,
	data,
	newCustomFormData,
	currentId,
	isNew,
	enabled = true,
} = defineProps<FormProps>();

const slots = useSlots();
const slotContent = slots.default?.({}) || [];

const errors = ref<FormErrorList>({});
const formError = ref<string | undefined>(undefined);

//emitted events
const emit = defineEmits<{
	submit: [submitData: FormData, editData: FormData]; //
	save: [submitData: FormData, editData: FormData]; //data: FormControlData
	cancel: [modified: boolean];
}>();

const { t } = useI18n();
const formData = ref<FormData>({});

//modifiedData always points to modified data structure default form or custom form
const modifiedData = computed(() => (newCustomFormData ? newCustomFormData : formData.value));

watch(
	() => data,
	(newData: FormData) => {
		if (!newCustomFormData) {
			//avoid copying
			formData.value = newData ? structuredClone(toRaw(newData)) : {};
		}
	},
	{ deep: true, immediate: true },
);

const onKeyPress = (e: KeyboardEvent) => {
	if (e.key === "Enter" && e.ctrlKey) {
		onSubmit();
	} else if (e.key === "Escape") {
		onCancel();
	}
};

const validateForm = (submitRow: DataFieldValues): boolean => {
	errors.value = useValidationForm(controlList, submitRow, isNew);
	formError.value = undefined;
	if (Object.keys(errors.value).length > 0) {
		formError.value = t("Form.validationError");
		return false;
	}
	return true; //ok
};

const onSubmit = () => {
	const submitRow = dataForSubmit(controlList, data ?? {}, modifiedData.value, isNew);
	console.log("Form.onSubmit submitRow:", submitRow);

	if (!validateForm(submitRow)) {
		return;
	}

	if (Object.keys(submitRow).length == 0) {
		emit("cancel", false);
	} else {
		emit("submit", submitRow, modifiedData.value);
	}
};

const onCancel = () => {
	const submitRow = dataForSubmit(controlList, data ?? {}, modifiedData.value, isNew);
	emit("cancel", Object.keys(submitRow).length > 0);
};

const onSave = () => {
	const submitRow = dataForSubmit(controlList, data ?? {}, modifiedData.value, isNew);

	if (!validateForm(submitRow)) {
		return;
	}

	emit("save", submitRow, modifiedData.value);
};
</script>
