<template>
	<EditRef
		id="product_cats_ref"
		v-bind="{
			...props,
			title: $t('ProductCatEdit.title'),
			label: $t('ProductCatEdit.label'),
			placeholder: $t('ProductCatEdit.placeholder'),
		}"
		:keys="['id']"
		:actSelect="{
			selectType: BtnSelectType.view,
			selectProps: {
				winProps: SELECT_WIN_PROPS,
				routeName: 'productCatList',
			},
		}"
		:useAutocomplete="editAutocompleteEq('name', ['name'], productCatList)"
	>
	</EditRef>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import EditRef from '../lib/components/EditRef.vue';
import { BtnSelectType } from '../lib/types/btnSelect';
import { productCatList } from '../services/productCat';
import { SELECT_WIN_PROPS } from '@/config/constants';
import { editAutocompleteEq } from '@/utils/editAutocomplete';

const props = defineProps();

const { t } = useI18n();
</script>
