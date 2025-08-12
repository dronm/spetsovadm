<template>
	<div class="detail-title">{{ t('SupplierDetail.title') }}</div>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(supplierAdd, supplierUpdate, supplierDetail)
		"
		collectionRoute="supplierList"
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
				:label="$t('SupplierDetail.name.label')"
				:title="$t('SupplierDetail.name.title')"
				:placeholder="$t('SupplierDetail.name.placeholder')"
				v-model="slotProps.data.name"
				:error="slotProps.errors['name']"
			>
			</Edit>

			<EditInn
				id="inn"
				:label="$t('SupplierDetail.inn.label')"
				:title="$t('SupplierDetail.inn.title')"
				v-model="slotProps.data.inn"
				:error="slotProps.errors['inn']"
			>
			</EditInn>

			<Edit
				id="ogrn"
				:label="$t('SupplierDetail.ogrn.label')"
				:title="$t('SupplierDetail.ogrn.title')"
				v-model="slotProps.data.ogrn"
				:error="slotProps.errors['ogrn']"
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

import { type SupplierDetail } from '@/models/supplier';
import {
	supplierAdd,
	supplierDetail,
	supplierUpdate,
} from '@/services/supplier';
import { supplierFields } from '@/dataFields/supplier';
import EditInn from '../components/EditInn.vue';

//
interface SlotProps {
	data: SupplierDetail;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const formRef = ref<FormCustomExposed | null>(null);

const controlList = [
	{
		id: 'id',
		field: supplierFields.id,
	},
	{
		id: 'name',
		field: supplierFields.name,
	},
	{
		id: 'inn',
		field: supplierFields.inn,
	},
	{
		id: 'ogrn',
		field: supplierFields.ogrn,
	},
];
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[280px];
}
</style>
