<template>
	<EditNum v-bind="{ ...props }" :max-length="12"> </EditNum>
</template>

<script setup lang="ts">
import EditNum from '@/lib/components/EditNum.vue';
import type { EditProps } from '@/lib/types/edit';

const props = defineProps<EditProps>();
</script>
