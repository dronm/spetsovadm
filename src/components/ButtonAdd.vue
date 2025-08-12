<template>
	<ButtonBase
		v-bind="props"
		:caption="$t('ButtonAdd.caption')"
		:title="$t('ButtonAdd.title')"
		color="var(--brand-700)"
		@click="emit('click')"
	>
		<PlusCircle class="w-5 h-5" color="#FFF"/>

	</ButtonBase>
</template>

<script setup lang="ts">

import ButtonBase from "@/components/ButtonBase.vue";
import PlusCircle from "@/components/icons/PlusCircle.vue";

const props = defineProps();
	
const emit = defineEmits<{
	click: [];
}>();

</script>
