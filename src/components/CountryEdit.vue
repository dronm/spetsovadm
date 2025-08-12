<template>
	<EditRef
		id="countries_ref"
		:label="$t('CountryEdit.label')"
		v-bind="{
			...props,
			title: $t('CountryEdit.title'),
			placeholder: $t('CountryEdit.placeholder'),
		}"
		:keys="['id']"
		:actSelect="{
			selectType: BtnSelectType.view,
			selectProps: {
				winProps: SELECT_WIN_PROPS,
				routeName: 'countryList',
			},
		}"
		:useAutocomplete="editAutocomplete(countryList)"
	>
	</EditRef>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import EditRef from '@/lib/components/EditRef.vue';
import { BtnSelectType } from '@/lib/types/btnSelect';
// import { type EditAutocomplete } from '@/lib/types/editAutocomplete';
// import {
// 	FilterOperatorParam,
// 	type CollectionParams,
// } from '../lib/types/collection';
import { editAutocomplete } from '@/lib/utils/editAutocomplete';

import { countryList } from '../services/country';
import { SELECT_WIN_PROPS } from '@/config/constants';

const props = defineProps();

// const autocomplete = <EditAutocomplete>{
// 	descrFields: ['name'],
// 	apiCall: countryList,
// 	apiCallParams: function (search: string): CollectionParams {
// 		return {
// 			filter: [
// 				{
// 					f: {
// 						name: {
// 							o: FilterOperatorParam.ILK,
// 							v: `%${search}%`,
// 						},
// 					},
// 				},
// 			],
// 		};
// 	},
// };

const { t } = useI18n();
</script>
