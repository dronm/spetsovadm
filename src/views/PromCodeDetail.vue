<template>
	<div class="detail-title">{{ t('PromCodeDetail.title') }}</div>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(promCodeAdd, promCodeUpdate, promCodeDetail)
		"
		collectionRoute="promCodeList"
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
				:label="$t('PromCodeDetail.name.label')"
				:title="$t('PromCodeDetail.name.title')"
				:placeholder="$t('PromCodeDetail.name.placeholder')"
				v-model="slotProps.data.name"
				:error="slotProps.errors['name']"
			>
			</Edit>

			<Edit
				id="comment_text"
				:label="$t('PromCodeDetail.comment_text.label')"
				:title="$t('PromCodeDetail.comment_text.title')"
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

import Edit from '@/lib/components/Edit.vue';
import FormCustom from '@/lib/components/FormCustom.vue';
import { type FormErrorList } from '@/lib/utils/useValidation';
import type {
	FormCustomExposed,
	FormCustomProps,
} from '@/lib/types/formCustom';
import { newFormSrvOperations } from '@/lib/types/form';

import { type PromCodeDetail } from '@/models/promCode';
import {
	promCodeAdd,
	promCodeDetail,
	promCodeUpdate,
} from '@/services/promCode';
import { promCodeFields } from '@/models/promCode';

//
interface SlotProps {
	data: PromCodeDetail;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const formRef = ref<FormCustomExposed | null>(null);

const controlList = [
	{
		id: 'id',
		field: promCodeFields.id,
	},
	{
		id: 'name',
		field: promCodeFields.name,
	},
	{
		id: 'comment_text',
		field: promCodeFields.comment_text,
	},
];
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[280px];
}
</style>
