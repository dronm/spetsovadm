/* * This component is used from ProductCatDetail->ProductCatFilterList */
<template>
	<Edit
		:id="$attrs.id as string"
		v-bind="$attrs"
		type="text"
		:modelValue="model"
		:useAutocomplete="editAutocomplete(productCatFilterList)"
		@update:modelValue="updateDescr"
		@autocomplete="onSelectRef"
	>
		<template v-slot:actions>
			<BtnSelect
				v-bind="
					<BtnSelectProps>{
						selectType: BtnSelectType.view,
						selectProps: {
							winProps: SELECT_WIN_PROPS,
							routeName: 'productCatFilterList',
						},
					}
				"
				@select="onSelectRef"
			>
			</BtnSelect>
		</template>
	</Edit>
</template>

<script setup lang="ts">
import Edit from '@/lib/components/Edit.vue';
import BtnSelect from '@/lib/components/BtnSelect.vue';
import { type BtnSelectProps, BtnSelectType } from '@/lib/types/btnSelect';
import { editAutocomplete } from '@/lib/utils/editAutocomplete';

// import { type ProductCatFilterAttr } from '@/models/productCat';
import { SELECT_WIN_PROPS } from '@/config/constants';
import { productCatFilterList } from '@/services/productCatFilter';

// const model = defineModel<ProductCatFilterAttr | undefined>(undefined);
const model = defineModel<string | undefined>(undefined);
const emit = defineEmits(['update:modelValue']);

const onSelectRef = (data: Record<string, any> | undefined) => {
	if (!data) {
		return;
	}
	emit('update:modelValue', data);
};

const updateDescr = (newDescr: unknown) => {
	//descr = '' - clearing
	if (typeof newDescr === 'string') {
		emit(
			'update:modelValue',
			newDescr == ''
				? undefined
				: { ref_1c: null, name: newDescr, values: [] },
		);
	}
};
</script>
