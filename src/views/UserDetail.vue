<template>
	<div class="detail-title">{{ t('UserDetail.title') }}</div>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="newFormSrvOperations(userAdd, userUpdate, userDetail)"
		collectionRoute="userList"
		:error="props.error"
		:isNew="props.isNew"
		:data="props.data"
		:currentId="props.currentId"
	>
		<!-- custom template -->
		<template
			:currentId="props.currentId"
			v-slot:controls="slotProps: SlotProps"
		>
			<tabs>
				<tab :title="$t('UserDetail.tabs.common')">
					<Edit
						id="name"
						:label="$t('UserDetail.name.label')"
						:title="$t('UserDetail.name.title')"
						:placeholder="$t('UserDetail.name.placeholder')"
						v-model="slotProps.data.name"
						:error="slotProps.errors['name']"
					>
					</Edit>

					<Edit
						id="email"
						:label="$t('UserDetail.email.label')"
						:title="$t('UserDetail.email.title')"
						:placeholder="$t('UserDetail.email.placeholder')"
						v-model="slotProps.data.email"
						:error="slotProps.errors['email']"
					>
					</Edit>
					<EditDropbox
						id="role_id"
						:label="$t('UserDetail.role_id.label')"
						:title="$t('UserDetail.role_id.title')"
						:items="enumDescriptions('role_types', Locale.ru)"
						v-model="slotProps.data.role_id"
						:error="slotProps.errors['role_id']"
					>
					</EditDropbox>
				</tab>

				<tab :title="$t('UserDetail.tabs.sessions')">
					<LoginDeviceList :userId="slotProps.data.id">
					</LoginDeviceList>

					<LoginList :userId="slotProps.data.id"> </LoginList>
				</tab>
			</tabs>
		</template>
	</FormCustom>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';
import Tabs from '@/lib/components/Tabs.vue';
import Tab from '@/lib/components/Tab.vue';
import FormCustom from '@/lib/components/FormCustom.vue';
import EditDropbox from '@/lib/components/EditDropbox.vue';
import { type FormViewProps } from '@/lib/types/formView';
import { newFormSrvOperations } from '@/lib/types/form';
import { Locale } from '@/lib/types/locale';

import { userAdd, userUpdate, userDetail } from '@/services/user';
import { userFields } from '@/dataFields/user';
import LoginDeviceList from '@/views/LoginDeviceList.vue';
import LoginList from '@/views/LoginList.vue';
import { enumDescriptions } from '@/enums/appEnum';

const props = defineProps<FormViewProps>();

const { t } = useI18n();

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
		id: 'role_id',
		field: userFields.role_id,
	},
];
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[180px];
}
</style>
