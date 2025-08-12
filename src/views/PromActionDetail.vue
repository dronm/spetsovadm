<template>
	<div class="detail-title">{{ t('PromActionDetail.title') }}</div>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(
				promActionAdd,
				promActionUpdate,
				promActionDetail,
			)
		"
		collectionRoute="promActionList"
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
				:label="$t('PromActionDetail.name.label')"
				:title="$t('PromActionDetail.name.title')"
				:placeholder="$t('PromActionDetail.name.placeholder')"
				v-model="slotProps.data.name"
				:error="slotProps.errors['name']"
			>
			</Edit>

			<Edit
				id="comment_text"
				:label="$t('PromActionDetail.comment_text.label')"
				:title="$t('PromActionDetail.comment_text.title')"
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

import { type PromActionDetail } from '@/models/promAction';
import {
	promActionAdd,
	promActionDetail,
	promActionUpdate,
} from '@/services/promAction';
import { promActionFields } from '@/models/promAction';

//
interface SlotProps {
	data: PromActionDetail;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const formRef = ref<FormCustomExposed | null>(null);

const controlList = [
	{
		id: 'id',
		field: promActionFields.id,
	},
	{
		id: 'name',
		field: promActionFields.name,
	},
	{
		id: 'comment_text',
		field: promActionFields.comment_text,
	},
];
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[280px];
}
</style>
