<template>
	<EditRef
		id="brands_ref"
		:label="$t('BrandEdit.label')"
		v-bind="{
			...props,
			title: $t('BrandEdit.title'),
			placeholder: $t('BrandEdit.placeholder'),
		}"
		:keys="['id']"
		:actSelect="{
			selectType: BtnSelectType.view,
			selectProps: {
				winProps: SELECT_WIN_PROPS,
				routeName: 'brandList',
			},
		}"
		:useAutocomplete="autocomplete"
	>
	</EditRef>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import EditRef from '../lib/components/EditRef.vue';
import { BtnSelectType } from '../lib/types/btnSelect';
import { type EditAutocomplete } from '../lib/types/editAutocomplete';
import {
	FilterOperatorParam,
	type CollectionParams,
} from '../lib/types/collection';

import { brandList } from '../services/brand';
import { SELECT_WIN_PROPS } from '@/config/constants';

const props = defineProps();

const autocomplete = <EditAutocomplete>{
	descrFields: ['name'],
	apiCall: brandList,
	apiCallParams: function (search: string): CollectionParams {
		return {
			filter: [
				{
					f: {
						name: {
							o: FilterOperatorParam.ILK,
							v: `%${search}%`,
						},
					},
				},
			],
		};
	},
};

const { t } = useI18n();
</script>
