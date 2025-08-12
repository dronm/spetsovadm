<template>
	<div class="flex flex-col items-start gap-2 flex-[1_0_0] mr-3" >
		<div class="relative w-full">
			<SearchLg 
				class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" 
				color="var(--gray-500)"
			/>
			<input 
				class="w-full border border-[color:var(--gray-300)] [background:var(--base-white)] px-3 py-2.5 rounded-lg border-solid focus:outline-none"
				type="text" 
				placeholder="Введите строку для поиска"
				v-model="searchValue"
			>
		</div>
		<!--
		<div class="flex items-center gap-1.5 self-stretch" >
			<input 
				class="flex items-center gap-2 self-stretch border border-[color:var(--gray-300)] [background:var(--base-white)] px-3 py-2.5 rounded-lg border-solid"
				type="text" 
				placeholder="Введите строку для поиска"
				v-model="searchValue"
			>
			</input>
			<SearchLg class="w-5 h-5 shrink-0" color="var(--gray-500)"/>
		</div>
-->
	</div>
	<!--
	<div class="inline-block">
		<div data-hint-text="false" data-label="false" data-scroll-bar="true" data-size="lg" data-state="Placeholder" 
		  data-supporting-text="true" data-type="Search" data-help-icon="true" data-required="true" 
		  style="flex: 1 1 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
		  
		  <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 6px; display: flex">
			
			<div style="align-self: stretch; padding-left: 12px; padding-right: 12px; padding-top: 10px; padding-bottom: 10px; background: white; overflow: hidden; border-radius: 8px; outline: 1px #D5D7DA solid; outline-offset: -1px; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
			  
			  <input 
				type="text" 
				placeholder="Введите строку для поиска"
				style="flex: 1 1 0; color: #717680; font-size: 16px; font-family: Inter; font-weight: 500; line-height: 24px; word-wrap: break-word; border: none; outline: none; background: transparent;"
				v-model="searchValue"
			  />
				<SearchLg class="w-5 h-5" color="#717680"/>
			</div>
		  </div>
		</div>
	</div>
-->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// import Edit from '@/lib/components/Edit.vue';
import SearchLg from '@/components/icons/SearchLg.vue';

const emit = defineEmits(['command']);

const searchValue = ref<string>("");
watch(searchValue, (newVal: string) => {
	emit('command', { id: 'search', val: newVal });
});

// const img = new URL(`../assets/collection-cmd/search.png`, import.meta.url).href;

</script>

