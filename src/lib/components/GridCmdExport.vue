<template>
	<Button @click="onClick" :title="t('GridCmdExport.title')">
		{{ $t("GridCmdExport.caption") }}
	</Button>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["command"]);

const { t } = useI18n();

const onClick = () => {
	emit("command", "export");
};
</script>
