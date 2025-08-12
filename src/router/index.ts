import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import StorePublicList from '@/views/StorePublicList.vue';
import About from '@/views/About.vue';
import NotFound from '@/views/NotFound.vue';
import Logout from '@/views/Logout.vue';
import UserProfile from '@/views/UserProfile.vue';
import ConstEmail from '@/views/ConstEmail.vue';

import NotifApp from '@/views/NotifApp.vue';
import NotifOutMessageList from '@/views/NotifOutMessageList.vue';

import ProductPublicList from '@/views/ProductPublicList.vue';
import ProductPublicDetail from '@/views/ProductPublicDetail.vue';
import ProductList from '@/views/ProductList.vue';
import ProductDetail from '@/views/ProductDetail.vue';

//product,category search
import SearchResult from '@/views/SearchResult.vue';

import CatPublicList from '@/views/CatPublicList.vue';
import CatPublicDetail from '@/views/CatPublicDetail.vue';

import StoreList from '@/views/StoreList.vue';
import UserList from '@/views/UserList.vue';
import UserDetail from '@/views/UserDetail.vue';
import TimeZoneLocaleList from '@/views/TimeZoneLocaleList.vue';
import BrandList from '@/views/BrandList.vue';
import PriceGroupList from '@/views/PriceGroupList.vue';
import CountryList from '@/views/CountryList.vue';
import ProducerList from '@/views/ProducerList.vue';
import ProductCatList from '@/views/ProductCatList.vue';
import ProductCatDetail from '@/views/ProductCatDetail.vue';
import ProductCertificateList from '@/views/ProductCertificateList.vue';
import ProductCharList from '@/views/ProductCharList.vue';
import ProductCharDetail from '@/views/ProductCharDetail.vue';
import LoginList from '@/views/LoginList.vue';
import NotifTemplateList from '@/views/NotifTemplateList.vue';
import NotifTemplateDetail from '@/views/NotifTemplateDetail.vue';

import ClientOrderList from '@/views/ClientOrderList.vue';
import ClientPayList from '@/views/ClientPayList.vue';
import ClientContractList from '@/views/ClientContractList.vue';

import CheckoutOrderList from '@/views/CheckoutOrderList.vue';

import ClientList from '@/views/ClientList.vue';
import ClientDetail from '@/views/ClientDetail.vue';

import SupplierList from '@/views/SupplierList.vue';
import SupplierDetail from '@/views/SupplierDetail.vue';

import VerifCodeList from '@/views/VerifCodeList.vue';
import ConfirmationStatusList from '@/views/ConfirmationStatusList.vue';

import PromPointList from '@/views/PromPointList.vue';
import PromPointDetail from '@/views/PromPointDetail.vue';

import PromActionList from '@/views/PromActionList.vue';
import PromActionDetail from '@/views/PromActionDetail.vue';

import PromCodeList from '@/views/PromCodeList.vue';
import PromCodeDetail from '@/views/PromCodeDetail.vue';

import ProductCatFilterList from '@/views/ProductCatFilterList.vue';
import ProductCatFilterDetail from '@/views/ProductCatFilterDetail.vue';

import RepClient from '@/views/RepClient.vue';
import RepProduct from '@/views/RepProduct.vue';

import FormProductExpImp from '@/views/FormProductExpImp.vue';
import FormCatFilterConstructor from '@/views/FormCatFilterConstructor.vue';
import FormCatConstructor from '@/views/FormCatConstructor.vue';

import FormSupplierAPI from '@/views/FormSupplierAPI.vue';
import FormPaySystems from '@/views/FormPaySystems.vue';
import FormExchange1c from '@/views/FormExchange1c.vue';

import FormWarehouse from '@/views/FormWarehouse.vue';

import DelivRFPost from '@/views/DelivRFPost.vue';
import DelivSDEK from '@/views/DelivSDEK.vue';
import DelivSelf from '@/views/DelivSelf.vue';

// import ProductCatHierarchy from '@/views/ProductCatHierarchy.vue';
import ProductCatSetProduct from '@/views/ProductCatSetProduct.vue';

const routes = [
	{
		path: '/',
		name: 'Main',
		component: Home,
	},
	{
		path: '/logout',
		name: 'logout',
		component: Logout,
	},
	{
		path: '/profile',
		name: 'userProfile',
		component: UserProfile,
	},
	{
		path: '/email',
		name: 'constEmail',
		component: ConstEmail,
	},
	{
		path: '/notifApp',
		name: 'notifApp',
		component: NotifApp,
	},
	{
		path: '/notifOutMessageList',
		name: 'notifOutMessageList',
		component: NotifOutMessageList,
	},

	{
		path: '/Store',
		component: StorePublicList,
	},
	{
		path: '/StoreList',
		component: StoreList,
		name: 'storeList',
	},

	{
		path: '/About',
		component: About,
	},

	{
		path: '/product/:nameLat',
		component: ProductPublicDetail,
		name: 'productPublicDetail',
	},

	{
		path: '/product',
		component: ProductPublicList,
		name: 'productPublicList',
	},

	{
		path: '/product/list',
		component: ProductList,
		name: 'productList',
	},
	{
		path: '/product/detail',
		component: ProductDetail,
		name: 'productDetail',
	},
	{
		path: '/product-cat/:nameLat',
		component: CatPublicDetail,
	},

	{
		path: '/product-cat',
		component: CatPublicList,
	},

	{
		path: '/user/list',
		component: UserList,
		name: 'userList',
	},
	{
		path: '/user',
		component: UserDetail,
		name: 'userDetail',
	},

	{
		path: '/time-zone-locales',
		component: TimeZoneLocaleList,
		name: 'timeZoneLocaleList',
	},
	{
		path: '/brands',
		component: BrandList,
		name: 'brandList',
	},
	{
		path: '/price-groups',
		component: PriceGroupList,
		name: 'priceGroupList',
	},
	{
		path: '/producers',
		component: ProducerList,
		name: 'producerList',
	},
	{
		path: '/product-cats',
		component: ProductCatList,
		name: 'productCatList',
	},
	{
		path: '/product-cat/detail',
		component: ProductCatDetail,
		name: 'productCatDetail',
	},
	{
		path: '/coutries',
		component: CountryList,
		name: 'countryList',
	},
	{
		path: '/product-cert',
		component: ProductCertificateList,
		name: 'productCertificateList',
	},
	{
		path: '/product-char',
		component: ProductCharList,
		name: 'productCharList',
	},
	{
		path: '/product-char',
		component: ProductCharDetail,
		name: 'productCharDetail',
	},
	{
		path: '/logins',
		component: LoginList,
		name: 'loginList',
	},
	{
		path: '/notif-template',
		component: NotifTemplateList,
		name: 'notifTemplateList',
	},
	{
		path: '/notif-template/detail',
		component: NotifTemplateDetail,
		name: 'notifTemplateDetail',
	},
	{
		path: '/search/:search',
		component: SearchResult,
		name: 'searchResult',
	},
	{
		path: '/:notFound(.*)',
		component: NotFound,
	},
	{
		path: '/client-order',
		component: ClientOrderList,
		name: 'clientOrderList',
	},
	{
		path: '/client-contract',
		component: ClientContractList,
		name: 'clientContractList',
	},
	{
		path: '/checkout-order',
		component: CheckoutOrderList,
		name: 'checkoutOrderList',
	},
	{
		path: '/client',
		component: ClientList,
		name: 'clientList',
	},
	{
		path: '/client/detail',
		component: ClientDetail,
		name: 'clientDetail',
	},
	{
		path: '/supplier',
		component: SupplierList,
		name: 'supplierList',
	},
	{
		path: '/supplier/detail',
		component: SupplierDetail,
		name: 'supplierDetail',
	},
	{
		path: '/client-pay',
		component: ClientPayList,
		name: 'clientPayList',
	},
	{
		path: '/verif-code',
		component: VerifCodeList,
		name: 'verifCodeList',
	},
	{
		path: '/confirmation-status',
		component: ConfirmationStatusList,
		name: 'confirmationStatusList',
	},
	{
		path: '/prom-point',
		component: PromPointList,
		name: 'promPointList',
	},
	{
		path: '/prom-point/detail',
		component: PromPointDetail,
		name: 'promPointDetail',
	},
	{
		path: '/prom-code',
		component: PromCodeList,
		name: 'promCodeList',
	},
	{
		path: '/prom-code/detail',
		component: PromCodeDetail,
		name: 'promCodeDetail',
	},
	{
		path: '/prom-action',
		component: PromActionList,
		name: 'promActionList',
	},
	{
		path: '/prom-action/detail',
		component: PromActionDetail,
		name: 'promActionDetail',
	},
	{
		path: '/product-cat-filter',
		component: ProductCatFilterList,
		name: 'productCatFilterList',
	},
	{
		path: '/product-cat-filter/detail',
		component: ProductCatFilterDetail,
		name: 'productCatFilterDetail',
	},
	{
		path: '/prom-code/detail',
		component: PromCodeDetail,
		name: 'promCodeDetail',
	},
	{
		path: '/rep-product',
		component: RepProduct,
		name: 'repProduct',
	},
	{
		path: '/rep-client',
		component: RepClient,
		name: 'repClient',
	},
	{
		path: '/prod-exp-imp',
		component: FormProductExpImp,
		name: 'formProductExpImp',
	},
	{
		path: '/cat-filter-constructor',
		component: FormCatFilterConstructor,
		name: 'formCatFilterConstructor',
	},
	{
		path: '/cat-constructor',
		component: FormCatConstructor,
		name: 'formCatConstructor',
	},
	{
		path: '/supplier-api',
		component: FormSupplierAPI,
		name: 'formSupplierAPI',
	},
	{
		path: '/pay-systems',
		component: FormPaySystems,
		name: 'formPaySystems',
	},
	{
		path: '/exchange-1c',
		component: FormExchange1c,
		name: 'formExchange1c',
	},
	{
		path: '/deliv-post',
		component: DelivRFPost,
		name: 'delivRFPost',
	},
	{
		path: '/deliv-sdek',
		component: DelivSDEK,
		name: 'delivSDEK',
	},
	{
		path: '/deliv-self',
		component: DelivSelf,
		name: 'delivSelf',
	},
	{
		path: '/product-cat-hierarchy',
		component: ProductCatSetProduct,
		name: 'productCatSetProduct',
	},
	{
		path: '/warehouse',
		component: FormWarehouse,
		name: 'formWarehouse',
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
	routes,
});

export default router;
