<template>
	<div class="detail-title">{{ t('UserProfile.title') }}</div>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="srvOperations"
		collectionRoute="userProfile"
		:error="props.error"
		:isNew="false"
		:data="{ id: 0 }"
		:currentId="props.currentId"
		@objectKeys:update="onKeysUpdate"
		@formData:update="onFormDataUpdate"
	>
		<!-- custom template -->
		<template
			:currentId="props.currentId"
			v-slot:controls="slotProps: SlotProps"
		>
			<Edit
				id="name"
				:label="t('UserProfile.name.label')"
				type="text"
				required
				:title="$t('UserProfile.name.title')"
				v-model="slotProps.data.name"
			/>

			<UserTel
				v-model:tel="slotProps.data.tel"
				v-model:tel-confirmed="slotProps.data.tel_confirmed"
			>
			</UserTel>

			<UserEmail
				v-model:email="slotProps.data.email"
				v-model:email-confirmed="slotProps.data.email_confirmed"
			>
			</UserEmail>
			<!--
			<Edit
				id="email"
				:label="t('UserProfile.email.label')"
				type="text"
				required
				:title="$t('UserProfile.email.title')"
				v-model="slotProps.data.email"
			/>
			<div 
				v-if="slotProps.data.email_confirmed"
				class="mt-2 text-sm text-gray-500 text-center">
				{{ $t('UserProfile.email.confirmed') }}
			</div>
			-->

			<UserPassword />

			<!-- is_enterprise radio group -->
			<UserIsEnterprise v-model="slotProps.data.is_enterprise">
			</UserIsEnterprise>

			<Transition name="fade">
				<ClientDetailPublic
					v-if="slotProps.data.is_enterprise"
					v-model:client="slotProps.data.client"
				>
				</ClientDetailPublic>
			</Transition>

			<div>
				<label for="sendActionInf" class="label-public">{{
					t('Login.sendActionInf.label')
				}}</label>
				<input
					id="sendActionInf"
					type="checkbox"
					v-model="slotProps.data.send_action_inf"
				/>
			</div>
		</template>

		<template v-slot:commands>
			<FormCommands @save="onSave" />
		</template>
	</FormCustom>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { type FormData, type FormKeys } from '@/lib/types/form';
import { type FormErrorList } from '@/lib/utils/useValidation';
import FormCustom from '@/lib/components/FormCustom.vue';
import FormCommands from '@/lib/components/FormCommands.vue';
import Edit from '@/lib/components/Edit.vue';

import UserTel from '@/components/UserTel.vue';
import UserEmail from '@/components/UserEmail.vue';
import UserPassword from '@/components/UserPassword.vue';
import UserIsEnterprise from '@/components/UserIsEnterprise.vue';
import ClientDetailPublic from '@/components/ClientDetailPublic.vue';
import { type UserKey, type UserProfile } from '@/models/user';
import { userFields } from '@/dataFields/user';
import type {
	FormCustomExposed,
	FormCustomProps,
} from '@/lib/types/formCustom';
import { userProfile, userProfileUpdate } from '@/services/user';
import type { FormSrvOperations } from '@/lib/types/form';
import { FormSrvOperation } from '@/lib/types/form';

//
interface SlotProps {
	data: UserProfile;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const formRef = ref<FormCustomExposed | null>(null);

const objectKeys = ref<UserKey>({ id: 0 });

const srvOperations = <FormSrvOperations>{
	[FormSrvOperation.fetch]: userProfile,
	[FormSrvOperation.update]: userProfileUpdate,
};

const controlList = [
	{
		id: 'id',
		field: userFields.id,
	},
	{
		id: 'name',
		field: userFields.name,
	},
	{
		id: 'email',
		field: userFields.email,
	},
	{
		id: 'tel',
		field: userFields.tel,
	},
	{
		id: 'tel_verified',
		field: userFields.tel_verified,
	},
	{
		id: 'email_verified',
		field: userFields.email_verified,
	},
	{
		id: 'send_action_inf',
		field: userFields.send_action_inf,
	},
	{
		id: 'is_enterprise',
		field: userFields.is_enterprise,
	},
	{
		id: 'client',
		field: userFields.client,
	},
];

const onKeysUpdate = (newKeys: FormKeys) => {
	objectKeys.value = newKeys as unknown as UserKey;
};

const formData = ref<FormData>({});
const onFormDataUpdate = (newFormData: FormData) => {
	formData.value = newFormData;
};

const onSave = () => {
	if (formRef.value) {
		formRef.value.onSave();
	}
};
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[180px];
}
</style>
