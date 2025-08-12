<template>
	<Button
		@click="onClick"
		:title="t('GridCmdInsert.title')"
		v-bind="{ ...props }"
		variant="btn-cmd"
	>
		<font-awesome-icon :icon="['fas', 'plus']" />
	</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { useI18n } from "vue-i18n";

const props = defineProps();

const emit = defineEmits(["command"]);

const { t } = useI18n();

const onClick = () => {
	emit("command", "add_row");
};
</script>
