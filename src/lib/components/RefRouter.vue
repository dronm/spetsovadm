<template>
	<router-link v-if="data" :to="{ name: routeName, query: data.keys }" :title="title">
		{{ data.descr }}
	</router-link>
</template>

<script setup lang="ts">
import { type Ref } from "../types/ref";

interface Props {
	routeName: string;
	data?: Ref;
	title?: string;
}

const { routeName, data, title } = defineProps<Props>();
</script>
