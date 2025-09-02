<template>
	<!-- detailParams.params.routeCollectionName ?? 'productCatSetProduct' -->
	<DetailTitle
		:back-title="t('ProductCatDetail.goBack')"
		:title="t('ProductCatDetail.title')"
		back-route="productCatSetProduct"
	/>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(
				productCatAdd,
				productCatUpdate,
				productCatDetail,
			)
		"
		collectionRoute="productCatSetProduct"
		:error="props.error"
		:isNew="props.isNew"
		:data="props.data"
		:currentId="props.currentId"
		@objectKeys:update="onKeysUpdate"
	>
		<!-- custom template -->
		<template
			:currentId="props.currentId"
			v-slot:controls="slotProps: SlotProps"
		>
			<tabs>
				<tab :title="$t('ProductCatDetail.tabs.common')">
					<!-- title -->
					<div class="tab-content-title">
						{{ $t('ProductCatDetail.tabs.common') }}
					</div>

					<div class="tab-content-container">
						<!-- content -->
						<div class="tab-content">
							<ul class="cat-list">
								<CatPublicListCard
									v-for="cat in slotProps.data.parents"
									:key="cat?.id"
									:category="cat"
								>
								</CatPublicListCard>
							</ul>

							<div class="flex flex-col md:flex-row gap-4">
								<div class="flex-shrink-0">
									<!-- static image -->
									<img
										v-if="slotProps.data.picture_path"
										:src="mainImgSrc(slotProps.data.picture_path)"
										class="max-w-[250px] h-auto"
									/>

									<!-- picture upload: only for saved elements -->
									<div>
										<Button
											@click="triggerFileInput"
											:title="t('ProductCatDetail.pictureUpload.title')"
										>
											{{ t('ProductCatDetail.pictureUpload.caption') }}
										</Button>

										<input
											type="file"
											ref="fileInput"
											@change="handleFileChange"
											style="display: none"
										/>
									</div>
								</div>

								<div class="flex-1 space-y-2">
									<Edit
										id="name"
										:label="$t('ProductCatDetail.name.label')"
										:title="$t('ProductCatDetail.name.title')"
										:placeholder="$t('ProductCatDetail.name.placeholder')"
										:max-length="250"
										v-model="slotProps.data.name"
										:error="slotProps.errors['name']"
									>
									</Edit>

									<EditText
										id="description"
										:label="$t('ProductCatDetail.description.label')"
										:title="$t('ProductCatDetail.description.title')"
										:placeholder="
											$t('ProductCatDetail.description.placeholder')
										"
										:max-length="250"
										v-model="slotProps.data.description"
										:error="slotProps.errors['description']"
									>
									</EditText>

									<Edit
										id="name_lat"
										:label="$t('ProductCatDetail.name_lat.label')"
										:title="$t('ProductCatDetail.name_lat.title')"
										v-model="slotProps.data.name_lat"
									>
									</Edit>

									<EditInt
										id="popularity"
										:label="$t('ProductCatDetail.popularity.label')"
										:title="$t('ProductCatDetail.popularity.title')"
										v-model="slotProps.data.popularity"
										:error="slotProps.errors['popularity']"
									>
									</EditInt>

									<EditInt
										id="order_position"
										:label="$t('ProductCatDetail.order_position.label')"
										:title="$t('ProductCatDetail.order_position.title')"
										v-model="slotProps.data.order_position"
										:error="slotProps.errors['order_position']"
									>
									</EditInt>

									<!-- certificate list 
									<ProductCertificateUseRangeList
										v-if="slotProps.data.id"
										:productCatId="slotProps.data.id"
									>
									</ProductCertificateUseRangeList>
				-->
									<!-- product list 
									<ProductCatProductList
										v-if="slotProps.data.id"
										:productCatId="slotProps.data.id"
									>
									</ProductCatProductList>
				-->

								</div>
							</div>


						</div>
					</div>
				</tab>

				<tab :title="$t('ProductCatDetail.tabs.products')">
					<!-- title -->
					<div class="tab-content-title">
						{{ $t('ProductCatDetail.tabs.products') }}
					</div>

					<div class="tab-content-container">
						<!-- content -->
						<div class="tab-content">
							<ProductLinkList
								v-if="slotProps.data.id"
								:productCatId="slotProps.data.id"
							>
							</ProductLinkList>
						</div>
					</div>
				</tab>

				<tab :title="$t('ProductCatDetail.tabs.filters')">
					<!-- title -->
					<div class="tab-content-title">
						{{ $t('ProductCatDetail.tabs.filters') }}
					</div>

					<div class="tab-content-container">
						<!-- content -->
						<div class="tab-content">
							<!-- filter list -->
							<ProductCatFilterList v-model="slotProps.data.filter_attrs">
							</ProductCatFilterList>

						</div>
					</div>
				</tab>
			</tabs>



		</template>
	</FormCustom>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import FormCustom from '@/lib/components/FormCustom.vue';
import {
	type FormCustomProps,
	type FormCustomExposed,
} from '@/lib/types/formCustom';
import Tabs from '@/lib/components/Tabs.vue';
import Tab from '@/lib/components/Tab.vue';

import { newFormSrvOperations, type FormKeys } from '../lib/types/form';

import Edit from '@/lib/components/Edit.vue';
import EditText from '@/lib/components/EditText.vue';
import EditInt from '@/lib/components/EditInt.vue';
import { type FormErrorList } from '../lib/utils/useValidation';
import Button from '@/lib/components/Button.vue';

import DetailTitle from '@/components/DetailTitle.vue';

import { useRouteParamsStore } from '@/lib/stores/useRouteParams';

import {
	productCatAdd,
	productCatUpdate,
	productCatDetail,
	productCatUploadPicture,
} from '../services/productCat';
import {
	type ProductCatDetail,
	productCatFields,
	type ProductCatKey,
	type ProductCatPicture,
} from '../models/productCat';
import CatPublicListCard from '../components/CatPublicListCard.vue';
// import ProductCertificateUseRangeList from '../views/ProductCertificateUseRangeList.vue';
// import ProductCatProductList from '../views/ProductCatProductList.vue';
import ProductLinkList from '../views/ProductLinkList.vue';
import ProductCatFilterList from '../components/ProductCatFilterList.vue';
import { PICT_CDN_CAT_PREVIEW } from '@/config/constants';
import {
	useNotificationStore,
	MessageType,
} from '../lib/stores/useNotificationStore';

interface SlotProps {
	data: ProductCatDetail;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const objectKeys = ref<ProductCatKey>({ id: 0 });

const formRef = ref<FormCustomExposed | null>(null);

const fileInput = ref<HTMLInputElement | null>(null);

const detailParams = useRouteParamsStore();

const controlList = [
	{
		id: 'id',
		field: productCatFields.id,
	},
	{
		id: 'name',
		field: productCatFields.name,
	},
	{
		id: 'name_lat',
		field: productCatFields.name_lat,
	},
	{
		id: 'description',
		field: productCatFields.description,
	},
	{
		id: 'popularity',
		field: productCatFields.popularity,
	},
	{
		id: 'order_position',
		field: productCatFields.order_position,
	},
	{
		id: 'filter_attrs',
		field: productCatFields.filter_attrs,
	},
	{
		id: 'parent_id',
		field: productCatFields.parent_id,
	},
];

const mainImgSrc = (pictPath: string): string =>
	`${PICT_CDN_CAT_PREVIEW}/${pictPath}`;

const triggerFileInput = () => {
	fileInput.value?.click();
};

const handleFileChange = async (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (
		!target.files ||
		target.files.length === 0 ||
		!objectKeys.value ||
		!objectKeys.value.id
	)
		return;

	const file = target.files[0];

	try {
		const contentInfo = <ProductCatPicture>{
			ref_1c: crypto.randomUUID(),
			size: file.size,
		};
		const formData = new FormData(); //multypartform data
		formData.append('content_data', file);
		formData.append('id', objectKeys.value.id.toString());
		formData.append('content_info', JSON.stringify(contentInfo));
		//
		await productCatUploadPicture.func(formData);

		const notificationStore = useNotificationStore();
		notificationStore.addNotification(
			t('ProductCatDetail.pictureUpload.success'),
			5000,
			MessageType.Ok,
		);

		if (formRef.value) {
			formRef.value.fetchFormData();
		}
	} catch (error) {
		const msg = error instanceof Error ? error.message : t('unknownError');
		const notificationStore = useNotificationStore();
		notificationStore.addNotification(msg, 5000, MessageType.Err);
	}
};

const onKeysUpdate = (newKeys: FormKeys) => {
	objectKeys.value = newKeys as unknown as ProductCatKey;
};
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[150px];
}
</style>
