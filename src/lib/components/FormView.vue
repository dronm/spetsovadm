/* * this view can be used: * - as a standalone form, opened with query: ?id=N * - as a Modal form
with detail component * * This component manages api read/write operations. * It uses a custom form
component or a defult Form.vue to show all controls and commands. * The form can be opened * - in a
standalone window with view-id query parameter. Parameters are * passed as query parameters. * - in
modal window, parameters are passed as props. * * At least fetch operation must be set. */
<template>
	<Form
		:controlList="controlList ?? <FormControl[]>[]"
		:data="formData"
		:newCustomFormData="customFormData"
		:isNew="formIsNew"
		:error="formError"
		:enabled="true"
		@submit="onSubmit"
		@save="onSave"
		@cancel="onCancel"
	>
		<slot v-if="hasDefaultSlot" :data="customFormData" />
	</Form>

	<Confirmation
		v-model="confirmation.show"
		:txt="confirmation.text"
		@confirm="confirmation.confirmed"
		@reject="confirmation.rejected"
	>
	</Confirmation>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed, useSlots, toRaw } from "vue";
import { useRoute, useRouter, type LocationQuery } from "vue-router";
import { useI18n } from "vue-i18n";

//lib
import type { FormControl, KeyTypes, FormKeys, FormConfirmation, FormData } from "../types/form";
import { FormSrvOperation } from "../types/form";
import Form from "./Form.vue";
import Confirmation from "./Confirmation.vue";
import { type FormViewProps } from "../types/formView";

const {
	keyTypes,
	controlList,
	srvOperations,
	collectionRoute,
	error,
	isNew = false,
	data,
} = defineProps<FormViewProps>();

const emit = defineEmits<{
	close: [modified: boolean];
}>();

//at least one fetch operation must be defined.
if (!srvOperations || !srvOperations[FormSrvOperation.fetch]) {
	throw new Error("t('FormWin.erFetchOperationNotDefined')");
}

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

//this is for standalone form view.
const mainViewId = ref<string | undefined>();
const objModified = ref<boolean>(false); // this is for returning to main view in standalone form

/*
watch(
	() => route.query['view-id'],
	(newFormId: string | string[] | undefined) => {
		mainViewId.value =
			typeof newFormId === 'string' ? newFormId : undefined;
	},
	{ immediate: true },
);
*/

const confirmation = reactive<FormConfirmation>({
	show: false,
	confirmed: undefined,
	rejected: undefined,
	text: "",
});

// const formEnabled = ref(false);

//local parameters, data is fetched from props or from route.query
const formData = ref<FormData | undefined>(data);
const formIsNew = ref<boolean>(isNew);
const objectKeys = ref<FormKeys>({});
const formError = ref<string | undefined>(error);
const isCopy = ref<boolean>(false);

const slots = useSlots();
const hasDefaultSlot = !!slots.default;
const customFormData = computed(() => {
	return slots.default && data ? structuredClone(toRaw(data)) : undefined;
});

//fills objectKeys from route.query
const fillParamsFromRoute = (query: LocationQuery) => {
	if (!keyTypes) {
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
	isCopy.value = query.copy !== undefined;
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

const openedFromRoute = computed(() => route.query && Object.keys(route.query).length);

watch(
	() => route.query,
	(newRouteQuery) => {
		objectKeys.value = {};
		//if route.query is defined, then form is opened with route
		//otherwise form is opened as a Modal and keys are passed
		//in data property with other props like isNew, isCopy
		console.log("identifying open type openedFromRoute:", openedFromRoute.value);
		if (openedFromRoute.value) {
			fillParamsFromRoute(newRouteQuery);
			const newFormId = newRouteQuery["view-id"];
			mainViewId.value = typeof newFormId === "string" ? newFormId : undefined;
		} else {
			fillParamsFromProps();
			mainViewId.value = undefined;
		}

		formIsNew.value = isCopy.value ? true : Object.keys(objectKeys.value).length === 0;
	},
	{ deep: true, immediate: true }, // Calls the watcher immediately
);

const fetchFormData = async () => {
	console.log("fetchFormData is called for keys:", objectKeys.value);
	try {
		formData.value = await srvOperations[FormSrvOperation.fetch].func(objectKeys.value);
		console.log("data is fetched, formData:", formData.value);
	} catch (e: unknown) {
		if (e instanceof Error) {
			formError.value = (e as Error).message || "unknown error";
		}
	}
};

const writeObject = async (editData: any) => {
	formError.value = undefined;
	let oper = formIsNew.value ? FormSrvOperation.insert : FormSrvOperation.update;
	try {
		await srvOperations[oper].func(objectKeys.value, editData);
	} catch (e: unknown) {
		formError.value =
			e instanceof Error
				? (e as Error).message || "unknown error"
				: "unknown error";
	}
};

const onSubmit = async (editData: any) => {
	console.log("onSubmit");
	await writeObject(editData);
	objModified.value = true;
	closeView();
};

const onSave = async (editData: any) => {
	const apiResp = await writeObject(editData);

	if (!formData.value) {
		return;
	}
	// all values from new data to data
	Object.keys(formData.value).forEach((id: string) => {
		if (editData[id] !== undefined) {
			formData[id] = editData[id];
		}
	});

	if (formIsNew.value && controlList) {
		//set new keys, if autoinc
		controlList
			.filter((ctrl: FormControl) => ctrl.field?.srvCalc === true)
			.forEach((ctrl: FormControl) => {
				if (apiResp[ctrl.id] !== undefined) {
					formData.value[ctrl.id] = apiResp[ctrl.id];
				}
			});
		formIsNew.value = false;
	}

	objModified.value = true;
};

const closeView = () => {
	if (mainViewId.value) {
		//standalone form
		window.opener.postMessage(
			{ viewId: mainViewId.value, modified: objModified.value },
			"*",
		);
	} else if (openedFromRoute.value) {
		//component view
		router.push({ name: collectionRoute });
	} else {
		//modal from parent
		emit("close", objModified.value);
	}
};

const onCancel = (modified: boolean) => {
	if (!modified) {
		closeView();
		return;
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

onMounted(() => {
	console.log("formIsNew:", formIsNew.value);
	console.log("isNew:", isNew);
	if (!formIsNew.value) {
		fetchFormData();
	}
});
</script>
