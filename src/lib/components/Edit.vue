//----template----
<template>
	<div class="control-container">
		<div class="flex flex-col items-start gap-1.5 self-stretch">
		<label :for="id" v-if="label" class="control-label">
			<span class="control-label-text">
				{{ label }}
			</span>
		</label>

		<div class="edit-container relative">
			<!-- before input buttons -->
			<!--
			<span class="edit-btn-container">
				<slot name="buttonsBefore"></slot>
			</span>
			-->

			<!-- core input 
				:class="[
					isValid ? 'edit-control' : 'edit-control-invalid',
					{ 'no-right-radius': hasActions },
				]"

-->
			<input
				id="id"
				:name="name"
				ref="inputControl"
				:type="type"
				class="edit-control-input"
				v-bind="$attrs"
				v-model="model"
				:required="required"
				:disabled="disabled"
				:title="title"
				:maxlength="maxLength"
				:placeholder="placeholder"
				@input="onChange"
				@focus="onFocus"
				@blur="onBlur"
				@keydown="handleKeyDown"
			/>

			<!-- autocompletion -->
			<template v-if="useAutocomplete">
				<ul
					v-if="acOpen && acResults && acResults.length"
					class="autocomplete-list"
				>
					<li
						v-for="(result, i) in acResults"
						:class="[
							'autocomplete-item',
							{ active: i == acCurrent },
						]"
						:key="i"
						@click="acClick(i)"
					>
						<div
							class="autocomplete-item-container"
							v-if="
								useAutocomplete.formatResultHtml ===
								true
							"
							v-html="acShowDescr(result)"
						></div>
						<template v-else>
							{{ acShowDescr(result) }}
						</template>
					</li>
				</ul>
			</template>

			<!-- after input buttons 
			<span :class="['edit-btn-container', { 'no-left-radius': hasActions }]">
				<slot name="actions"></slot>

				<BtnClear v-if="actClear" @click="onClear"> </BtnClear>
			</span>
-->
		</div>

		<!-- any other information -->
		<div>
			<slot name="inf"></slot>
		</div>

		<!-- error -->
		<div v-if="!isValid" class="error-message">
			{{ error }}
		</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, shallowRef, onMounted, onUnmounted, computed, useSlots, nextTick } from "vue";

import BtnClear from "./BtnClear.vue";
import { type EditProps } from "../types/edit";

defineOptions({
	inheritAttrs: false,
});

//TODO: make type a Enum
//default values
const {
	id,
	type = "text",
	name,
	disabled = false,
	label,
	required = false,
	placeholder,
	maxLength,
	title,
	focus,
	useAutocomplete,
	actClear = true,
	error,
} = defineProps<EditProps>();

// defineOptions({
//   inheritAttrs: false
// });

const isValid = computed(() => !error || !error.length);

const hasActions = computed(() => !!useSlots().actions || actClear === true);

const inputControl = ref(null);
// const model = defineModel<any>("modelValue", { required: false });
const [model, modifiers] = defineModel<any>("modelValue", {
	required: false,
	set(value: any) {
		if (modifiers.capitalize) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
		return value;
	},
	// set(value, { modifiers }) {
	//   if (modifiers.capitalize && typeof value === "string") {
	//     value = value.charAt(0).toUpperCase() + value.slice(1);
	//   }
	//   return value;
	// }
});

const emit = defineEmits<{
	autocomplete: [row: Record<string, any>];
	"update:modelValue": [newVal: string];
}>();

const acOpen = ref<boolean>(useAutocomplete?.open || false);
const acResults = shallowRef(useAutocomplete?.rows || []);
const acCurrent = ref(0);

watch(acOpen, (newVal: any) => {
	// console.log(`watch acOpen change for id:${id}, newVal=${newVal}`)
	if (newVal) {
		acCurrent.value = 0;
	}
});

const acLoading = ref(false);
const acError = ref<string | undefined>(undefined);

//called only when useAutocomplete is defined.
const acFilterResults = async () => {
	// if (!model.value || !model.value.toString().length) {
	// 	return;
	// }
	acLoading.value = true;
	try {
		acError.value = undefined;
		if (useAutocomplete?.apiCall) {
			//server call
			let params: any;
			if (useAutocomplete.apiCallParams) {
				//collection params
				params = useAutocomplete.apiCallParams(model.value? model.value.toString() : "");
			} else {
				params = model.value;
			}
			try {
				const apiResult = await useAutocomplete.apiCall.func(params);
				if ("data" in apiResult && "agg" in apiResult) {
					acResults.value = apiResult.data; //collection with aggregation
				} else {
					acResults.value = apiResult; //plain data
				}
			} catch (err: unknown) {
				if (err instanceof Error) {
					acError.value = err.message;
				} else {
					acError.value = String(err);
				}
			}
		} else if (useAutocomplete && useAutocomplete.rows) {
			acResults.value = useAutocomplete.rows.filter((item: any) => {
				const descr = acDescr(item);
				return (
					descr
						.toLowerCase()
						.indexOf(model.value.toString().toLowerCase()) > -1
				);
			});
		}
	} finally {
		acLoading.value = false;
	}
};

const focusInput = () => {
	if (inputControl.value) {
		(inputControl.value as HTMLElement).focus();
	}
};

const onChange = () => {
	if (useAutocomplete) {
		nextTick(() => {
			if (
				!useAutocomplete.minLenForQuery ||
				(!model.value || model.value.toString().length >= useAutocomplete.minLenForQuery)
			) {
				acFilterResults();
				acOpen.value = true;
				// acCurrent.value = 0;
			} else if (acOpen.value) {
				acOpen.value = false;
			}
		});
	}
};

const onFocus = () => {
	if (useAutocomplete) {
		// acOpen.value = true;
		// console.log("focus autocomplete!", acResults.value.length, autocomplete.minLenForQuery)
		setTimeout(() => {
			if(!acResults.value.length && !useAutocomplete.minLenForQuery){
				acFilterResults();
			}
			acOpen.value = true;
		}, 100); // Small delay prevents race condition
	}
};

const onBlur = (event: FocusEvent) => {
	if (!useAutocomplete) {
		return;
	}
	setTimeout(() => {
		const relatedTarget = event.relatedTarget as HTMLElement;
		if (relatedTarget && relatedTarget.closest(".autocomplete-list")) {
			return; // If the next focused element is inside the autocomplete, do nothing
		}
		acOpen.value = false;
	}, 200); // Small delay allows the click event to be processed
};

const handleKeyDown = (event: KeyboardEvent) => {
	if (!useAutocomplete || !acOpen.value || acResults.value.length === 0) {
		return;
	}

	switch (event.key) {
		case "ArrowDown":
			event.preventDefault(); // Prevent cursor movement
			acCurrent.value = (acCurrent.value + 1) % acResults.value.length;
			break;

		case "ArrowUp":
			event.preventDefault();
			acCurrent.value =
				(acCurrent.value - 1 + acResults.value.length) %
				acResults.value.length;
			break;

		case "Enter":
			event.preventDefault();
			acClick(acCurrent.value);
			break;

		case "Escape":
			event.preventDefault();
			acOpen.value = false;
			break;
	}
};

const acClose = (event: any) => {
	setTimeout(() => {
		const target = event.target as HTMLElement;
		if (
			target.closest(".edit-container") || // Ignore clicks inside the input and button container
			target.closest(".autocomplete-list") // Ignore clicks inside the autocomplete dropdown
		) {
			return;
		}
		acOpen.value = false;
	}, 10);
};

const acClick = (index: number) => {
	if (!useAutocomplete) {
		return;
	}
	acOpen.value = false;
	acCurrent.value = 0;
	// focusInput();
	emit("autocomplete", acResults.value[index]);
};

//acDescr returns string represntation. If autocomplete.descrFields array is not
//defined, then all fields will be returned as description. Otherwise
//only fields from descrFields array will be returned.
//Result fields are concatenated using descrFieldConcat property or sapce.
const acDescr = (row: any): string => {
	let descr = "";

	for (const fieldId in row) {
		if (
			useAutocomplete &&
			useAutocomplete.descrFields &&
			!useAutocomplete.descrFields.includes(fieldId)
		) {
			continue;
		}
		if (descr != "" && useAutocomplete) {
			descr += useAutocomplete.descrFieldConcat || " ";
		}
		descr += row[fieldId];
	}
	return descr;
};

//show formatted description string or html.
const acShowDescr = (row: Record<string, any>): string => {
	let descr = "";
	if (useAutocomplete?.formatFunction) {
		descr = useAutocomplete.formatFunction(row);
	} else {
		//default format
		descr = acDescr(row);
	}
	return descr;
};

const onClear = () => {
	emit("update:modelValue", "");
	focusInput();
};

onMounted(() => {
	if (focus) {
		focusInput();
		onFocus();
	}
	if (useAutocomplete) {
		document.addEventListener("click", acClose);
	}
});

onUnmounted(() => {
	if (useAutocomplete) {
		document.removeEventListener("click", acClose);
	}
});
</script>
