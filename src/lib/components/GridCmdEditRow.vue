<template>
	<Button @click="onClick" :title="t('GridCmdEdit.title')" variant="btn-cmd">
		<font-awesome-icon :icon="['fas', 'pen']" />
	</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { type GridCurrentCell } from "../types/grid";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["command"]);

const { t } = useI18n();

interface Props {
	getCurrentCell?: () => GridCurrentCell;
}

const { getCurrentCell } = defineProps<Props>();

const onClick = () => {
	if (!getCurrentCell) {
		return;
	}
	emit("command", "edit_row");
};
</script>
