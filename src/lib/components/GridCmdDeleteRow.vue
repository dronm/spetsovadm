<template>
	<Button @click="onClick" :title="t('GridCmdDelete.title')" variant="btn-cmd">
		<font-awesome-icon :icon="['fas', 'xmark']" />
	</Button>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import Button from "./Button.vue";
import { type GridCurrentCell } from "../types/grid";

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
	emit("command", "delete_row");
};
</script>
