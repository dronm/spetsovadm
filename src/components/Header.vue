<template>
	<div class="header">
		<div class="header-controls">
			<!-- logo -->
			<div style="width: 15%">
				<router-link to="/" class="logo">
					<img
						src="@/assets/logo.png"
						alt="Logo"
						style="width: 150px; height: auto"
					/>
				</router-link>
			</div>

			<!-- category popover -->
			<div style="width: 15%">
				<Button
					:title="t('Header.CatBtn.title')"
					class="btn-popover"
					variant="btn-info"
					@click="togglePopover"
				>
					<font-awesome-icon :icon="['fas', 'bars']" />
					{{ t('Header.CatBtn.caption') }}
				</Button>
			</div>

			<!-- product search -->
			<div style="width: 40%">
				<ProductSearch />
			</div>

			<!-- cart, likes... -->
			<div style="width: 30%">
				<HeadMenu />
			</div>
		</div>

		<div class="cat-pop-container">
			<!-- popover with two panels -->
			<div
				v-if="isCatOpen"
				class="cat-popover"
				@mouseleave="hideChildPanel"
			>
				<!-- Parent panel with category list -->
				<div class="cat-parent-panel">
					<div v-if="categories?.length > 0">
						<div
							v-for="cat in categories"
							:key="cat.id"
							class="cat-parent-item"
							@mouseover="showChildPanel(cat)"
						>
							<router-link :to="categoryDetailRef(cat)">
								{{ cat.name }}
								<span
									class="badge btn-badge"
									v-if="cat.is_group == false"
									:title="$t('Header.CatPopover.badgeTitle')"
								>
									{{ cat.product_count }}
								</span>
								<span
									class="cat-expand"
									v-if="
										cat.children && cat.children.length > 0
									"
								>
									<font-awesome-icon
										:icon="['fas', 'fa-caret-right']"
									/>
								</span>
							</router-link>
						</div>
					</div>
					<p v-else>{{ $t('Notifications.loading') }}</p>
				</div>

				<!-- Child panel toggled on hover -->
				<div class="cat-child-panel" v-if="childPanelVisible">
					<ViewHeader>{{ parentName }}</ViewHeader>
					<div class="cat-child-item-list">
						<!--@click="showCategoryDetail(child)"-->
						<div
							v-for="child in childCategories"
							:key="child.id"
							class="cat-child-item"
						>
							<router-link :to="categoryDetailRef(child)">
								{{ child.name }}
								<span
									class="badge btn-badge"
									v-if="child.is_group == false"
									:title="$t('Header.CatPopover.badgeTitle')"
								>
									{{ child.product_count }}
								</span>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import Button from '@/lib/components/Button.vue';
import { useAPIFetch } from '@/lib/composables/useAPIFetch';

import ProductSearch from './ProductSearch.vue';
import HeadMenu from './HeadMenu.vue';
import ViewHeader from './ViewHeader.vue';
import { productCatPublicList } from '../services/productCat';
import { type ProductCatPublicList } from '@/models/productCat';
import { ERROR_NOTIF_TIMEOUT } from '@/config/constants';

const { t } = useI18n();

const collectionStore = useAPIFetch(ERROR_NOTIF_TIMEOUT);

const categories = computed(
	() => collectionStore.result.value as ProductCatPublicList[],
);
// const loading = computed(() => collectionStore.loading.value);
// const error = computed(() => collectionStore.error.value);

const router = useRouter();

const isCatOpen = ref(false);
const childCategories = ref<ProductCatPublicList[]>([]);
const childPanelVisible = ref(false);
const parentName = ref('');

const showChildPanel = (category: ProductCatPublicList) => {
	if (category.children && category.children.length > 0) {
		childCategories.value = category.children; // Populate child categories
		childPanelVisible.value = true;
		parentName.value = category.name;
	} else {
		//hide
		childPanelVisible.value = false;
	}
};

const hideChildPanel = () => {
	childPanelVisible.value = false;
};

const togglePopover = () => {
	isCatOpen.value = !isCatOpen.value;
};

const closePopover = (event: any) => {
	setTimeout(() => {
		if (!event.target.closest('.header-controls')) {
			isCatOpen.value = false;
			hideChildPanel();
		}
	}, 10);
};

const categoryDetailRef = (cat: ProductCatPublicList) => {
	return `/product-cat/${cat.name_lat}`;
};

const fetchCategories = async () => {
	await collectionStore.fetch(productCatPublicList);
};

onMounted(() => {
	document.addEventListener('click', closePopover);
	fetchCategories();
});

onUnmounted(() => {
	document.removeEventListener('click', closePopover);
});
</script>

<style scoped>
a {
	text-decoration: none;
}

a div,
a p {
	all: unset;
	display: block;
}

.header-controls {
	display: flex;
	align-items: center;
}

.cat-pop-container {
	position: relative;
}

.cat-popover {
	position: absolute;
	margin-top: 8px;
	padding: 8px;
	background-color: white;
	z-index: 10;
	width: 100%;
	height: 80vh;
	display: flex; /* Use flex to align panels side-by-side */
}

.cat-parent-panel {
	flex: 0 0 30%;
	border-right: 1px solid #ddd;
	overflow-y: auto;
	padding: 8px;
	border: 1px solid #ddd;
	border-radius: 5px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.cat-child-panel {
	flex: 0 0 70%;
	overflow-y: auto;
	padding: 8px;
	gap: 15px;
	padding: 60px;
	border: 1px solid #ddd;
	border-radius: 5px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.cat-child-item-list {
	column-count: 3;
	column-gap: 20px;
	gap: 15px;
}

.cat-child-item {
	padding: 5px;
}

.cat-child-item:hover {
	background-color: var(--on-hover-color);
	border-radius: var(--border-radius);
	cursor: pointer;
}

.cat-parent-item {
	position: relative;
	cursor: pointer;
	padding: 7px;
}

.cat-parent-item:hover {
	background-color: var(--on-hover-color);
}

.cat-expand {
	float: right;
}
</style>
