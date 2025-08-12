/* check if this form is used? */
<template>
	<form @keypress="onKeyPress">
		<div>
			<template v-for="field in fieldList">
				<component
					:is="
						useEditComponent(
							field.id,
							field.editControl,
							field.ControlType,
							field.dataType,
						)
					"
					v-bind="
						useEditComponentOpts(
							field.id,
							field.editControl,
							field.dataType,
						)
					"
					:id="field.id"
					:name="field.id"
					v-model="data[field.id]"
					:placeholder="field.label || field.id"
					:label="(field.label || field.id) + ':'"
					class="px-4 py-2 border border-gray-300"
					:focus="field.focus === true || field.id === fieldId"
				/>
			</template>
		</div>
		<div>
			<div v-if="error && error.length" class="form-error">
				{{ error }}
			</div>

			<template v-if="$slots.commands">
				<slot name="commands"></slot>
			</template>
			<template v-else>
				<Button @click="onSubmit" :title="$t('Form.submitTitle')">
					{{ t("Form.submitCaption") }}
				</Button>

				<Button @click="$emit('cancel')" :title="$t('Form.cancelTitle')">
					{{ t("Form.cancelCaption") }}
				</Button>
			</template>
		</div>
	</form>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Button from "./Button.vue";
import { useEditComponent, useEditComponentOpts } from "../utils/useForm";
import type { FormField, FormData } from "../types/form";

//properties
interface Props {
	fieldList: FormField[];
	data: FormData;
	error?: string;
	fieldId?: string;
}
const { fieldList, data, error, fieldId } = defineProps<Props>();

//emitted events
const emit = defineEmits<{
	submit: [data: FormData];
	cancel: [];
}>();

const { t } = useI18n();

const onKeyPress = (e: KeyboardEvent) => {
	if (e.key === "Enter" && e.ctrlKey) {
		onSubmit();
	} else if (e.key === "Escape") {
		emit("cancel");
	}
};

const onSubmit = () => {
	emit("submit", data);
};
</script>
