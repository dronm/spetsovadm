<template>
	<DetailTitle
		:back-title="t('PromPointDetail.goBack')"
		:title="t('PromPointDetail.title')"
		back-route="promPointList"
	/>
	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(promPointAdd, promPointUpdate, promPointDetail)
		"
		collectionRoute="promPointList"
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
			<Edit
				id="name"
				:required="true"
				:label="$t('PromPointDetail.name.label')"
				:title="$t('PromPointDetail.name.title')"
				:placeholder="$t('PromPointDetail.name.placeholder')"
				v-model="slotProps.data.name"
				:error="slotProps.errors['name']"
			>
			</Edit>

			<EditText
				id="comment_text"
				:label="$t('PromPointDetail.comment_text.label')"
				:title="$t('PromPointDetail.comment_text.title')"
				v-model="slotProps.data.comment_text"
				:error="slotProps.errors['comment_text']"
			>
			</EditText>

			<EditDate
				id="created_at"
				:read-only="true"
				:label="$t('PromPointDetail.created_at.label')"
				:title="$t('PromPointDetail.created_at.title')"
				v-model="slotProps.data.created_at"
				:error="slotProps.errors['created_at']"
			>
			</EditDate>
			<EditDate
				id="updated_at"
				:read-only="true"
				:label="$t('PromPointDetail.updated_at.label')"
				:title="$t('PromPointDetail.updated_at.title')"
				v-model="slotProps.data.updated_at"
				:error="slotProps.errors['updated_at']"
			>
			</EditDate>
		</template>
	</FormCustom>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';
import EditText from '@/lib/components/EditText.vue';
import EditDate from '@/lib/components/EditDate.vue';
import FormCustom from '@/lib/components/FormCustom.vue';
import { type FormErrorList } from '@/lib/utils/useValidation';
import type {
	FormCustomExposed,
	FormCustomProps,
} from '@/lib/types/formCustom';
import { newFormSrvOperations } from '@/lib/types/form';
import DetailTitle from '@/components/DetailTitle.vue';

import { type PromPoint } from '@/models/promPoint';
import {
	promPointAdd,
	promPointDetail,
	promPointUpdate,
} from '@/services/promPoint';
import { promPointFields } from '@/models/promPoint';

//
interface SlotProps {
	data: PromPoint;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const formRef = ref<FormCustomExposed | null>(null);

const controlList = [
	{
		id: 'id',
		field: promPointFields.id,
	},
	{
		id: 'name',
		field: promPointFields.name,
	},
	{
		id: 'comment_text',
		field: promPointFields.comment_text,
	},
	{
		id: 'created_at',
		field: promPointFields.created_at,
	},
	{
		id: 'updated_at',
		field: promPointFields.updated_at,
	},
];
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[280px];
}
</style>
