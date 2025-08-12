<template>
	<form>
		<!-- custom form template with controls -->
		<slot name="controls" :data="editData" :errors="fieldErrors" />

		<div>
			<!-- error section -->
			<div
				v-if="formError"
				class="text-red-600 text-sm font-semibold mb-2 text-left"
			>
				{{ formError }}
			</div>

			<slot name="commands" v-if="showCommands" v-bind="{ onSubmit, onCancel, onSave }">
				<FormCommands
					@submit="onSubmit"
					@cancel="onCancel"
					@save="onSave"
				/>
			</slot>
		</div>
	</form>

	<Confirmation
		v-model="confirmation.show"
		:txt="confirmation.text"
		@confirm="confirmation.confirmed"
		@reject="confirmation.rejected"
	>
	</Confirmation>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch, computed, toRaw } from "vue";
import { useRoute, useRouter, type LocationQuery } from "vue-router";
import { useI18n } from "vue-i18n";

//lib
import type { FormControl, KeyTypes, FormKeys, FormConfirmation, FormData } from "../types/form";
import { FormSrvOperation } from "../types/form";
import FormCommands from "./FormCommands.vue";
import Confirmation from "./Confirmation.vue";
import { type DataFieldValues } from "../types/dataField";
import { useValidationForm, type FormErrorList } from "../utils/useValidation";
import { dataForSubmit } from "../utils/useForm";
import { type FormCustomExposed, type FormCustomProps } from "../types/formCustom";
import { useNotificationStore, MessageType } from "../stores/useNotificationStore";
import { useRouteParamsStore } from "../stores/useRouteParams";

const {
	keyTypes,
	controlList,
	srvOperations,
	collectionRoute,
	error,
	isNew = false,
	data,
	beforeValidate,
	showCommands = true,
} = defineProps<FormCustomProps>();

const emit = defineEmits<{
	close: [modified: boolean];
	controlError: [errors: FormErrorList];
	save: [formData: FormData];
	"objectKeys:update": [objectKeys: FormKeys];
	"formData:update": [data: FormData];
}>();

//at least one fetch operation must be defined.
if (!srvOperations || !srvOperations[FormSrvOperation.fetch]) {
	throw new Error("t('FormWin.erFetchOperationNotDefined')");
}

const route = useRoute();

const detailParamsOrig = useRouteParamsStore();
const detailParams = { ...detailParamsOrig };//should copy as it might be changes.

const router = useRouter();
const { t } = useI18n();

const notificationStore = useNotificationStore();

//this is for standalone form view.
const mainViewId = ref<string | undefined>();
const objModified = ref<boolean>(false); // this is for returning to main view in standalone form

const fieldErrors = reactive<FormErrorList>({});

const confirmation = reactive<FormConfirmation>({
	show: false,
	confirmed: undefined,
	rejected: undefined,
	text: "",
});

// const formEnabled = ref(false);

//local parameters, data is fetched from props or from route.query
const formData = ref<FormData>({}); //fetched data
const editData = ref<FormData>({}); //modified data

//detects only if in edit mode!
// const openedFromRoute = computed(() => route.query && Object.keys(route.query).length);
const openedFromRoute = computed(() => detailParams.params && Object.keys(detailParams.params).length>0 );

const formIsNew = ref<boolean>(openedFromRoute.value? detailParams.params.isNew : isNew); //if save is pressed formIsNew is turned to false

const objectKeys = ref<FormKeys>({});

const formError = ref<string | undefined>(error);

//fills objectKeys from route.query
const fillParamsFromRoute = (query: LocationQuery) => {
	if ( !keyTypes ) {
		return;
	}
	Object.keys(keyTypes).forEach((key: string) => {
		if (query[key] === undefined) {
			return;
		}
		let val: KeyTypes;
		if (keyTypes[key] === "number") {
			val = parseInt(query[key] as string);
		} else if (keyTypes[key] === "boolean") {
			val = Boolean(query[key]);
		} else {
			val = String(query[key]);
		}
		objectKeys.value[key] = val;
	});
	emit("objectKeys:update", objectKeys.value);
};

//fills objectKeys with values from props.data
const fillParamsFromProps = () => {
	if (!keyTypes || !data) {
		return;
	}
	Object.keys(keyTypes).forEach((key: string) => {
		if (data[key] !== undefined) {
			let val: KeyTypes;
			if (keyTypes[key] === "number") {
				val = parseInt(data[key] as string);
			} else if (keyTypes[key] === "boolean") {
				val = Boolean(data[key]);
			} else {
				val = String(data[key]);
			}
			objectKeys.value[key] = val;
		}
	});
};


const fillParams = (newRouteQuery: any) => {
	console.log("opened from route:", openedFromRoute.value);
	objectKeys.value = {};
	//if route.query is defined, then form is opened with route
	//otherwise form is opened as a Modal and keys are passed
	//in data property with other props like isNew 
	if (openedFromRoute.value) {
		fillParamsFromRoute(newRouteQuery);
		const newFormId = newRouteQuery["view-id"];
		mainViewId.value = typeof newFormId === "string" ? newFormId : undefined;

	} else {
		fillParamsFromProps();
		mainViewId.value = undefined;
	}

	console.log("formIsNew is set form watch to ", formIsNew.value);
	console.log("object keys:", objectKeys.value);
}

watch(
	() => route.query,
	(newRouteQuery: any) => {
		fillParams(newRouteQuery);
	},
	{ deep: true,}, // Calls the watcher immediately
);

const fetchFormData = async () => {
	if (!srvOperations || !srvOperations[FormSrvOperation.fetch]) {
		return;
	}
	console.log("fetchFormData is called for keys:", objectKeys.value);
	try {
		formData.value = await srvOperations[FormSrvOperation.fetch].func(objectKeys.value);
		console.log("after fetching formData:", formData.value);
		editData.value = structuredClone(toRaw(formData.value));
	} catch (e: unknown) {
		if (e instanceof Error) {
			formError.value = (e as Error).message || "unknown error";
		}
	}
};

const writeObject = async (editData: any): Promise<any> => {
	formError.value = undefined;
	try {
		let resp: any;
		if (formIsNew.value && srvOperations[FormSrvOperation.insert]) {
			resp = await srvOperations[FormSrvOperation.insert].func(editData);
		} else if (srvOperations[FormSrvOperation.update]) {
			resp = await srvOperations[FormSrvOperation.update].func(
				objectKeys.value,
				editData,
			);
		}
		notificationStore.addNotification(t("FormCustom.saveDone"), 2000, MessageType.Info);
		return resp;
	} catch (e: unknown) {
		formError.value =
			e instanceof Error ? e.message || "unknown error" : "unknown error";
		notificationStore.addNotification(t("FormCustom.saveError"), 2000, MessageType.Err);
	}
};

// const onKeyPress = (e: KeyboardEvent) => {
// 	if (e.key === 'Enter' && e.ctrlKey) {
// 		onSubmit();
// 	} else if (e.key === 'Escape') {
// 		onCancel();
// 	}
// };
watch(formData, (newVal: any) => {
	emit("formData:update", newVal);
});

watch(
	() => data,
	(newData: any) => {
		console.log("Data updated: ", newData);
		if (newData) {
			formData.value = structuredClone(toRaw(newData));
		} else if (controlList) {
			formData.value = {};
		}
		console.log("formData is now:", formData.value);
	},
	{ deep: true, immediate: true },
);

const validateForm = (formData: DataFieldValues): boolean => {
	if (!controlList) {
		return true;
	}
	formError.value = undefined;
	console.log(
		"formIsNew:",
		formIsNew.value,
		"isNew:",
		isNew,
		"data for validation:",
		formData,
	);
	const errors = useValidationForm(controlList, formData, formIsNew.value);
	console.log("validateForm is ", errors);
	Object.keys(fieldErrors).forEach((key) => delete fieldErrors[key]); // Clear previous errors
	Object.assign(fieldErrors, errors);

	if (Object.keys(errors).length > 0) {
		formError.value = t("Form.validationError");
		return false;
	}
	return true;
};

const onSubmit = async () => {
	console.log("onSubmit")
	if (!controlList) {
		return;
	}
	const submitData = dataForSubmit(
		controlList,
		toRaw(formData.value),
		toRaw(editData.value),
		isNew,
	);
	if(beforeValidate){
		beforeValidate(editData.value, submitData, isNew);
	}
	//toRaw(editData.value)
	if (!validateForm(editData.value as unknown as DataFieldValues)) {
		return;
	}

	if (Object.keys(submitData).length) {
		const resp = await writeObject(submitData);
		if (resp === undefined) {
			return;
		}
		objModified.value = true;
	}

	closeView();
};

const onSave = async () => {
	if (!controlList) {
		return;
	}
	console.log("onSave: formData:", formData.value, "editData:", editData.value);
	const submitData = dataForSubmit(
		controlList,
		toRaw(formData.value),
		toRaw(editData.value),
		isNew,
	);

	if(beforeValidate){
		beforeValidate(editData.value, submitData, isNew);
	}
	console.log("submit data:", submitData);
	if (!validateForm(editData.value as unknown as DataFieldValues)) {
		notificationStore.addNotification(
			t("FormCustom.saveNotValid"),
			2000,
			MessageType.Err,
		);
		return;
	}

	if (Object.keys(submitData).length == 0) {
		// notificationStore.addNotification(
		// 	t("FormCustom.saveNoData"),
		// 	2000,
		// 	MessageType.Warn,
		// );
		return; //do nothing
	}

	const apiResp = await writeObject(submitData);
	if (apiResp === undefined) {
		return;
	}

	// all values from new data to editData
	Object.keys(formData.value).forEach((id: string) => {
		if (submitData[id] !== undefined) {
			editData.value[id] = submitData[id];
		}
	});

	if (formIsNew.value) {
		//set server calculated fields
		controlList
			.filter((ctrl: FormControl) => ctrl.field?.srvCalc === true)
			.forEach((ctrl: FormControl) => {
				if (apiResp[ctrl.id] !== undefined) {
					editData.value[ctrl.id] = apiResp[ctrl.id];
				}
			});
		formIsNew.value = false;
	}

	//set original data equal to new data
	console.log("eidtData:", editData.value);
	formData.value = structuredClone(toRaw(editData.value));
	objModified.value = false; //since last write object is not modified
	emit("save", formData.value);
};

const onCancel = () => {
	if (!controlList) {
		return;
	}
	const submitData = dataForSubmit(
		controlList,
		toRaw(formData.value),
		toRaw(editData.value),
		isNew,
	);
	// if (!validateForm(submitData)) {
	// 	return;
	// }
	console.log("onCancel,submit:", submitData);
	if (Object.keys(submitData).length == 0) {
		closeView();
		return; //do nothing
	}

	confirmation.confirmed = function () {
		closeView();
	};
	confirmation.rejected = function () {
		return;
	};
	confirmation.text = t("Grid.cancelChanges");
	confirmation.show = true;
};

const closeView = () => {
	console.log("opened form route:",openedFromRoute.value)
	if (mainViewId.value) {
		//standalone form
		console.log("standalone form closing")
		window.opener.postMessage(
			{ viewId: mainViewId.value, modified: objModified.value },
			"*",
		);
	} else if (openedFromRoute.value) {
		//openedFromRoute.value
		//component view
		console.log("from route opened form closing ", route.query)
		router.push({ name: collectionRoute });

	} else {
		//modal from parent
		console.log("emitting close from FormCustom")
		emit("close", objModified.value);
	}
};

const keyActions: Record<string, () => void> = {
	"Control+Enter": onSubmit,
	Escape: onCancel,
};

const onKeyPress = (e: KeyboardEvent) => {
	const keyCombo = `${e.ctrlKey ? "Control+" : ""}${e.key}`;
	if (keyCombo === "Escape") {
		e.stopPropagation();
		e.preventDefault();
	}
	keyActions[keyCombo]?.();
};

onMounted(() => {
	window.addEventListener("keydown", onKeyPress);

	fillParams(route.query); //got keys
	console.log("FormCustom, formIsNew:", formIsNew.value);

	//read object if got keys (new or copy)
	if (Object.keys(objectKeys.value).length > 0) {
		fetchFormData();
	}

	//add defaults
	if (formIsNew.value){
		//clear keys
		objectKeys.value = {};

		//add defaults
		let defValues = <FormData>{};
		if (detailParams.params.defaultValues) {
			defValues = { ...detailParams.params.defaultValues };
		}
		//other defaults
		controlList
			?.forEach((ctrl: FormControl) => {
				if (ctrl.defaultValue !== undefined) {
					if (typeof ctrl.defaultValue == "function") {
						defValues[ctrl.id] =
							ctrl.defaultValue();
					} else {
						defValues[ctrl.id] = ctrl.defaultValue;
					}
				}
			});
		editData.value = { ...defValues };
	}
});

onBeforeUnmount(() => {
	window.removeEventListener("keydown", onKeyPress);
});

// const isModified = (): boolean => {
// 	if(formIsNew){
// 		return true;
// 	}
// 	//
// 	return false;
// }

defineExpose<FormCustomExposed>({
	fetchFormData,
	onSave,
	onSubmit,
	onCancel,
	editData,
});
</script>
