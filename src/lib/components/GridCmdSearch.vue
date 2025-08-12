<template>
	<Button
		@click="onClick"
		:title="t('GridCmdSearch.title')"
		v-bind="{ ...props }"
		:variant="applied ? 'btn-alert' : 'btn-cmd'"
	>
		<font-awesome-icon :icon="['fas', 'magnifying-glass']" />
	</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	applied?: boolean;
}>();

const emit = defineEmits(["command"]);

const { t } = useI18n();

const onClick = () => {
	emit("command", "search");
};
</script>
