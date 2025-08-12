<template>
	<Button @click="onClick" :title="t('GridCmdCopy.title')" variant="btn-cmd">
		<font-awesome-icon :icon="['fas', 'clone']" />
	</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import type { GridCurrentCell } from "../types/grid";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["command"]);

interface Props {
	getCurrentCell?: () => GridCurrentCell;
}

const { getCurrentCell } = defineProps<Props>();

const { t } = useI18n();

const onClick = () => {
	if (!getCurrentCell || getCurrentCell().row === undefined) {
		return;
	}
	emit("command", "copy_row");
};
</script>
