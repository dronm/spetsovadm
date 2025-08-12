<template>
	<button
		:title="title"
		:class="[
			'flex justify-center items-center gap-1 flex-[1_0_0] px-3.5 py-2.5 rounded-lg cursor-pointer',
			border ? 'border border-solid' : ''
		]"
		:style="{
			backgroundColor: bg,
			borderColor: border
		}"
		@click.prevent="emit('click')"
	>
		<div class="flex justify-center items-center px-0.5 py-0">

			<slot />

			<span 
				:style="{ color: color }"
				class="[font-family:Inter] text-sm font-semibold leading-5"
			>
				{{ caption }}
			</span>

		</div>
	</button>
</template>

<script setup lang="ts">
interface Props {
	caption?: string;
	title?: string;
	color?: string; // text color
	bg?: string;    // background color
	border?: string;
}

const { 
	caption,
	title,
	color = "#FFF",
	bg = "#053628",
	border
} = defineProps<Props>();

const emit = defineEmits<{
	click: [];
}>();

</script>

