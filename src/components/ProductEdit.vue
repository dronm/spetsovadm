<template>
	<EditRef
		id="products_ref"
		v-bind="{
			...props,
			title: $t('ProductEdit.title'),
			label: $t('ProductEdit.label'),
			placeholder: $t('ProductEdit.placeholder'),
		}"
		:keys="['id']"
		:actSelect="{
			selectType: BtnSelectType.view,
			selectProps: {
				winProps: SELECT_WIN_PROPS,
				routeName: 'productList',
			},
		}"
		:useAutocomplete="editAutocompleteEq('name', ['name'], productList)"
	>
	</EditRef>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import EditRef from '../lib/components/EditRef.vue';
import { BtnSelectType } from '../lib/types/btnSelect';
// import {
// 	FilterOperatorParam,
// 	type CollectionParams,
// } from '../lib/types/collection';

import { productList } from '../services/product';
import { SELECT_WIN_PROPS } from '@/config/constants';
import { editAutocompleteEq } from '@/utils/editAutocomplete';

const props = defineProps();

const { t } = useI18n();
</script>
