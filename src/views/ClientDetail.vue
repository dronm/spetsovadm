<template>
	<div class="detail-title">{{ t('ClientDetail.title') }}</div>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(clientAdd, clientUpdate, clientDetail)
		"
		collectionRoute="clientList"
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
				:label="$t('ClientDetail.name.label')"
				:title="$t('ClientDetail.name.title')"
				:placeholder="$t('ClientDetail.name.placeholder')"
				v-model="slotProps.data.name"
				:error="slotProps.errors['name']"
			>
			</Edit>

			<Edit
				id="name_full"
				:required="true"
				:label="$t('ClientDetail.name_full.label')"
				:title="$t('ClientDetail.name_full.title')"
				:placeholder="$t('ClientDetail.name_full.placeholder')"
				v-model="slotProps.data.name_full"
				:error="slotProps.errors['name_full']"
			>
			</Edit>
			<EditInn
				id="inn"
				:label="$t('ClientDetail.inn.label')"
				:title="$t('ClientDetail.inn.title')"
				v-model="slotProps.data.inn"
				:error="slotProps.errors['inn']"
			>
			</EditInn>

			<Edit
				id="ogrn"
				:label="$t('ClientDetail.ogrn.label')"
				:title="$t('ClientDetail.ogrn.title')"
				v-model="slotProps.data.ogrn"
				:error="slotProps.errors['ogrn']"
			>
			</Edit>

			<Edit
				id="okpo"
				:label="$t('ClientDetail.okpo.label')"
				:title="$t('ClientDetail.okpo.title')"
				v-model="slotProps.data.okpo"
				:error="slotProps.errors['okpo']"
			>
			</Edit>

			<Edit
				id="okved"
				:label="$t('ClientDetail.okved.label')"
				:title="$t('ClientDetail.okved.title')"
				v-model="slotProps.data.okved"
				:error="slotProps.errors['okved']"
			>
			</Edit>
			<Edit
				id="address_legal"
				:label="$t('ClientDetail.address_legal.label')"
				:title="$t('ClientDetail.address_legal.title')"
				v-model="slotProps.data.address_legal"
				:error="slotProps.errors['address_legal']"
			>
			</Edit>
			<Edit
				id="address_fact"
				:label="$t('ClientDetail.address_fact.label')"
				:title="$t('ClientDetail.address_fact.title')"
				v-model="slotProps.data.address_fact"
				:error="slotProps.errors['address_fact']"
			>
			</Edit>
			<Edit
				id="boss_name"
				:label="$t('ClientDetail.boss_name.label')"
				:title="$t('ClientDetail.boss_name.title')"
				v-model="slotProps.data.boss_name"
				:error="slotProps.errors['boss_name']"
			>
			</Edit>
			<Edit
				id="boss_post"
				:label="$t('ClientDetail.boss_post.label')"
				:title="$t('ClientDetail.boss_post.title')"
				v-model="slotProps.data.boss_post"
				:error="slotProps.errors['boss_post']"
			>
			</Edit>
			<Edit
				id="tels"
				:label="$t('ClientDetail.tels.label')"
				:title="$t('ClientDetail.tels.title')"
				v-model="slotProps.data.tels"
				:error="slotProps.errors['tels']"
			>
			</Edit>
			<Edit
				id="emails"
				:label="$t('ClientDetail.emails.label')"
				:title="$t('ClientDetail.emailss.title')"
				v-model="slotProps.data.emails"
				:error="slotProps.errors['emails']"
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

import { type ClientDetail } from '@/models/client';
import { clientAdd, clientDetail, clientUpdate } from '@/services/client';
import { clientFields } from '@/dataFields/client';
import EditInn from '../components/EditInn.vue';

//
interface SlotProps {
	data: ClientDetail;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const formRef = ref<FormCustomExposed | null>(null);

const controlList = [
	{
		id: 'id',
		field: clientFields.id,
	},
	{
		id: 'name',
		field: clientFields.name,
	},
	{
		id: 'name_full',
		field: clientFields.name_full,
	},
	{
		id: 'inn',
		field: clientFields.inn,
	},
	{
		id: 'kpp',
		field: clientFields.kpp,
	},
	{
		id: 'okved',
		field: clientFields.okved,
	},
	{
		id: 'okpo',
		field: clientFields.okpo,
	},
	{
		id: 'address_legal',
		field: clientFields.address_legal,
	},
	{
		id: 'address_fact',
		field: clientFields.address_fact,
	},
	{
		id: 'tels',
		field: clientFields.tels,
	},
	{
		id: 'email',
		field: clientFields.email,
	},
	{
		id: 'boss_name',
		field: clientFields.boss_name,
	},
	{
		id: 'boss_post',
		field: clientFields.boss_post,
	},
	{
		id: 'ogrn',
		field: clientFields.ogrn,
	},
];
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[280px];
}
</style>
