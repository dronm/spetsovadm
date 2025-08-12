<template>
	<div class="detail-title">{{ t('NotifTemplateDetail.title') }}</div>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(
				notifTemplateAdd,
				notifTemplateUpdate,
				notifTemplateDetail,
			)
		"
		collectionRoute="notifTemplateList"
		:error="props.error"
		:isNew="props.isNew"
		:data="{ id: 0 }"
		:currentId="props.currentId"
	>
		<!-- custom template -->
		<template
			:currentId="props.currentId"
			v-slot:controls="slotProps: SlotProps"
		>
			<Edit
				id="notif_provider"
				:label="$t('NotifTemplateDetail.notif_provider.label')"
				:title="$t('NotifTemplateDetail.notif_provider.title')"
				:placeholder="
					$t('NotifTemplateDetail.notif_provider.placeholder')
				"
				v-model="slotProps.data.notif_provider"
				:error="slotProps.errors['notif_provider']"
			>
			</Edit>

			<Edit
				id="notif_type"
				:label="$t('NotifTemplateDetail.notif_type.label')"
				:title="$t('NotifTemplateDetail.notif_type.title')"
				:placeholder="$t('NotifTemplateDetail.notif_type.placeholder')"
				v-model="slotProps.data.notif_type"
				:error="slotProps.errors['notif_type']"
			>
			</Edit>

			<Edit
				id="template"
				:label="$t('NotifTemplateDetail.template.label')"
				:title="$t('NotifTemplateDetail.template.title')"
				:placeholder="$t('NotifTemplateDetail.template.placeholder')"
				v-model="slotProps.data.template"
				:error="slotProps.errors['template']"
			>
			</Edit>

			<NotifTemplateProviderValues
				v-model="slotProps.data.provider_values"
				:error="slotProps.errors['provider_values']"
			>
			</NotifTemplateProviderValues>

			<NotifTemplateFields
				v-model="slotProps.data.fields"
				:error="slotProps.errors['fields']"
			>
			</NotifTemplateFields>

			<Edit
				id="comment_text"
				:label="$t('NotifTemplateDetail.comment_text.label')"
				:title="$t('NotifTemplateDetail.comment_text.title')"
				:placeholder="
					$t('NotifTemplateDetail.comment_text.placeholder')
				"
				v-model="slotProps.data.comment_text"
				:error="slotProps.errors['comment_text']"
			>
			</Edit>
		</template>
	</FormCustom>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import FormCustom from '@/lib/components/FormCustom.vue';
import Edit from '@/lib/components/Edit.vue';
import { type FormErrorList } from '@/lib/utils/useValidation';
import type {
	FormCustomExposed,
	FormCustomProps,
} from '@/lib/types/formCustom';
import { newFormSrvOperations } from '@/lib/types/form';

import NotifTemplateProviderValues from '@/components/NotifTemplateProviderValues.vue';
import NotifTemplateFields from '@/components/NotifTemplateFields.vue';
import { type NotifTemplateDetail } from '@/models/notifTemplate';
import {
	notifTemplateAdd,
	notifTemplateDetail,
	notifTemplateUpdate,
} from '@/services/notifTemplate';
import { notifTemplateFields } from '@/dataFields/notifTemplate';

//
interface SlotProps {
	data: NotifTemplateDetail;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const formRef = ref<FormCustomExposed | null>(null);

const controlList = [
	{
		id: 'id',
		field: notifTemplateFields.id,
	},
	{
		id: 'notif_provider',
		field: notifTemplateFields.notif_provider,
	},
	{
		id: 'notif_type',
		field: notifTemplateFields.notif_type,
	},
	{
		id: 'template',
		field: notifTemplateFields.template,
	},
	{
		id: 'fields',
		field: notifTemplateFields.fields,
	},
	{
		id: 'comment_text',
		field: notifTemplateFields.comment_text,
	},
	{
		id: 'provider_values',
		field: notifTemplateFields.provider_values,
	},
];
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[280px];
}
</style>
