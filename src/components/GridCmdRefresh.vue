<template>
	<!--
	<div 
		style="padding-left: 16px; padding-right: 16px; padding-top: 10px; padding-bottom: 10px; background: #FAFAFA; overflow: hidden; border-radius: 8px; outline: 1px #D5D7DA solid; outline-offset: -1px; justify-content: center; align-items: center; gap: 6px; display: flex; cursor:pointer;"
		@click="onClick" 
	>
      <div style="width: 20px; height: 20px; position: relative; overflow: hidden">
			<img class="w-5 h-5" :src="img" />
      </div>

      <div style="padding-left: 2px; padding-right: 2px; justify-content: center; align-items: center; display: flex">
        <div style="color: #097350; font-size: 16px; font-family: Inter; font-weight: 600; line-height: 24px; word-wrap: break-word">
				{{ t('GridCmdRefresh.caption') }}
		</div>
      </div>
    </div>
-->
	<button
		class="flex justify-center items-center gap-1.5 border border-[color:var(--gray-300)] [background:var(--gray-50)] px-4 py-2.5 rounded-lg border-solid cursor-pointer"
		:title="t('GridCmdRefresh.title')"
		@click.prevent="onClick"
	>
		<RefreshCW05 class="w-5 h-5" color="var(--brand-700)"/>

		<div class="flex justify-center items-center px-0.5 py-0">
			<span 
				class="text-[color:var(--brand-700)] [var(--font-inter)] text-base font-semibold leading-6"
			>
				{{ t('GridCmdRefresh.caption') }}
			</span>

		</div>
	</button>

</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import RefreshCW05 from "@/components/icons/RefreshCW05.vue";

const emit = defineEmits(["command"]);

const { t } = useI18n();

const onClick = () => {
	emit("command", "refresh");
};

</script>

