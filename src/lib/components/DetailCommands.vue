<template>
	<Button @click="onSubmit" :title="$t('Form.submitTitle')">
		{{ t("Form.submitCaption") }}
	</Button>

	<Button @click="onSave" :title="$t('Form.saveTitle')">
		{{ t("Form.saveCaption") }}
	</Button>

	<Button @click="$emit('cancel')" :title="$t('Form.cancelTitle')">
		{{ t("Form.cancelCaption") }}
	</Button>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Button from "./Button.vue";
import type { FormData } from "../types/form";

//properties
interface Props {
	data: FormData;
}
const { data } = defineProps<Props>();

//emitted events
const emit = defineEmits<{
	submit: [data: FormData];
	save: [data: FormData];
	cancel: [];
}>();

const { t } = useI18n();

const onSubmit = () => {
	emit("submit", data);
};

const onSave = () => {
	emit("save", data);
};
</script>
