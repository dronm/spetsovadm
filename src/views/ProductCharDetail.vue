<template>
	<div class="detail-title">{{ t('ProductCharDetail.viewTitle') }}</div>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(
				productCharAdd,
				productCharUpdate,
				productCharDetail,
			)
		"
		collectionRoute="productCharList"
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
				id="title"
				:label="$t('ProductCharDetail.title.label')"
				:title="$t('ProductCharDetail.title.title')"
				:placeholder="$t('ProductCharDetail.title.placeholder')"
				v-model="slotProps.data.title"
				:error="slotProps.errors['title']"
			>
			</Edit>
			<Edit
				id="prompt"
				:label="$t('ProductCharDetail.prompt.label')"
				:title="$t('ProductCharDetail.prompt.title')"
				:placeholder="$t('ProductCharDetail.prompt.placeholder')"
				v-model="slotProps.data.prompt"
				:error="slotProps.errors['prompt']"
			>
			</Edit>
			<Edit
				id="comment_text"
				:label="$t('ProductCharDetail.comment_text.label')"
				:title="$t('ProductCharDetail.comment_text.title')"
				:placeholder="$t('ProductCharDetail.comment_text.placeholder')"
				v-model="slotProps.data.comment_text"
				:error="slotProps.errors['comment_text']"
			>
			</Edit>
			<EditCheckbox
				id="visible"
				:label="$t('ProductCharDetail.visible.label')"
				:title="$t('ProductCharDetail.visible.title')"
				v-model="slotProps.data.visible"
				:error="slotProps.errors['visible']"
			>
			</EditCheckbox>

			<ProductCharValueList :product-char-id="slotProps.data.id">
			</ProductCharValueList>
		</template>
	</FormCustom>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';
import FormCustom from '@/lib/components/FormCustom.vue';
import { type FormViewProps } from '@/lib/types/formView';
import { newFormSrvOperations } from '@/lib/types/form';
import EditCheckbox from '@/lib/components/EditCheckbox.vue';

import {
	productCharAdd,
	productCharUpdate,
	productCharDetail,
} from '@/services/productChar';
import { productCharFields } from '@/dataFields/productChar';
import ProductCharValueList from '@/views/ProductCharValueList.vue';

const props = defineProps<FormViewProps>();

const { t } = useI18n();

const controlList = [
	{
		id: 'title',
		field: productCharFields.title,
	},
	{
		id: 'prompt',
		field: productCharFields.prompt,
	},
	{
		id: 'comment_text',
		field: productCharFields.comment_text,
	},
	{
		id: 'visible',
		field: productCharFields.visible,
	},
	// {
	// 	id: 'enabled',
	// 	field: productCharFields.enabled,
	// },
	// {
	// 	id: 'ref_1c',
	// 	field: productCharFields.ref_1c,
	// },
];
</script>
