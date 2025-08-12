<template>
	<div class="flex items-center justify-center space-x-2">
		<!-- Go First Button -->
		<button
			@click="goToFirst"
			:disabled="currentPage === 1"
			class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
		>
			First
		</button>

		<!-- Go Previous Button -->
		<button
			@click="goToPrevious"
			:disabled="currentPage === 1"
			class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
		>
			Previous
		</button>

		<!-- Page Buttons -->
		<button
			v-for="page in pages"
			:key="page"
			@click="goToPage(page)"
			:class="[
				'px-4 py-2 rounded',
				page === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200',
			]"
		>
			{{ page }}
		</button>

		<!-- Go Next Button -->
		<button
			@click="goToNext"
			:disabled="currentPage === totalPages"
			class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
		>
			Next
		</button>

		<!-- Go Last Button -->
		<button
			@click="goToLast"
			:disabled="currentPage === totalPages"
			class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
		>
			Last
		</button>
	</div>
</template>

<script>
export default {
	props: {
		totalRows: {
			type: Number,
			required: true,
		},
		fromRow: {
			type: Number,
			required: true,
		},
		showPages: {
			type: Number,
			required: true,
		},
		rowsPerPage: {
			type: Number,
			default: 10, // Default is 10 rows per page, can be overwritten when passed as a prop
		},
	},
	data() {
		return {
			currentPage: 1,
		};
	},
	computed: {
		totalPages() {
			return Math.ceil(this.totalRows / this.rowsPerPage);
		},
		pages() {
			const half = Math.floor(this.showPages / 2);
			let start = Math.max(this.currentPage - half, 1);
			let end = Math.min(start + this.showPages - 1, this.totalPages);

			// Adjust start if we don’t have enough pages at the end
			start = Math.max(end - this.showPages + 1, 1);

			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
	},
	methods: {
		// This method is responsible for properly initializing currentPage
		initPage() {
			this.currentPage = Math.ceil(this.fromRow / this.rowsPerPage);
		},
		goToPage(page) {
			this.currentPage = page;
			this.$emit("page-changed", this.currentPage);
		},
		goToFirst() {
			this.goToPage(1);
		},
		goToPrevious() {
			if (this.currentPage > 1) {
				this.goToPage(this.currentPage - 1);
			}
		},
		goToNext() {
			if (this.currentPage < this.totalPages) {
				this.goToPage(this.currentPage + 1);
			}
		},
		goToLast() {
			this.goToPage(this.totalPages);
		},
	},
	watch: {
		// Watch for changes in fromRow and recalculate currentPage
		fromRow(newFromRow) {
			this.initPage();
		},
	},
	created() {
		// Initialize currentPage properly when the component is created
		this.initPage();
	},
};
</script>

<style scoped>
.disabled {
	pointer-events: none;
	opacity: 0.5;
}
</style>
