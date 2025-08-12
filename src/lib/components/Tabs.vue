<template>
	<div class="flex w-[1128px] justify-between items-center rounded-[0_0_var(--radius-xl,12px)_var(--radius-xl,12px)] [background:var(--Gray-100,#F5F5F5)] px-6 py-4">
		<button
			type="button"
			v-for="(tab, index) in tabs"
			:key="index"
			class="flex justify-center items-center gap-1 px-3 py-2 rounded-lg cursor-pointer"
			:class="[
				activeTab === index
					? '[background:#FFF]'
					: '',
			]"
			@click="activeTab = index"
		>
			<span 
				class=" [font-family:Inter] text-sm font-semibold leading-5"
				:class="[
					activeTab === index
						? 'text-[color:var(--Brand-700,#097350)]'
						: '',
				]"
			>
				{{ tab.title }}
			</span>
		</button>

	</div>

		<div ref="tabContainer">
			<div>
				<slot></slot>
			</div>
		</div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, useSlots, nextTick } from "vue";

const slots = useSlots();
const tabs = ref([]);
const activeTab = ref(0);
const maxHeight = ref(0);
const tabContainer = ref(null);

// Collect tab titles from Tab components
onMounted(() => {
	tabs.value = slots.default().map((vnode, index) => ({
		title: vnode.props?.title || `Tab ${index + 1}`,
	}));
	// updateHeight();
});

// Update the height after Vue renders the content
const updateHeight = async () => {
	await nextTick(); // Wait for DOM updates
	const heights = Array.from(tabContainer.value.children[0].children).map(
		(el) => el.clientHeight,
	);
	maxHeight.value = Math.max(...heights);
};

// Provide activeTab index for Tab components
provide("activeTab", activeTab);
provide("tabs", tabs);

</script>
