<template>
	<EditRef
		id="producers_ref"
		:label="$t('ProducerEdit.label')"
		v-bind="{
			...props,
			title: $t('ProducerEdit.title'),
			placeholder: $t('ProducerEdit.placeholder'),
		}"
		:keys="['id']"
		:actSelect="{
			selectType: BtnSelectType.view,
			selectProps: {
				winProps: SELECT_WIN_PROPS,
				routeName: 'producerList',
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

import { producerList } from '../services/producer';
import { SELECT_WIN_PROPS } from '@/config/constants';

const props = defineProps();

const autocomplete = <EditAutocomplete>{
	descrFields: ['name'],
	apiCall: producerList,
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
