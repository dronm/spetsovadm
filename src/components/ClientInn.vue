<template>
	<EditNum
		id="inn"
		required
		:max-length="innLength"
		:title="$t('ClientInn.title')"
		:placeholder="$t('ClientInn.placeholder')"
		v-model="inn"
		:label="$t('ClientInn.label')"
		:actClear="true"
		:error="error"
		@keydown.enter="onEnter"
	>
		<template v-slot:actions>
			<ButtonAction
				:title="t('ClientInn.searchTitle')"
				@click="handleFindByInn"
			>
				<font-awesome-icon :icon="['fas', 'magnifying-glass']" />
			</ButtonAction>
		</template>
	</EditNum>
</template>

<script setup lang="ts">
import { toRaw, computed } from 'vue';
import { useI18n } from 'vue-i18n';

//lib imports
import EditNum from '@/lib/components/EditNum.vue';
import ButtonAction from '@/lib/components/Button.vue';
import { useAPIFetch } from '@/lib/composables/useAPIFetch';
import { ERROR_NOTIF_TIMEOUT } from '@/config/constants';
import { clientByInn } from '@/services/client';
import { type ClientDetail } from '@/models/client';

const { t } = useI18n();

const ENTERPRISE_LEN = 10;
const PERSON_LEN = 12;

interface ClientInnProps {
	isEnterprise?: boolean;
}
const { isEnterprise = false } = defineProps<ClientInnProps>();
const innLength = computed<number>(() =>
	isEnterprise ? ENTERPRISE_LEN : PERSON_LEN,
);

const inn = defineModel<string>('inn');
const error = defineModel<string>('error');
const emit = defineEmits<{
	'update-client': [data: ClientDetail];
}>();

const api = useAPIFetch(ERROR_NOTIF_TIMEOUT);

//fill by inn
const handleFindByInn = async () => {
	const len = inn.value ? inn.value.trim().length : 0;
	if (isEnterprise && len != ENTERPRISE_LEN) {
		error.value = t('ClientInn.errIncorrectLen', { len: ENTERPRISE_LEN });
		return;
	} else if (!isEnterprise && len != PERSON_LEN) {
		error.value = t('ClientInn.errIncorrectLen', { len: PERSON_LEN });
		return;
	}
	error.value = undefined;
	try {
		await api.fetch(clientByInn, inn.value);
		if (api.error.value) {
			throw new Error(api.error.value);
		}
		emit(
			'update-client',
			toRaw(api.result.value) as unknown as ClientDetail,
		);
	} catch (e: unknown) {
		error.value =
			e instanceof Error ? e.message || 'unknown error' : 'unknown error';
	}
};

const onEnter = () => {
	console.log('on enter');
};
</script>
