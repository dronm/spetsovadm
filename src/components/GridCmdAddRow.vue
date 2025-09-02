<template>
	<button
		class="flex justify-center items-center gap-1.5 border border-[color:var(--gray-300)] [background:var(--gray-50)] px-4 py-2.5 rounded-lg border-solid cursor-pointer"
		:title="t('GridCmdAddRow.title')"
		@click.prevent="onClick"
	>
		<PlusCircle class="w-5 h-5" color="#097350"/>

		<div v-if="showCaption" class="flex justify-center items-center px-0.5 py-0">
			<span 
				class="text-[color:var(--brand-700)] [var(--font-inter)] text-base font-semibold leading-6"
			>
				{{ t('GridCmdAddRow.caption') }}
			</span>

		</div>
	</button>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import PlusCircle from "@/components/icons/PlusCircle.vue";

const emit = defineEmits(["command"]);

interface Props {
	showCaption?: boolean;
}
const { showCaption=true } = defineProps<Props>();

const { t } = useI18n();

const onClick = () => {
	emit("command", "add_row");
};

// const img = new URL(`../assets/collection-cmd/add.png`, import.meta.url).href;

</script>


