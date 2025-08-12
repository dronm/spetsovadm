<template>
	<Edit
		v-bind="{ ...props }"
		:label="$t('ProductDetail.measureUnit.name.label')"
		:title="$t('ProductDetail.measureUnit.name.title')"
		:placeholder="$t('ProductDetail.measureUnit.name.placeholder')"
		v-model="safeModel.name"
	>
	</Edit>

	<Edit
		v-bind="{ ...props }"
		:label="$t('ProductDetail.measureUnit.name_full.label')"
		:title="$t('ProductDetail.measureUnit.name_full.title')"
		:placeholder="$t('ProductDetail.measureUnit.name_full.placeholder')"
		v-model="safeModel.name_full"
	>
	</Edit>

	<Edit
		v-bind="{ ...props }"
		:label="$t('ProductDetail.measureUnit.name_short_intern.label')"
		:title="$t('ProductDetail.measureUnit.name_short_intern.title')"
		:placeholder="
			$t('ProductDetail.measureUnit.name_short_intern.placeholder')
		"
		v-model="safeModel.name_short_intern"
	>
	</Edit>

	<EditInt
		v-bind="{ ...props }"
		:label="$t('ProductDetail.measureUnit.depth.label')"
		:title="$t('ProductDetail.measureUnit.depth.title')"
		v-model="safeModel.depth"
	>
	</EditInt>

	<EditInt
		v-bind="{ ...props }"
		:label="$t('ProductDetail.measureUnit.width.label')"
		:title="$t('ProductDetail.measureUnit.width.title')"
		v-model="safeModel.width"
	>
	</EditInt>

	<EditInt
		v-bind="{ ...props }"
		:label="$t('ProductDetail.measureUnit.height.label')"
		:title="$t('ProductDetail.measureUnit.height.title')"
		v-model="safeModel.height"
	>
	</EditInt>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import Edit from '@/lib/components/Edit.vue';
import EditInt from '@/lib/components/EditInt.vue';
import { type EditProps } from '@/lib/types/edit';

import { type ProductMeasureUnit } from '@/models/product';

const model = defineModel<ProductMeasureUnit | null | undefined>('modelValue', {
	required: false,
});

const props = defineProps<EditProps>();

const { t } = useI18n();

const emit = defineEmits();

const initMU = <ProductMeasureUnit>{
	name: '',
	depth: 0,
	width: 0,
	height: 0,
	name_full: '',
};

watchEffect(() => {
	if (model.value === null || model.value === undefined) {
		model.value = initMU;
	}
});

const safeModel = computed({
	get: () => model.value ?? <ProductMeasureUnit>{ name: '' },
	set: (val: ProductMeasureUnit) => {
		if (!model.value) {
			model.value = initMU;
		}
		Object.assign(model.value, val);
	},
});
</script>
