<template>
	<DetailTitle
		:back-title="t('ProductDetail.goBack')"
		:title="t('ProductDetail.title')"
		:back-route="
			detailParams.params.routeCollectionName ?? 'productList'
		"
	/>

	<FormCustom
		ref="formRef"
		:key-types="{ id: 'number' }"
		:controlList="controlList"
		:srv-operations="
			newFormSrvOperations(productAdd, productUpdate, productDetail)
		"
		:collectionRoute="
			detailParams.params.routeCollectionName ?? 'productList'
		"
		:error="props.error"
		:isNew="props.isNew"
		:data="props.data"
		:currentId="props.currentId"
		:show-commands="false"
		@objectKeys:update="onKeysUpdate"
		@formData:update="onFormDataUpdate"
	>
		<!-- custom template -->
		<template
			:currentId="props.currentId"
			v-slot:controls="slotProps: SlotProps"
		>
			<div>
				<div>
					<tabs>
						<tab :title="$t('ProductDetail.tabs.common')">
							<!-- title -->
							<div class="tab-content-title">
								{{ $t('ProductDetail.tabs.common') }}
							</div>

							<div class="tab-content-container">
								<!-- content -->
								<div class="tab-content">
									<Edit
										id="name"
										:label="$t('ProductDetail.name.label')"
										:title="$t('ProductDetail.name.title')"
										:placeholder="
											$t('ProductDetail.name.placeholder')
										"
										v-model="slotProps.data.name"
										:error="slotProps.errors['name']"
									>
									</Edit>

									<Edit
										id="name_full"
										:label="$t('ProductDetail.name_full.label')"
										:title="$t('ProductDetail.name_full.title')"
										:placeholder="
											$t('ProductDetail.name_full.placeholder')
										"
										v-model="slotProps.data.name_full"
										:error="slotProps.errors['name_full']"
									>
									</Edit>

									<Edit
										id="name_lat"
										:label="$t('ProductDetail.name_lat.label')"
										:title="$t('ProductDetail.name_lat.title')"
										:placeholder="
											$t('ProductDetail.name_lat.placeholder')
										"
										v-model="slotProps.data.name_lat"
										:error="slotProps.errors['name_lat']"
									>
									</Edit>

									<Edit
										id="code_1c"
										:label="$t('ProductDetail.code_1c.label')"
										:title="$t('ProductDetail.code_1c.title')"
										:placeholder="
											$t('ProductDetail.code_1c.placeholder')
										"
										v-model="slotProps.data.code_1c"
										:error="slotProps.errors['code_1c']"
									>
									</Edit>

									<Edit
										id="artikul"
										:label="$t('ProductDetail.artikul.label')"
										:title="$t('ProductDetail.artikul.title')"
										v-model="slotProps.data.artikul"
									>
									</Edit>

									<EditText
										id="description"
										:label="$t('ProductDetail.description.label')"
										:title="$t('ProductDetail.description.title')"
										:placeholder="
											$t('ProductDetail.description.placeholder')
										"
										:max-length="5000"
										:rows="10"
										v-model="slotProps.data.description"
										:error="slotProps.errors['description']"
									>
									</EditText>

									<EditText
										id="specification"
										:label="$t('ProductDetail.specification.label')"
										:title="$t('ProductDetail.specification.title')"
										:placeholder="
											$t(
												'ProductDetail.specification.placeholder',
											)
										"
										:max-length="5000"
										:rows="10"
										v-model="slotProps.data.specification"
										:error="slotProps.errors['specification']"
									>
									</EditText>

									<Edit
										id="product_type"
										:label="$t('ProductDetail.product_type.label')"
										:title="$t('ProductDetail.product_type.title')"
										v-model="slotProps.data.product_type"
									>
									</Edit>

									<BrandEdit
										v-model="slotProps.data.brands_ref"
										:error="slotProps.errors['brands_ref']"
									>
									</BrandEdit>

									<ProducerEdit
										v-model="slotProps.data.producers_ref"
										:error="slotProps.errors['producers_ref']"
									>
									</ProducerEdit>
									<CountryEdit
										v-model="slotProps.data.countries_ref"
										:error="slotProps.errors['countries_ref']"
									>
									</CountryEdit>
									<PriceGroupEdit
										v-model="slotProps.data.price_groups_ref"
										:error="slotProps.errors['price_groups_ref']"
									>
									</PriceGroupEdit>

									<EditCheckbox
										id="use_marking"
										:label="$t('ProductDetail.use_marking.label')"
										:title="$t('ProductDetail.use_marking.title')"
										v-model="slotProps.data.use_marking"
									>
									</EditCheckbox>
									<EditCheckbox
										id="use_pack"
										:label="$t('ProductDetail.use_pack.label')"
										:title="$t('ProductDetail.use_pack.title')"
										v-model="slotProps.data.use_pack"
									>
									</EditCheckbox>
									<EditCheckbox
										id="use_gtd"
										:label="$t('ProductDetail.use_gtd.label')"
										:title="$t('ProductDetail.use_gtd.title')"
										v-model="slotProps.data.use_gtd"
									>
									</EditCheckbox>
									<EditCheckbox
										id="excisable"
										:label="$t('ProductDetail.excisable.label')"
										:title="$t('ProductDetail.excisable.title')"
										v-model="slotProps.data.excisable"
									>
									</EditCheckbox>
									<EditInt
										id="popularity"
										:label="$t('ProductDetail.popularity.label')"
										:title="$t('ProductDetail.popularity.title')"
										v-model="slotProps.data.popularity"
									>
									</EditInt>

									<!--
									<p>
										{{ $t('ProductDetail.measureUnit.label') }}
										<ProductMeasureUnit
											id="measureUnit"
											v-model="slotProps.data.measure_unit"
											:error="slotProps.errors['measure_unit']"
										>
										</ProductMeasureUnit>
									</p>
							-->
								</div>
								<!-- preview image -->
								<ProductCardAdmin
									:product="
										<ProductPreview>{
											id: slotProps.data.id,
											name: slotProps.data.name,
											code_1c: slotProps.data.code_1c,
											name_lat: slotProps.data.name_lat,
											price: 0,
											available: true,
											preview_path: mainPreviewPath,
											quant: 0,
											attr_filter: undefined,
										}
									"
									@cancel="formRef?.onCancel()"
									@save="formRef?.onSubmit()"
								>
								</ProductCardAdmin>
							</div>
						</tab>

						<tab :title="$t('ProductDetail.tabs.pictures')">
							<div class="tab-content-title">
								{{ $t('ProductDetail.tabs.pictures') }}
							</div>

							<ButtonAdd 
								v-if="slotProps.data.pictures?.length"
								@click="pictureUpload" 
							/>

							<div class="tab-content-container"> 
								<div class="tab-content">

									<!-- file -->
									<input
										type="file"
										ref="fileInput"
										@change="handleFileChange"
										style="display: none"
									/>

									<div v-if="slotProps.data.pictures?.length" >
										<div
											class="text-sm text-gray-500"
											v-if="
												(formData as unknown as ProductDetail)
													.pictures?.length
											"
										>
											{{
												t('ProductDetail.pictureIndex', {
													PICT_INDEX:
														(isNaN(currentPicture)
															? 0
															: currentPicture) + 1,
													PICT_COUNT: (
														formData as unknown as ProductDetail
													).pictures?.length,
												})
											}}
											<span v-show="isCurrentPictureMain">
												, {{ t('ProductDetail.isMainText') }}
											</span>
										</div>

										<Carousel
											ref="carousel"
											v-bind="carouselOptions"
											v-model="currentPicture"
										>
											<Slide
												v-for="(slide, index) in formData.pictures"
												:key="(slide as Picture).ref_1c"
											>
												<img
													:src="pictureSrc(slide)"
													:alt="`image-${index + 1}`"
												/>
											</Slide>
											<template #addons>
												<Navigation />
											</template>
										</Carousel>

										<!--
										<div class="container-form-cmd">
											<div>
												<Button
													@click="pictureUpload"
													:title="
														t(
															'ProductCatDetail.pictureUpload.title',
														)
													"
													:disabled="
														slotProps.data.id === undefined
															? true
															: false
													"
												>
													{{
														t(
															'ProductDetail.pictureUpload.caption',
														)
													}}
												</Button>

											</div>

											<Button
												@click="pictureDelete"
												:title="
													t('ProductDetail.pictureDelete.title')
												"
												:disabled="
													(formData as unknown as ProductDetail)
														.pictures?.length
														? false
														: true
												"
											>
												{{
													t('ProductDetail.pictureDelete.caption')
												}}
											</Button>

											<Button
												@click="pictureMakeMain"
												:title="
													t('ProductDetail.pictureMakeMain.title')
												"
												:disabled="
													(formData as unknown as ProductDetail)
														.pictures?.length
														? isCurrentPictureMain
														: true
												"
											>
												{{
													t(
														'ProductDetail.pictureMakeMain.caption',
													)
												}}
											</Button>
										</div>
										-->
									</div>
									<ProductPictNoData v-else :cmd-add="true"
										@add-picture="pictureUpload"
									>
									</ProductPictNoData>
								</div>

								<!-- preview image -->
								<ProductCardAdmin
									:product="
										<ProductPreview>{
											id: slotProps.data.id,
											name: slotProps.data.name,
											code_1c: slotProps.data.code_1c,
											name_lat: slotProps.data.name_lat,
											price: 0,
											available: true,
											preview_path: mainPreviewPath,
											quant: 0,
											attr_filter: undefined,
										}
									"
									@cancel="formRef?.onCancel()"
									@save="formRef?.onSubmit()"
								>
								</ProductCardAdmin>

							</div>
						</tab>

						<tab :title="$t('ProductDetail.tabs.product_cats')">
							<div class="tab-content-title">
								{{ $t('ProductDetail.tabs.product_cats') }}
							</div>

							<div class="tab-content-container">
								<div class="tab-content">
									<ProductLinkList
										v-if="slotProps.data.id"
										:productId="slotProps.data.id"
									/>
								</div>
							</div>
						</tab>

						<tab :title="$t('ProductDetail.tabs.certs')">
							<div class="tab-content-title">
								{{ $t('ProductDetail.tabs.certs') }}
							</div>

							<div class="tab-content-container">
								<div class="tab-content">
									<ProductCertificateUseRangeList
										v-if="slotProps.data.id"
										:productId="slotProps.data.id"
									/>
								</div>
							</div>
						</tab>

						<tab :title="$t('ProductDetail.tabs.chars')">
							<div class="tab-content-title">
								{{ $t('ProductDetail.tabs.chars') }}
							</div>

							<div class="tab-content-container">
								<div class="tab-content">
									<ProductCharDetails
										v-model="slotProps.data.char_details"
									/>
								</div>
							</div>
						</tab>

						<tab :title="$t('ProductDetail.tabs.attrs')">
							<div class="tab-content-title">
								{{ $t('ProductDetail.tabs.attrs') }}
							</div>

							<div class="tab-content-container">
								<div class="tab-content">
									<ProductAttrVals
										v-model="slotProps.data.product_attr_vals"
									/>
								</div>
							</div>
						</tab>

						<tab :title="$t('ProductDetail.tabs.stocks')">
							<div class="tab-content-title">
								{{ $t('ProductDetail.tabs.stocks') }}
							</div>

							<div class="tab-content-container">
								<div class="tab-content">
									<ProductStockList
										v-if="slotProps.data.id"
										:productId="slotProps.data.id"
									/>
								</div>
							</div>
						</tab>

						<tab :title="$t('ProductDetail.tabs.prices')">
							<div class="tab-content-title">
								{{ $t('ProductDetail.tabs.prices') }}
							</div>

							<div class="tab-content-container">
								<div class="tab-content">
									<ProductPriceList
										v-if="slotProps.data.id"
										:productId="slotProps.data.id"
									/>
								</div>
							</div>
						</tab>
					</tabs>
				</div>


			</div>
		</template>
	</FormCustom>

	<Confirmation
		v-model="confirmation.show"
		:txt="confirmation.text"
		@confirm="confirmation.confirmed"
		@reject="confirmation.rejected"
	>
	</Confirmation>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

import FormCustom from '@/lib/components/FormCustom.vue';
import Confirmation from '@/lib/components/Confirmation.vue';
import {
	type FormCustomProps,
	type FormCustomExposed,
} from '@/lib/types/formCustom';
import {
	newFormSrvOperations,
	type FormData,
	type FormKeys,
	type FormConfirmation,
} from '@/lib/types/form';

import Edit from '@/lib/components/Edit.vue';
import EditCheckbox from '@/lib/components/EditCheckbox.vue';
import EditInt from '@/lib/components/EditInt.vue';
import EditText from '@/lib/components/EditText.vue';
import Tabs from '@/lib/components/Tabs.vue';
import Tab from '@/lib/components/Tab.vue';
import Button from '@/lib/components/Button.vue';
import { type FormErrorList } from '@/lib/utils/useValidation';
import DetailTitle from '@/components/DetailTitle.vue';
import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';

import { useRouteParamsStore } from '@/lib/stores/useRouteParams';

import { productAdd, productUpdate, productDetail } from '@/services/product';
import {
	type ProductDetail,
	productFields,
	type ProductKey,
} from '@/models/product';
import {
	PICT_CDN_PROD_DETAIL,
	// PICT_CDN_PROD_PREVIEW,
} from '@/config/constants';
import BrandEdit from '@/components/BrandEdit.vue';
import { brandFields } from '@/dataFields/brand';
import ProducerEdit from '@/components/ProducerEdit.vue';
import { producerFields } from '@/dataFields/producer';
import CountryEdit from '@/components/CountryEdit.vue';
// import ProductMeasureUnit from '@/components/ProductMeasureUnit.vue';
import { countryFields } from '@/dataFields/country';
import PriceGroupEdit from '@/components/PriceGroupEdit.vue';
import { priceGroupFields } from '@/dataFields/priceGroup';
import ProductCertificateUseRangeList from '@/views/ProductCertificateUseRangeList.vue';
import ProductLinkList from '@/views/ProductLinkList.vue';
import ProductPriceList from '@/views/ProductPriceList.vue';
import ProductStockList from '@/views/ProductStockList.vue';
import ProductAttrVals from '@/components/ProductAttrVals.vue';
import ProductCharDetails from '@/components/ProductCharDetails.vue';
import ProductCardAdmin from '@/components/ProductCardAdmin.vue';
import ProductPictNoData from '@/components/ProductPictNoData.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';
import { type Picture } from '@/models/picture';
import type { HtmlSliderOptions } from '@/models/htmlSlider';
import type { ProductPreview } from '@/models/product';
import {
	productUploadPicture,
	productDelPicture,
	productSetPictureMain,
} from '@/services/product';
import { isFileExtensionAllowed } from '@/utils/fileUpload';

interface SlotProps {
	data: ProductDetail;
	errors: FormErrorList;
}

const props = defineProps<FormCustomProps>();
const { t } = useI18n();

const detailParams = useRouteParamsStore();

const objectKeys = ref<ProductKey>({ id: 0 });

const formRef = ref<FormCustomExposed | null>(null);

const fileInput = ref<HTMLInputElement | null>(null);

const currentPicture = ref<number>(0); //current slide index
const carousel = ref<any | null>(null);

const controlList = [
	{
		id: 'id',
		field: productFields.id,
	},
	{
		id: 'name',
		field: productFields.name,
	},
	{
		id: 'name_lat',
		field: productFields.name_lat,
	},
	{
		id: 'name_full',
		field: productFields.name_full,
	},
	{
		id: 'code_1c',
		field: productFields.code_1c,
	},
	{
		id: 'artikul',
		field: productFields.artikul,
	},
	{
		id: 'description',
		field: productFields.description,
	},
	{
		id: 'product_type',
		field: productFields.product_type,
	},
	{
		id: 'specification',
		field: productFields.specification,
	},
	{
		id: 'brands_ref',
		field: brandFields.brands_ref,
	},
	{
		id: 'producers_ref',
		field: producerFields.producers_ref,
	},
	{
		id: 'countries_ref',
		field: countryFields.countries_ref,
	},
	{
		id: 'price_groups_ref',
		field: priceGroupFields.price_groups_ref,
	},
	{
		id: 'use_marking',
		field: productFields.use_marking,
	},
	{
		id: 'use_gtd',
		field: productFields.use_gtd,
	},
	{
		id: 'use_pack',
		field: productFields.use_pack,
	},
	{
		id: 'excisable',
		field: productFields.excisable,
	},
	{
		id: 'popularity',
		field: productFields.popularity,
	},
	{
		id: 'measure_unit',
		field: productFields.measure_unit,
	},
	{
		id: 'product_attr_vals',
		field: productFields.product_attr_vals,
	},
];

const confirmation = reactive<FormConfirmation>({
	show: false,
	confirmed: undefined,
	rejected: undefined,
	text: '',
});

//picture delete server call
const pictureDeleteCont = async () => {
	const prod = formData.value as unknown as ProductDetail;
	if (
		!prod.pictures ||
		currentPicture.value >= prod.pictures.length ||
		currentPicture.value < 0
	) {
		throw new Error(
			'pictureDeleteCont incorrect index: ' +
				currentPicture.value +
				', len:' +
				prod.pictures?.length,
		);
	}
	try {
		const ref1c = prod.pictures[currentPicture.value].ref_1c;
		await productDelPicture.func(objectKeys.value, ref1c);
		//
		const notificationStore = useNotificationStore();
		notificationStore.addNotification(
			t('ProductDetail.pictureDelete.success'),
			5000,
			MessageType.Ok,
		);
		//delete picture from slider
		prod.pictures = prod.pictures.filter(
			(p: Picture) => p.ref_1c !== ref1c,
		);
		formData.value = prod as unknown as FormData;
		let ind = currentPicture.value;
		if (ind >= 0) {
			ind--;
			currentPicture.value = ind;
			if (carousel.value) {
				carousel.value.slideTo(ind);
				currentPicture.value = ind;
			}
		}
	} catch (error) {
		const msg = error instanceof Error ? error.message : t('unknownError');
		const notificationStore = useNotificationStore();
		notificationStore.addNotification(msg, 5000, MessageType.Err);
	}
};
const pictureDelete = () => {
	confirmation.confirmed = function () {
		pictureDeleteCont();
	};
	confirmation.text = t('ProductDetail.pictureDelete.confirmation');
	confirmation.show = true;
};

//picture make main
const pictureMakeMain = async () => {
	const prod = formData.value as unknown as ProductDetail;
	if (!prod.pictures || currentPicture.value >= prod.pictures.length) {
		throw new Error('pictureDeleteCont incorrect index');
	}
	try {
		const ref1c = prod.pictures[currentPicture.value].ref_1c;
		await productSetPictureMain.func(objectKeys.value, ref1c);
		//
		const notificationStore = useNotificationStore();
		notificationStore.addNotification(
			t('ProductDetail.pictureMakeMain.success'),
			5000,
			MessageType.Ok,
		);
		prod.pictures.forEach((p: Picture) => {
			p.main = p.ref_1c == ref1c;
		});
		isCurrentPictureMain.value = true;
	} catch (error) {
		const msg = error instanceof Error ? error.message : t('unknownError');
		const notificationStore = useNotificationStore();
		notificationStore.addNotification(msg, 5000, MessageType.Err);
	}
};

const pictureUpload = () => {
	fileInput.value?.click();
};

//picture upload
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

	const allowedExt = ['jpg', 'png', 'jpeg'];
	try {
		const { extension, isAllowed } = isFileExtensionAllowed(
			file,
			allowedExt,
		);
		if (!isAllowed) {
			throw new Error(t('extensionIsNotAllowed'));
		}
		const prod = formData.value as unknown as ProductDetail;
		const contentInfo = <Picture>{
			ref_1c: crypto.randomUUID(),
			size: file.size,
			ext: extension,
			main: !prod.pictures || !prod.pictures.length,
		};
		const uploadData = new FormData(); //multypartform data
		uploadData.append('content_data', file);
		uploadData.append('id', objectKeys.value.id.toString());
		uploadData.append('content_info', JSON.stringify(contentInfo));
		//
		await productUploadPicture.func(uploadData);
		//
		const notificationStore = useNotificationStore();
		notificationStore.addNotification(
			t('ProductDetail.pictureUpload.success'),
			5000,
			MessageType.Ok,
		);
		const _formData = formData.value as unknown as ProductDetail;
		if (!_formData.pictures) {
			_formData.pictures = <Picture[]>[];
		}
		_formData.pictures.push(contentInfo);
		formData.value = _formData as unknown as FormData;
		currentPicture.value = _formData.pictures.length - 1;
		if (carousel.value) {
			carousel.value.slideTo(currentPicture.value);
			currentPicture.value = _formData.pictures.length - 1;
		}
		isCurrentPictureMain.value = contentInfo.main;
	} catch (error) {
		const msg = error instanceof Error ? error.message : t('unknownError');
		const notificationStore = useNotificationStore();
		notificationStore.addNotification(msg, 5000, MessageType.Err);
	}
};

const pictureSrc = (slide: Picture) =>
	`${PICT_CDN_PROD_DETAIL}/${slide.ref_1c}.${slide.ext}`;
const mainPreviewPath = computed(() => {
	const prod = formData.value as unknown as ProductDetail;
	const mainPict = prod.pictures?.filter((p: Picture) => p.main);
	if (mainPict?.length) {
		return `${mainPict[0].ref_1c}.${mainPict[0].preview_ext ?? 'png'}`;
	}
});

const carouselOptions: HtmlSliderOptions = {
	navigationEnabled: true,
	enabled: true,
	itemsToShow: 1,
	itemsToScroll: 1,
	mouseDrag: true,
	mouseTouch: true,
	wrapAround: true,
	snapAlign: 'center',
	transition: 0,
	touchDrag: false,
	autoplay: 0,
	perPage: 1,
	pauseAutoplayOnHover: false,
	breakpointMode: 'viewport',
	breakpoints: null,
	modelValue: 0,
	paginationEnabled: true,
	dir: 'ltr',
	gap: 0,
	height: '300px',
	ignoreAnimations: false,
	i18n: {
		iconArrowLeft: t('ProductPublicDetail.imgSlider.next'),
		iconArrowRight: t('ProductPublicDetail.imgSlider.previous'),
	},
};
const onKeysUpdate = (newKeys: FormKeys) => {
	objectKeys.value = newKeys as unknown as ProductKey;
};

const isCurrentPictureMain = ref(false);

const formData = ref<FormData>({});
const onFormDataUpdate = (newFormData: FormData) => {
	formData.value = newFormData;
};

// const isCurrentPictureMain = computed( () => {
// 	let res = false;
// 	const prod = formData.value as unknown as ProductDetail;
// 	if(prod && prod.pictures){
// 		const curRef1c = prod.pictures[currentPicture.value].ref_1c;
// 		prod.pictures.forEach((p:Picture)=> {
// 			if(p.ref_1c = curRef1c){
// 				res = p.main;
// 			}
// 		});
// 	}
// 	return res;
// });

watch(formData, (newFormData: FormData) => {
	if (!newFormData) {
		// isCurrentPictureMain.value = false;
		return;
	}
	const prod = newFormData as unknown as ProductDetail;
	if (!prod.pictures || currentPicture.value >= prod.pictures.length) {
		isCurrentPictureMain.value = false;
		return;
	}
	isCurrentPictureMain.value = prod.pictures[currentPicture.value].main;
});

watch(currentPicture, (newCurrentPicture: number) => {
	const prod = formData.value as unknown as ProductDetail;
	if (
		!prod.pictures ||
		newCurrentPicture === undefined ||
		newCurrentPicture >= prod.pictures.length ||
		newCurrentPicture < 0 ||
		!prod.pictures[newCurrentPicture]
	) {
		isCurrentPictureMain.value = false;
		return;
	}
	isCurrentPictureMain.value = prod.pictures[newCurrentPicture].main;
});
</script>

<style scoped>
:deep(.control-label) {
	@apply min-w-[180px];
}
</style>
