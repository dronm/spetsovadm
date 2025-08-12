<template>
	<div class="flex h-[280px] justify-center items-center gap-[74px] self-stretch border border-[color:var(--Gray-300,#D5D7DA)] p-3 rounded-2xl border-solid">
		<div class="flex flex-col items-center gap-5 flex-[1_0_0]">
			<!-- icon -->
			<ProductNoPict 
				class="flex w-12 h-12 justify-center items-center border border-[color:var(--Gray-200,#E9EAEB)] [background:var(--Base-White,#FFF)] shadow-[0_0_0_1px_rgba(10,13,18,0.18)_inset,0_-2px_0_0_rgba(10,13,18,0.05)_inset,0_1px_2px_0_rgba(16,24,40,0.05)] p-3 rounded-[10px] border-solid"
				color="#414651" 
				:width="24" :height="24" 
			/>

			<div 
				class="flex max-w-[352px] flex-col items-center gap-2 self-stretch"
				v-if="!cmdAdd"
			>
				<div 
					class="self-stretch text-[color:var(--Gray-900,#181D27)] text-center [font-family:Inter] text-base font-semibold leading-6"
				>
					{{ $t('ProductNoPictData.text1') }}
				</div>

				<div 
					class="self-stretch text-[color:var(--Gray-600,#535862)] text-center [font-family:Inter] text-sm font-normal leading-5"
				>
					{{ $t('ProductNoPictData.text2') }}
				</div>

			</div>

			<div v-else
				class="flex flex-col items-center gap-5 flex-[1_0_0]"
			>
				<div 
					class="self-stretch text-[color:var(--Gray-900,#181D27)] text-center [font-family:Inter] text-base font-semibold leading-6"
				>
					{{ $t('ProductNoPictData.text1') }}
				</div>

				<!--
				<button 
					class="flex justify-center items-center gap-1 [background:var(--Brand-950,#053628)] px-3.5 py-2.5 rounded-lg cursor-pointer"
					@click.prevent="emit('addPicture')"
				>
					<PlusCircle class="w-5 h-5" color="#FFF"/>

					<span class="text-[color:var(--Base-White,#FFF)] [font-family:Inter] text-sm font-semibold leading-5"> 
						Добавить 
					</span>
				</button>
-->
				<ButtonAdd @click="emit('addPicture')" />
			</div>
		</div>

	</div>

</template>

<script setup lang="ts">

import ProductNoPict from "@/components/icons/ProductNoPict.vue";
// import PlusCircle from "@/components/icons/PlusCircle.vue";
import ButtonAdd from "@/components/ButtonAdd.vue";

interface Props {
	cmdAdd?: boolean;
}

const { cmdAdd=false } = defineProps<Props>();

const emit = defineEmits<{
	addPicture: [];
}>();

</script>

