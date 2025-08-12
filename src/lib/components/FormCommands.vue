<template>
	<div class="container-form-cmd">
		<Button
			v-if="onSubmitExists"
			@click="onSubmit"
			:title="$t('Form.submitTitle')"
			:disabled="!enabled"
		>
			{{ t("Form.submitCaption") }}
		</Button>

		<Button
			@click="onSave"
			v-if="onSaveExists"
			:title="$t('Form.saveTitle')"
			:disabled="!enabled"
		>
			{{ t("Form.saveCaption") }}
		</Button>

		<Button
			v-if="onCancelExists"
			@click="onCancel"
			:title="$t('Form.cancelTitle')"
			:disabled="!enabled"
		>
			{{ t("Form.cancelCaption") }}
		</Button>
	</div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Button from "./Button.vue";

//properties
interface Props {
	// data: FormControlData;
	enabled?: boolean;
}
const { enabled = true } = defineProps<Props>();

//emitted events
const emit = defineEmits<{
	submit: []; //data: FormControlData
	save: []; //data: FormControlData
	cancel: [];
}>();

const { t } = useI18n();

const onSubmit = () => {
	emit("submit"); //, data
};

const onCancel = () => {
	emit("cancel");
};

const onSave = () => {
	emit("save");
};

const instance = getCurrentInstance();
const onSubmitExists = ref(false);
const onCancelExists = ref(false);
const onSaveExists = ref(false);
onMounted(() => {
	const listeners = instance?.vnode.props;
	if (listeners && listeners["onSubmit"]) {
		onSubmitExists.value = true;
	}
	if (listeners && listeners["onCancel"]) {
		onCancelExists.value = true;
	}
	if (listeners && listeners["onSave"]) {
		onSaveExists.value = true;
	}
});
</script>
