<template>
	<Button :title="t('BtnClear.title')" class="action" variant="btn-cmd">
		<Component 
			:is="btnIcons.clear"
			class="w-5 h-5"
		</Component>
	</Button>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useI18n } from "vue-i18n";

import Button from "./Button.vue";
import { type BtnIcons } from "../types/btn";

const { t } = useI18n();

const btnIcons = inject('btnIcons') as BtnIcons;

</script>
