<template>
	<Button @click="onClick" :title="props.title" variant="btn-cmd">

		<font-awesome-icon :icon="['fas', props.icon]" />

		<template v-if="props.caption">
			{{ props.caption }}
		</template>
	</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { type GridCurrentCell } from "../types/grid";

const emit = defineEmits(["command"]);

interface Props {
	id: string;
	icon?: string;
	caption?: string;
	title?: string;
	dependOnCell: boolean;
	getCurrentCell?: () => GridCurrentCell;
}

const props = defineProps<Props>();

const onClick = () => {
	if (props.dependOnCell && !props.getCurrentCell) {
		return;
	}
	
	emit("command", props.id);
};
</script>

