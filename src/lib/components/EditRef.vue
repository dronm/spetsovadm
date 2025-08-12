<template>
	<Edit
		:id="$attrs.id as string"
		:label="(!$attrs.inline && $attrs.label) ? ($attrs.label as string) : undefined"
		:useAutocomplete="useAutocomplete"
		v-bind="$attrs"
		autocomplete="off"
		type="text"
		:modelValue="model?.descr"
		@update:modelValue="updateDescr"
		@autocomplete="onSelectRef"
	>
		<template v-slot:actions>
			<template v-if="actOpen && model && model.keys">
				<BtnOpen v-bind="actOpen" :keys="model.keys"> </BtnOpen>
			</template>
			<template v-else-if="actAdd && (!model || !model.keys)">
				<BtnAdd v-bind="actAdd"> </BtnAdd>
			</template>

			<template v-if="actSelect">
				<BtnSelect v-bind="actSelect" @select="onSelectRef"> </BtnSelect>
			</template>
		</template>
	</Edit>
</template>

<script setup lang="ts">
import Edit from "./Edit.vue";
import BtnOpen from "./BtnOpen.vue";
import { type BtnOpenProps } from "../types/btnOpen";
import BtnSelect from "./BtnSelect.vue";
import { type BtnSelectProps } from "../types/btnSelect";
import BtnAdd from "./BtnAdd.vue";
import { type Ref } from "../types/ref";
import { type BtnAddProps } from "../types/btnAdd";
import type { EditAutocomplete } from "../types/editAutocomplete.ts";

export type SelectedRef = Ref & Record<string, any>;

export interface EditRefProps {
	actOpen?: BtnOpenProps;
	actSelect?: BtnSelectProps;
	actAdd?: BtnAddProps;
	keys?: string[];
	useAutocomplete: EditAutocomplete;
}

const {
	actOpen,
	actSelect,
	actAdd,
	keys = ["id"],
	useAutocomplete,
} = defineProps<EditRefProps>();

const model = defineModel<SelectedRef | undefined>(undefined);
const emit = defineEmits(["update:modelValue"]);

const onSelectRef = (data: Record<string, any> | undefined) => {
	if (!data) {
		return;
	}
	//setting keys
	const keyValues: Record<string, any> = {};
	keys.forEach((key: string) => {
		keyValues[key] = data[key];
	});
	let objDescr = "";
	if (useAutocomplete.formatFunction && typeof useAutocomplete.formatFunction == "function") {
		objDescr = useAutocomplete.formatFunction(data);
	} else if(useAutocomplete.descrFields) {
		useAutocomplete.descrFields.forEach((f: string) => {
			objDescr += objDescr == "" ? "" : " ";
			objDescr += data[f];
		});
	}
	const res = <SelectedRef>{ keys: keyValues, descr: objDescr };
	if(useAutocomplete.dataFields){
		//plus other fields
		useAutocomplete.dataFields.forEach((f: string) => {
			if(data[f] != undefined){
				res[f] = data[f];
			}
		});
	}
	emit("update:modelValue", res);
};

const updateDescr = (newDescr: unknown) => {
	//descr = '' - clearing
	if (typeof newDescr === "string") {
		emit(
			"update:modelValue",
			newDescr == "" ? undefined : { keys: null, descr: newDescr },
		);
	}
};
</script>
