<template>
	<div class="p-4 max-h-[400px] overflow-y-auto">
		<ViewHeader>
			{{ t('Likes.header') }}
		</ViewHeader>

		<ul class="space-y-4">
			<li
				v-for="prod in likes"
				:key="prod.id"
				class="flex items-center space-x-4 bg-white shadow-lg rounded-lg p-4"
			>
				<ButtonLike
					:title="$t('ProductPublicListCard.formLikesTitle')"
					:active="true"
					@click.prevent="unLike(prod)"
				>
				</ButtonLike>

				<router-link
					:to="`/product/${prod.name_lat}`"
					class="text-lg font-medium text-gray-900 hover:text-blue-500"
				>
					{{ prod.name }}
				</router-link>

				<img
					v-if="prod.preview_path"
					:src="`${PICT_CDN_PROD_PREVIEW}/${prod.preview_path}`"
					class="w-16 h-16 object-cover rounded-md"
				/>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import ViewHeader from './ViewHeader.vue';
import ButtonLike from './ButtonLike.vue';
import { PICT_CDN_PROD_PREVIEW } from '../config/constants';
import { useLikeStore } from '../stores/useLikeStore';
import type { ProductPreview } from '../models/product';

const { t } = useI18n();

const emit = defineEmits(['onClick']);

const likeStore = useLikeStore();
const { likes } = storeToRefs(likeStore);

const unLike = (product: ProductPreview) => {
	likeStore.handleLikes(product);
};
</script>
