/* * Search form for a grid. */
<template>
	<div>
		<Component
			v-if="currentColumn"
			ref="componentRef"
			:is="
				useEditComponent(
					currentColumn.id,
					currentColumn.editControl,
					currentColumn.controlType,
					currentColumn.field?.dataType,
				)
			"
			v-bind="
				useEditComponentOpts(
					currentColumn.id,
					currentColumn.editControl,
					currentColumn.field,
				)
			"
			v-model="searchValue"
			:label="$t('GridSearch.searchValue')"
			@keydown.enter="doSearch"
		>
		</Component>

		<EditDropbox
			id="gridSearch"
			required
			:label="$t('GridSearch.columnList')"
			:items="columnItems"
			v-model="currentColumnId"
		>
		</EditDropbox>

		<!-- if column is num/string/Date(?) -->
		<fieldset v-if="searchTypeVis">
			<legend>{{ t("GridSearch.searchType.title") }}</legend>

			<div>
				<input
					type="radio"
					id="onBeg"
					name="searchType"
					:value="GridSearchType.ON_BEG"
					v-model="searchType"
				/>
				<label for="onBeg">{{ t("GridSearch.searchType.onBegin") }}</label>
			</div>

			<div>
				<input
					type="radio"
					id="onPart"
					name="searchType"
					:value="GridSearchType.ON_PART"
					checked
					v-model="searchType"
				/>
				<label for="onPart">{{ t("GridSearch.searchType.onPart") }}</label>
			</div>

			<div>
				<input
					type="radio"
					id="onEnd"
					name="searchType"
					:value="GridSearchType.ON_END"
					v-model="searchType"
				/>
				<label for="onEnd">{{ t("GridSearch.searchType.onEnd") }}</label>
			</div>

			<div>
				<input
					type="radio"
					id="onExact"
					name="searchType"
					:value="GridSearchType.ON_EXACT"
					v-model="searchType"
				/>
				<label for="onEnd">{{ t("GridSearch.searchType.onExact") }}</label>
			</div>
		</fieldset>

		<div>
			<Button @click="doSearch" :title="t('GridSearch.cmdSearch.title')">
				{{ t("GridSearch.cmdSearch.caption") }}
			</Button>

			<Button @click="doCancel" :title="t('GridSearch.cmdCancel.title')">
				{{ t("GridSearch.cmdCancel.caption") }}
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, nextTick } from "vue";
import { useI18n } from "vue-i18n";

import EditDropbox from "./EditDropbox.vue";
import Button from "./Button.vue";
import { GridSearchType, type GridSearchProps } from "../types/GridSearch";
import type { GridCol } from "../types/grid";
import { useEditComponent, useEditComponentOpts, dataToControlTypeMatch } from "../utils/useForm";
import { ControlType } from "../types/controlTypes";
import { ValidationConstraint } from "../types/validation";

const { columns, columnIndex, initSearch } = defineProps<GridSearchProps>();

const { t } = useI18n();

const searchValue = ref<any>(initSearch);
const searchType = ref(GridSearchType.ON_PART);

const emit = defineEmits<{
	search: [columnId: string, searchValue: any, searchType: GridSearchType];
	cancel: [];
}>();

//plain list with id:description for a dropbox
const columnItems = computed(() => {
	const res = <Record<string, string>>{};
	columns.forEach((col1: GridCol[]) => {
		col1.forEach((col2: GridCol) => {
			res[col2.id] = col2.header || col2.id;
		});
	});
	return res;
});

//plain list with id:GridCol
const columnList = computed(() => {
	const res = <Record<string, GridCol>>{};
	columns.forEach((col1: GridCol[]) => {
		col1.forEach((col2: GridCol) => {
			if (col2.search === undefined || col2.search === true) {
				res[col2.id] = col2;
			}
		});
	});
	return res;
});

//selected column ID
// : undefined what if it is with search=false flag
const currentColumnId = ref<string | undefined>(
	columnIndex !== undefined
		? columns[0][columnIndex].id
		: columns[0].length == 1
			? columns[0][0].id
			: undefined,
);

//actual GridCol by ID
const currentColumn = computed(() =>
	currentColumnId.value ? columnList.value[currentColumnId.value] : undefined,
);

const currentColumnControlType = computed(() => {
	if (currentColumn.value?.controlType) {
		return currentColumn.value.controlType;
	} else if (currentColumn.value?.field) {
		return dataToControlTypeMatch[currentColumn.value.field.dataType];
	} else {
		return undefined;
	}
});

const searchTypeVis = computed(() => {
	if (
		!currentColumn.value ||
		(!currentColumn.value.controlType && !currentColumn.value.field)
	) {
		return false;
	}

	let fixListText = false;
	if (
		currentColumnControlType.value == ControlType.text &&
		currentColumn.value.field?.validRules
	) {
		//check fixList constraint
		fixListText =
			currentColumn.value.field?.validRules.filter(
				(r) => r.constraint == ValidationConstraint.fixList,
			).length >= 1;
	}

	return (
		// (currentColumnControlType.value == ControlType.ref && !currentColumn.value.searchColumnKeys)
		currentColumnControlType.value == ControlType.num ||
		(currentColumnControlType.value == ControlType.text && !fixListText) ||
		currentColumnControlType.value == ControlType.tel
	);
});

const componentRef = ref<InstanceType<any> | null>(null);
watchEffect(async () => {
	if (currentColumn.value) {
		await nextTick(); // Wait until component is rendered
		const instance = componentRef.value;

		//set searchType based on column type
		if (!searchTypeVis.value) {
			searchType.value = GridSearchType.ON_EXACT;
		} else {
			searchType.value = GridSearchType.ON_PART;
		}

		if (instance?.focus) {
			instance.focus(); // If the component exposes a focus method
		} else if (instance?.$el) {
			// Try focusing on first focusable element inside the component
			const el = instance.$el as HTMLElement;
			el?.querySelector<HTMLElement>("input, select, textarea, button")?.focus();
		}
	}
});

const doSearch = () => {
	if (
		currentColumnId.value != undefined &&
		searchValue.value != undefined &&
		//incorrect Ref
		!(typeof searchValue.value === "object" && searchValue.value.keys === null)
	) {
		emit("search", currentColumnId.value, searchValue.value, searchType.value);
	}
};

const doCancel = () => {
	emit("cancel");
};
</script>
