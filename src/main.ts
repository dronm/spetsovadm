import { createApp, type Component } from 'vue';
import { createPinia } from 'pinia';
import { computed } from 'vue';
import i18n from './i18n';

import { vMaska } from 'maska/vue';
// import { VuebizUI } from 'vuebiz-ui';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import App from './App.vue';
import router from './router';

import './base.css';
import './styles.css';

//https://developer.tech.yandex.ru/services developer lk
//checking:
//https://api-maps.yandex.ru/v3/?lang=ru_RU&apikey=1038f3a9-856b-41d6-b7a9-6118636c7d68
//documentation:
//https://yandex.ru/maps-api/docs/js-api/common/connection/vuefy.html
import { createYmaps } from 'vue-yandex-maps';
import { YANDEX_API_KEY, ERROR_NOTIF_TIMEOUT } from './config/constants';

//golabal notificaton on error
import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';
import { APIError } from '@/lib/services/Conn';
import srvConn from '@/services/srvConn';
import { useAuthStore } from '@/stores/useAuthStore';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(
	createYmaps({
		apikey: YANDEX_API_KEY,
	}),
);
app.directive('maska', vMaska);
// app.use(VuebizUI, { i18n });

app.component('font-awesome-icon', FontAwesomeIcon);

// Import all `.vue` files from the icons folder
const iconModules: Record<string, { default: Component }> = import.meta.glob(
  '@/components/icons/*.vue',
  { eager: true }
)
Object.entries(iconModules).forEach(([path, module]) => {
  const name = path.split('/').pop()?.replace('.vue', '') as string // e.g. 'IconLogo'
  app.component(name, module.default)
})

app.config.errorHandler = (err, instance, info) => {
	console.error('Global Error Handler:', err);
	console.error('Vue Component Instance:', instance);
	console.error('Error Info:', info);

	const isAPIErr = err instanceof APIError;
	const isErr = err instanceof Error;
	let msg: string;
	console.log('isAPIErr:' + isAPIErr);
	if (isAPIErr) {
		//401 - logout if logged
		msg = (err as APIError).message || 'unknown API error';
	} else if (isErr) {
		msg = (err as Error).message || 'unknown error';
	} else {
		msg = String(err);
	}
	const isDev = import.meta.env.MODE === 'development';
	if (isAPIErr || isDev) {
		//for dev mode show all errors, otherwise show only api errors.
		const notificationStore = useNotificationStore();
		notificationStore.addNotification(
			msg,
			ERROR_NOTIF_TIMEOUT,
			MessageType.Err,
		);
	} else if (!isDev) {
		//to server
		// logErrorToService(err, instance, info);
	}
};

// "first": new URL(`assets/pag/first.png`, import.meta.url).href,
app.provide('paginationComponents', {
	"first": "ChevronLeftDouble",
	"prev": "ChevronLeft",
	"last": "ChevronRightDouble",
	"next": "ChevronRight"
});

app.mount('#app');

const authStore = useAuthStore();
const authed = computed(() => authStore.isAuthenticated());
srvConn.isAuthed = authed.value;
srvConn.unlogUser = authStore.setUserUnlogged;
