/** * constant custom update form */
<template>
	<div class="detail-title">{{ t('ConstEmail.title') }}</div>

	<form>
		<EditEmail
			id="from_addr"
			:label="$t('ConstEmail.from_addr.label')"
			:title="$t('ConstEmail.from_addr.title')"
			:placeholder="$t('ConstEmail.from_addr.placeholder')"
			v-model="email.from_addr"
			:error="fieldErrors.from_addr"
		>
		</EditEmail>

		<Edit
			id="from_name"
			:label="$t('ConstEmail.from_name.label')"
			:title="$t('ConstEmail.from_name.title')"
			:placeholder="$t('ConstEmail.from_name.placeholder')"
			v-model="email.from_name"
			:error="fieldErrors.from_name"
		>
		</Edit>

		<!--
		<Edit
			id="sender_addr"
			:label="$t('ConstEmail.sender_addr.label')"
			:title="$t('ConstEmail.sender_addr.title')"
			:placeholder="$t('ConstEmail.sender_addr.placeholder')"
			v-model="email.sender_addr"
			:error="fieldErrors.sender_addr"
		>
		</Edit>
		-->
		<Edit
			id="reply_name"
			:label="$t('ConstEmail.reply_name.label')"
			:title="$t('ConstEmail.reply_name.title')"
			:placeholder="$t('ConstEmail.reply_name.placeholder')"
			v-model="email.reply_name"
			:error="fieldErrors.reply_name"
		>
		</Edit>

		<!--
		<Edit
			id="smtp_host"
			:label="$t('ConstEmail.smtp_host.label')"
			:title="$t('ConstEmail.smtp_host.title')"
			:placeholder="$t('ConstEmail.smtp_host.placeholder')"
			v-model="email.smtp_host"
			:error="fieldErrors.smtp_host"
		>
		</Edit>

		<EditPassword
			id="pwd"
			:label="$t('ConstEmail.pwd.label')"
			:title="$t('ConstEmail.pwd.title')"
			v-model="email.pwd"
			:error="fieldErrors.pwd"
		>
		</EditPassword>

		<EditInt
			id="check_interval_ms"
			:label="$t('ConstEmail.check_interval_ms.label')"
			:title="$t('ConstEmail.check_interval_ms.title')"
			v-model="email.check_interval_ms"
			:error="fieldErrors.check_interval_ms"
		>
		</EditInt>
-->
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
// import EditInt from '@/lib/components/EditInt.vue';
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

import { type ConstEmail } from '../models/constEmail';
import { constantGet, constantSet } from '@/services/constant';
// import EditPassword from "@/lib/components/EditPassword.vue";
// import EditNum from "@/lib/components/EditNum.vue";
import EditEmail from '@/lib/components/EditEmail.vue';
import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';
import { NOTE_NOTIF_TIMEOUT, ERROR_NOTIF_TIMEOUT } from '@/config/constants';

const { t } = useI18n();

const email = ref<ConstEmail>({
	from_name: '',
	from_addr: '',
	reply_name: '',
	sender_addr: '',
	smtp_host: '',
	pwd: '',
	check_interval_ms: 0,
});
const formError = ref<string | undefined>(undefined);

const controlList = [
	{
		id: 'from_addr',
		field: {
			dataType: DataType.text,
			validRules: [
				{ constraint: ValidationConstraint.required },
				{ constraint: ValidationConstraint.maxLen, value: 50 },
			],
		},
	},
	{
		id: 'from_name',
		field: {
			dataType: DataType.text,
			validRules: [
				{ constraint: ValidationConstraint.required },
				{ constraint: ValidationConstraint.maxLen, value: 250 },
			],
		},
	},
	{
		id: 'sender_addr',
		field: {
			dataType: DataType.text,
			validRules: [
				{ constraint: ValidationConstraint.required },
				{ constraint: ValidationConstraint.maxLen, value: 50 },
			],
		},
	},
	{
		id: 'reply_name',
		field: {
			dataType: DataType.text,
			validRules: [
				{ constraint: ValidationConstraint.required },
				{ constraint: ValidationConstraint.maxLen, value: 250 },
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
	{
		id: 'check_interval_ms',
		field: {
			dataType: DataType.int,
			validRules: [{ constraint: ValidationConstraint.required }],
		},
	},
	{
		id: 'smtp_host',
		field: {
			dataType: DataType.text,
			validRules: [
				{ constraint: ValidationConstraint.required },
				{ constraint: ValidationConstraint.maxLen, value: 250 },
				// { constraint: ValidationConstraint.regExp, value: "^([a-zA-Z0-9.-]+):(6553[0-5]|655[0-2]\\d|65[0-4]\\d{2}|6[0-4]\\d{3}|[1-5]?\\d{1,4})$" }
			],
		},
	},
];

let emailFetched: ConstEmail;
const fetchFormData = async () => {
	try {
		const constList = await constantGet.func(['email']);
		if (constList[0].val !== null) {
			emailFetched = JSON.parse(constList[0].val);
			email.value = structuredClone(emailFetched);
		}
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
	if (!email.value) {
		return;
	}
	email.value.sender_addr = email.value.from_addr;
	const deltaData = dataForSubmit(
		controlList,
		emailFetched as unknown as FormData,
		toRaw(email.value),
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

	const submitData = toRaw(email.value);
	if (!validateForm(submitData)) {
		return;
	}

	formError.value = undefined;
	try {
		const val = JSON.stringify(submitData);
		await constantSet.func('email', val);
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
