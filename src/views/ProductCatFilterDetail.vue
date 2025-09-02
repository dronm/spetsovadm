<template>
	<DetailTitle
		:back-title="t('ProductCatFilterDetail.goBack')"
		:title="t('ProductCatFilterDetail.title')"
		back-route="productCatFilterList"
	/>

	<FormCustom
		ref="formRef"
		:key-types="{ ref_1c: 'string' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(
				productCatFilterAdd,
				productCatFilterUpdate,
				productCatFilterDetail,
			)
		"
		collectionRoute="productCatFilterList"
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
				:label="$t('ProductCatFilterDetail.name.label')"
				:title="$t('ProductCatFilterDetail.name.title')"
				:placeholder="$t('ProductCatFilterDetail.name.placeholder')"
				v-model="slotProps.data.name"
				:error="slotProps.errors['name']"
			>
			</Edit>

			<ProductCatFilterValues v-model="slotProps.data.values">
			</ProductCatFilterValues>
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

import { type ProductCatFilterDetail } from '@/models/productCatFilter';
import {
	productCatFilterAdd,
	productCatFilterDetail,
	productCatFilterUpdate,
} from '@/services/productCatFilter';
import { productCatFilterFields } from '@/dataFields/productCatFilter';
import ProductCatFilterValues from '@/components/ProductCatFilterValues.vue';
import DetailTitle from '@/components/DetailTitle.vue';

//
interface SlotProps {
	data: ProductCatFilterDetail;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const formRef = ref<FormCustomExposed | null>(null);

const controlList = [
	{
		id: 'ref_1c',
		field: productCatFilterFields.ref_1c,
	},
	{
		id: 'name',
		field: productCatFilterFields.name,
	},
	{
		id: 'values',
		field: productCatFilterFields.values,
	},
];
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[280px];
}
</style>
