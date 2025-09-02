<template>
	<div class="grid-pagination">
		<!-- Go First Button -->
		<div class="grid-pagination-btn-wrap-from">
			<button
				@click.prevent="goToFirst"
				:disabled="currentPage === 1"
				class="grid-pagination-btn"
				:title="$t('Pagination.goFirstTitle')"
			>

				<!--<img class="w-5 h-5" :src="images.first" /> -->
				<Component 
					v-if="pagIcons.first"
					:is="pagIcons.first"
					class="w-5 h-5"
					:color="currentPage === 1? pagBtnColorDisabled : pagBtnColorEnabled"
				</Component>

				{{ t("Pagination.goFirst") }}
			</button>

			<!-- Go Previous Button -->
			<button
				@click.prevent="goToPrevious"
				:disabled="currentPage === 1"
				class="grid-pagination-btn"
				:title="$t('Pagination.goPrevTitle')"
			>
				<Component 
					v-if="pagIcons.prev"
					:is="pagIcons.prev"
					:color="currentPage === 1? pagBtnColorDisabled : pagBtnColorEnabled"
					class="w-5 h-5"
				</Component>

				{{ t("Pagination.goPrev") }}
			</button>
		</div>

		<!-- Page Buttons  -->
		<div class="grid-pagination-numbers">
			<button
				v-for="page in firstPages"
				:key="page"
				@click.prevent="goToPage(page)"
				:class="[
					'grid-pagination-page',
					page === currentPage
						? 'grid-pagination-page-current'
						: 'grid-pagination-page-not-current',
				]"
				:title="
					page === currentPage
						? $t('Pagination.currentPageTitle')
						: $t('Pagination.goToPageTitle')
				"
			>
				<span class="grid-pagination-text">
					{{ page }}
				</span>
			</button>

			<div v-if="lastPages?.length" class="grid-pagination-page">
				...
			</div>

			<button
				v-for="page in lastPages"
				:key="page"
				@click.prevent="goToPage(page)"
				:class="[
					'grid-pagination-page',
					page === currentPage
						? 'grid-pagination-page-current'
						: 'grid-pagination-page-not-current',
				]"
				:title="
					page === currentPage
						? $t('Pagination.currentPageTitle')
						: $t('Pagination.goToPageTitle')
				"
			>
				{{ page }}
			</button>
		</div>
		<!-- Go Next Button -->
		<div class="grid-pagination-btn-wrap-to">
			<button
				@click.prevent="goToNext"
				:disabled="currentPage === totalPages"
				class="grid-pagination-btn"
				:title="$t('Pagination.goNextTitle')"
			>
				{{ t("Pagination.goNext") }}

				<Component 
					v-if="pagIcons.next"
					:is="pagIcons.next"
					:color="currentPage === totalPages? pagBtnColorDisabled : pagBtnColorEnabled"
					class="w-5 h-5"
				</Component>
			</button>

			<!-- Go Last Button -->
			<button
				@click.prevent="goToLast"
				:disabled="currentPage === totalPages"
				class="grid-pagination-btn"
				:title="$t('Pagination.goLastTitle')"
			>
				{{ t("Pagination.goLast") }}

				<Component 
					v-if="pagIcons.last"
					:is="pagIcons.last"
					:color="currentPage === totalPages? pagBtnColorDisabled : pagBtnColorEnabled"
					class="w-5 h-5"
				</Component>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
	totalRows: number;
	showPages: number;
	rowsPerPage: number;
	currentPage: number;
}

const { totalRows, showPages, rowsPerPage, currentPage } = defineProps<Props>();

// const currentPage = ref(1);

const { t } = useI18n();

const totalPages = computed(() => Math.ceil(totalRows / rowsPerPage));

const firstPages = computed(() => {
	const half = Math.floor(showPages / 2);

	return Array.from(
		{ length: Math.min(half, totalPages.value) },
		(_, i) => i + 1
	);
});

const lastPages = computed(() => {
	const half = Math.floor(showPages / 2);

	 return Array.from(
		{ length: Math.min(showPages - firstPages.value.length, totalPages.value - half) },
		(_, i) => totalPages.value - (showPages - firstPages.value.length) + i + 1
	);
});

//for arrond the page
// const pages = computed(() => {
// 	const half = Math.floor(showPages / 2);
// 	let start = Math.max(currentPage - half, 1);
// 	let end = Math.min(start + showPages - 1, totalPages.value);
//
// 	// Adjust start if we don’t have enough pages at the end
// 	start = Math.max(end - showPages + 1, 1);
//
// 	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
// });

const emit = defineEmits(["page-changed"]);

const goToPage = (page: number) => {
	// alert("toPage:"+page)
	// console.log("goTOPage, current:",currentPage," page:", page)
	if (currentPage != page) {
		emit("page-changed", page);
	}
};

const goToFirst = () => goToPage(1);
const goToLast = () => goToPage(totalPages.value);

const goToPrevious = () => {
	if (currentPage > 1) {
		goToPage(currentPage - 1);
	}
};

const goToNext = () => {
	if (currentPage < totalPages.value) {
		goToPage(currentPage + 1);
	}
};

const pagBtnColorEnabled = "#097350";
const pagBtnColorDisabled = "#A4A7AE";

interface PaginationIcons {
	first: string;
	last: string;
	prev: string;
	next: string;
}
const pagIcons = inject('paginationIcons') as PaginationIcons;

</script>

<style scoped>
.disabled {
	pointer-events: none;
	opacity: 0.5;
}
</style>
