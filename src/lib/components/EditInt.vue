<template>
	<Edit
		v-bind="{
			...props,
			actClear: actClear !== undefined ? actClear : false,
		}"
		:modelValue="model"
		v-on="$attrs"
		@update:modelValue="($e) => (model = parseValue($e as string))"
		@paste="correctPastedData"
		@keydown="onKeyDown"
	>
		<template #actions>
			<slot name="actions">
				<BtnCalc
					v-if="props.actCalc !== false"
					@result="($e) => (model = $e)"
				>
				</BtnCalc>
			</slot>
		</template>
	</Edit>
</template>

<script setup lang="ts">
import Edit from "./Edit.vue";
import { type EditProps } from "../types/edit";
import BtnCalc from "./BtnCalc.vue";
import { useNumericInput } from "../composables/useNumericInput";

defineOptions({
	inheritAttrs: false,
});

const { correctPastedData, onKeyDown, parseValue } = useNumericInput();

const model = defineModel<number | undefined | null>();

interface EditIntProps extends EditProps {
	actCalc?: boolean;
}
const props = defineProps<EditIntProps>();
</script>
