<template>
	<div class="detail-title">{{ t('NotifApp.title') }}</div>

	<form>
		<Edit
			id="name"
			:label="$t('NotifApp.name.label')"
			:title="$t('NotifApp.name.title')"
			:placeholder="$t('NotifApp.name.placeholder')"
			v-model="notifApp.name"
			:error="fieldErrors.name"
		>
		</Edit>

		<Edit
			id="callback_url"
			:label="$t('NotifApp.callback_url.label')"
			:title="$t('NotifApp.callback_url.title')"
			:placeholder="$t('NotifApp.callback_url.placeholder')"
			v-model="notifApp.callback_url"
			:error="fieldErrors.callback_url"
		>
		</Edit>

		<Edit
			id="callback_key"
			:label="$t('NotifApp.callback_key.label')"
			:title="$t('NotifApp.callback_key.title')"
			:placeholder="$t('NotifApp.callback_key.placeholder')"
			v-model="notifApp.callback_key"
			:error="fieldErrors.callback_key"
		>
		</Edit>

		<Edit
			id="pwd"
			:label="$t('NotifApp.pwd.label')"
			:title="$t('NotifApp.pwd.title')"
			:placeholder="$t('NotifApp.pwd.placeholder')"
			v-model="notifApp.pwd"
			:error="fieldErrors.pwd"
		>
		</Edit>

		<NotifAppTMParams
			v-model:tmData="notifApp.provider_params.tm"
			v-model:errors="fieldErrors.provider_params"
		>
		</NotifAppTMParams>

		<NotifAppSMSParams
			v-model:smsData="notifApp.provider_params.sms"
			v-model:errors="fieldErrors.provider_params"
		>
		</NotifAppSMSParams>

		<NotifAppEmailParams
			v-model:emailData="notifApp.provider_params.email"
			v-model:errors="fieldErrors.provider_params"
		>
		</NotifAppEmailParams>

		<div>
			<div
				v-if="formError"
				class="text-red-600 text-sm font-semibold mb-2 text-left"
			>
				{{ formError }}
			</div>

			<FormCommands @save="onSave" />
		</div>
	</form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, toRaw } from 'vue';
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';
import FormCommands from '@/lib/components/FormCommands.vue';
import { DataType } from '@/lib/types/dataTypes';
import { ValidationConstraint } from '@/lib/types/validation';
import { dataForSubmit } from '@/lib/utils/useForm';
import { type FormData } from '@/lib/types/form';
import { type DataFieldValues } from '@/lib/types/dataField';
import {
	useValidationForm,
	type FormErrorList,
} from '@/lib/utils/useValidation';

import NotifAppTMParams from '@/components/NotifAppTMParams.vue';
import NotifAppSMSParams from '@/components/NotifAppSMSParams.vue';
import NotifAppEmailParams from '@/components/NotifAppEmailParams.vue';
import { type NotifApp, type NotifProviderParams } from '../models/notifApp';
import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';
import { NOTE_NOTIF_TIMEOUT, ERROR_NOTIF_TIMEOUT } from '@/config/constants';
import { notifAppDetail } from '@/services/notifApp';
import { notifAppUpdate } from '@/services/notifApp';

const { t } = useI18n();

const notifApp = ref<NotifApp>({
	id: 0,
	name: '',
	provider_params: <NotifProviderParams>{},
	callback_url: '',
	callback_key: '',
	pwd: '',
});
const formError = ref<string | undefined>(undefined);

const controlList = [
	{
		id: 'name',
		field: {
			dataType: DataType.text,
			validRules: [{ constraint: ValidationConstraint.required }],
		},
	},
	{
		id: 'callback_url',
		field: {
			dataType: DataType.text,
			validRules: [
				{ constraint: ValidationConstraint.required },
				{ constraint: ValidationConstraint.maxLen, value: 500 },
			],
		},
	},
	{
		id: 'callback_key',
		field: {
			dataType: DataType.text,
			validRules: [
				{ constraint: ValidationConstraint.required },
				{ constraint: ValidationConstraint.maxLen, value: 500 },
			],
		},
	},
	{
		id: 'pwd',
		field: {
			dataType: DataType.text,
			validRules: [
				{ constraint: ValidationConstraint.required },
				{ constraint: ValidationConstraint.maxLen, value: 250 },
			],
		},
	},
];

let notifAppFetched: NotifApp;
const fetchFormData = async () => {
	try {
		notifAppFetched = await notifAppDetail.func();
		notifApp.value = structuredClone(notifAppFetched);
	} catch (e: unknown) {
		if (e instanceof Error) {
			formError.value = (e as Error).message || 'unknown error';
		}
	}
};

onMounted(() => {
	fetchFormData();
});

const fieldErrors = reactive<FormErrorList>({});

const validateForm = (submitData: DataFieldValues): boolean => {
	if (!controlList) {
		return true;
	}
	formError.value = undefined;
	const errors = useValidationForm(controlList, submitData, true);
	Object.keys(fieldErrors).forEach((key) => delete fieldErrors[key]); // Clear previous errors
	Object.assign(fieldErrors, errors);

	if (Object.keys(errors).length > 0) {
		formError.value = t('Form.validationError');
		return false;
	}
	return true;
};

const notificationStore = useNotificationStore();

const onSave = async () => {
	if (!notifApp.value) {
		return;
	}
	const deltaData = dataForSubmit(
		controlList,
		notifAppFetched as unknown as FormData,
		toRaw(notifApp.value),
		false,
	);
	if (Object.keys(deltaData).length == 0) {
		notificationStore.addNotification(
			t('Form.noDataToSubmit'),
			NOTE_NOTIF_TIMEOUT,
			MessageType.Warn,
		);
		return;
	}

	const submitData = toRaw(notifApp.value);
	if (!validateForm(submitData)) {
		return;
	}

	formError.value = undefined;
	try {
		await notifAppUpdate.func(submitData);
		notificationStore.addNotification(
			t('Form.submitted'),
			NOTE_NOTIF_TIMEOUT,
			MessageType.Info,
		);
	} catch (e: unknown) {
		formError.value =
			e instanceof Error ? e.message || 'unknown error' : 'unknown error';
		notificationStore.addNotification(
			formError.value,
			ERROR_NOTIF_TIMEOUT,
			MessageType.Err,
		);
	}
};
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[280px];
}
</style>
