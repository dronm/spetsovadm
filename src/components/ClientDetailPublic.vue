<template>
	<div>
		<ClientInn
			:is-enterprise="true"
			v-model:inn="client.inn"
			@update-client="fillAttrs"
		>
		</ClientInn>

		<Edit
			id="kpp"
			required
			:max-length="10"
			:placeholder="$t('Client.kpp.placeholder')"
			v-model="client.kpp"
			:title="$t('Client.kpp.title')"
			:label="$t('Client.kpp.label')"
		>
		</Edit>
		<Edit
			id="ogrn"
			required
			:max-length="15"
			:placeholder="$t('Client.ogrn.placeholder')"
			v-model="client.ogrn"
			:title="$t('Client.ogrn.title')"
			:label="$t('Client.ogrn.label')"
		>
		</Edit>
		<Edit
			id="tels"
			required
			:title="$t('Client.tels.title')"
			:placeholder="$t('Client.tels.placeholder')"
			v-model="client.tels"
			:label="$t('Client.tels.label')"
		>
		</Edit>

		<Edit
			id="emails"
			required
			:title="$t('Client.emails.title')"
			:placeholder="$t('Client.emails.placeholder')"
			v-model="client.emails"
			:label="$t('Client.emails.label')"
		>
		</Edit>
		<Edit
			id="name"
			required
			:title="$t('Client.name.title')"
			:placeholder="$t('Client.name.placeholder')"
			v-model="client.name"
			:label="$t('Client.name.label')"
		>
		</Edit>
		<Edit
			id="address_legal"
			required
			:title="$t('Client.address_legal.title')"
			:placeholder="$t('Client.address_legal.placeholder')"
			v-model="client.address_legal"
			:label="$t('Client.address_legal.label')"
		>
		</Edit>
		<Edit
			id="address_fact"
			required
			:title="$t('Client.address_fact.title')"
			:placeholder="$t('Client.address_fact.placeholder')"
			v-model="client.address_fact"
			:label="$t('Client.address_fact.label')"
		>
		</Edit>
		<Edit
			id="name_full"
			required
			:title="$t('Client.name_full.title')"
			:placeholder="$t('Client.name_full.placeholder')"
			v-model="client.name_full"
			:label="$t('Client.name_full.label')"
		>
		</Edit>
		<Edit
			id="boss_name"
			required
			:title="$t('Client.boss_name.title')"
			:placeholder="$t('Client.boss_name.placeholder')"
			v-model.capitalize="client.boss_name"
			:label="$t('Client.boss_name.label')"
		>
		</Edit>
		<Edit
			id="boss_post"
			required
			:placeholder="$t('Client.boss_post.placeholder')"
			v-model="client.boss_post"
			:label="$t('Client.boss_post.label')"
		>
		</Edit>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';

import { type ClientDetail } from '@/models/client';
import ClientInn from '@/components/ClientInn.vue';

const { t } = useI18n();

const extClient = defineModel<ClientDetail | null>('client');
const defClient: ClientDetail = {
	name: '',
	inn: '',
	ogrn: '',
};
const client = ref<ClientDetail>({ ...defClient });

watch(
	() => extClient.value,
	(newVal) => {
		if (newVal) {
			client.value = { ...defClient, ...newVal };
		}
	},
	{ immediate: true },
);

watch(
	client,
	(newVal) => {
		if (JSON.stringify(extClient.value) !== JSON.stringify(newVal)) {
			extClient.value = { ...newVal };
		}
	},
	{ deep: true },
);

const fillAttrs = (newClient: ClientDetail) => {
	Object.assign(client.value, newClient);
};
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[180px];
}
</style>
