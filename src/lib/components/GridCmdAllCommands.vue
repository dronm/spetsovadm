<template>
	<Button @click="onClick" :title="t('GridCmdAllCommands.title')" variant="btn-cmd">
		<font-awesome-icon :icon="['fas', 'list']" />
	</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["command"]);

const { t } = useI18n();

const onClick = () => {
	emit("command", "all");
};
</script>
