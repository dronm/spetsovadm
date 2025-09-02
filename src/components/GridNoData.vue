<template>
	<div class="flex w-[824px] flex-col items-center gap-2 opacity-80 mt-[24px] mx-auto">
		<div class="flex h-[280px] justify-center items-center gap-[74px] self-stretch border border-[color:var(--gray-300)] p-3 rounded-2xl border-solid">
			<div class="flex flex-col items-center gap-5 flex-[1_0_0]">
				<List 
					class="flex w-12 h-12 justify-center items-center border border-[color:var(--gray-200)] [background:var(--base-white)] shadow-[0_0_0_1px_rgba(10,13,18,0.18)_inset,0_-2px_0_0_rgba(10,13,18,0.05)_inset,0_1px_2px_0_rgba(16,24,40,0.05)] p-3 rounded-[10px] border-solid"
					color="var(--gray-700)" 
					:width="24" :height="24" 
				/>

				<div class="self-stretch text-[color:var(--gray-900)] text-center [font-family:var(--font-inter)] text-base font-semibold leading-6">
					{{ caption }}
				</div>

				<ButtonAdd v-if="cmdAdd" @click="emit('addRow')" color="var(--base-white)" bg="var(--brand-950)" />
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import List from "@/components/icons/List.vue";
// import PlusCircle from "@/components/icons/PlusCircle.vue";
import ButtonAdd from "@/components/ButtonAdd.vue";

interface Props {
	caption: string;
	cmdAdd?: boolean;
}

const { caption, cmdAdd=true } = defineProps<Props>();

const emit = defineEmits<{
	addRow: [];
}>();
	
</script>
