import type { FormatDateOpts } from '@/lib/types/controlTypes';

export const API_BASE_URL = import.meta.env.VITE_BASE_API;
export const API_TIMEOUT = 1000;

export const LOCALE = 'ru';
export const CURRENCY = 'RUB';

export const COLLECTION_COUNT = 10;
export const COLLECTION_SHOW_PAGES = 6;
export const ERROR_NOTIF_TIMEOUT = 10000;
export const NOTE_NOTIF_TIMEOUT = 5000;

export const PROD_PUBLIC_COUNT = 50;
export const PROD_PREVIEW_EXT = 'png';

export const TEL_REG_EXP = /^[349]\d*$/;
export const TEL_LEN = 10;
export const TEL_MASK = '+7(###)-###-##-##';
export const EMAIL_REG_EXP = /^[a-zA-Z0-9,_%+-]+@[a-zA-Z0-9,-]+\.[a-zA-Z]{2,}$/;
export const SEND_LOGIN_CODE_THROTLE_SEC = 120;

//mainMenu
export const MAIN_MENU_MENU = `${API_BASE_URL}/main-menu/menu`;

export const SELECT_WIN_PROPS = { width: 500, height: 400 };
export const OPEN_WIN_PROPS = { width: 250, height: 400 };

export const MAIN_MENU_FOR_USER = `${API_BASE_URL}/main-menu`;

export const dateTimeFormatOpts = <FormatDateOpts>{
	year: '2-digit',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hour12: false,
};
export const dateFormatOpts = <FormatDateOpts>{
	datestyle: 'short',
};

export const PRODUCT_CAT_PUBLIC_LIST = `${API_BASE_URL}/product-cat`;
export const PRODUCT_CAT_PUBLIC_DETAIL = `${API_BASE_URL}/product-cat/{{CAT_NAME_LAT}}`; //product_cat_det
export const PRODUCT_CAT_POP_LIST = `${API_BASE_URL}/product-cat/hits`; //product_cat_hits
export const PRODUCT_CAT_LIST = `${API_BASE_URL}/product-cat/list`;
export const PRODUCT_CAT_HIERARCHY = `${API_BASE_URL}/product-cat/hierarchy`;
export const PRODUCT_CAT_DETAIL = `${API_BASE_URL}/product-cat/detail/{{ID}}`;
export const PRODUCT_CAT_ADD = `${API_BASE_URL}/product-cat/add`;
export const PRODUCT_CAT_DEL = `${API_BASE_URL}/product-cat/del`;
export const PRODUCT_CAT_UPD = `${API_BASE_URL}/product-cat/update`;
export const PRODUCT_CAT_UPLOAD_PICTURE = `${API_BASE_URL}/product-cat/upload-picture`;

export const PROD_CAT_SEARCH = `${API_BASE_URL}/search/{{SEARCH}}`;

export const PROD_SEARCH = `${API_BASE_URL}/product/search`; //products/search
export const PROD_POP = `${API_BASE_URL}/product/hits`; //produt_hits
export const PROD_PUBLIC_DETAIL = `${API_BASE_URL}/product/{{PRODUCT_NAME_LAT}}`; //product_det
export const PROD_PUBLIC_LIST = `${API_BASE_URL}/product`;
export const PROD_LIST = `${API_BASE_URL}/product/list`;
export const PROD_DETAIL = `${API_BASE_URL}/product/detail/{{ID}}`;
export const PROD_ADD = `${API_BASE_URL}/product/add`;
export const PROD_DEL = `${API_BASE_URL}/product/del`;
export const PROD_UPD = `${API_BASE_URL}/product/update`;
export const PROD_UPLOAD_PICTURE = `${API_BASE_URL}/product/upload-picture`;
export const PROD_SET_PICTURE_MAIN = `${API_BASE_URL}/product/set-picture-main`;
export const PROD_DEL_PICTURE = `${API_BASE_URL}/product/del-picture`;

export const PROD_STOCK_LIST = `${API_BASE_URL}/product-stock/list`;
export const PROD_PRICE_LIST = `${API_BASE_URL}/product-price/list`;

//product certificate
export const PROD_CERT_LIST = `${API_BASE_URL}/product-cert/list`;
export const PROD_CERT_DETAIL = `${API_BASE_URL}/product-cert/detail/{{ID}}`;
export const PROD_CERT_ADD = `${API_BASE_URL}/product-cert/add`;
export const PROD_CERT_DEL = `${API_BASE_URL}/product-cert/del`;
export const PROD_CERT_UPD = `${API_BASE_URL}/product-cert/update`;
export const PROD_CERT_UPLOAD_PICTURE = `${API_BASE_URL}/product-cert/upload-picture`;
//

//product certificate use ranges
export const PROD_CERT_USE_RANGE_LIST = `${API_BASE_URL}/product-cert-use-range/list`;
export const PROD_CERT_USE_RANGE_DETAIL = `${API_BASE_URL}/product-cert-use-range/detail/{{PROD_ID}}/{{CAT_ID}}`;
export const PROD_CERT_USE_RANGE_ADD = `${API_BASE_URL}/product-cert-use-range/add`;
export const PROD_CERT_USE_RANGE_DEL = `${API_BASE_URL}/product-cert-use-range/del`;
export const PROD_CERT_USE_RANGE_UPD = `${API_BASE_URL}/product-cert-use-range/update`;

//store
export const STORE_PUBLIC_LIST = `${API_BASE_URL}/store`;
export const STORE_LIST = `${API_BASE_URL}/store/list`;
export const STORE_DETAIL = `${API_BASE_URL}/store/{{ID}}`;
export const STORE_ADD = `${API_BASE_URL}/store/add`;
export const STORE_DEL = `${API_BASE_URL}/store/del`;
export const STORE_UPD = `${API_BASE_URL}/store/update`;

//user
export const USER_LOGIN_EMAIL = `${API_BASE_URL}/user/login-email`;
export const USER_LOGIN_TEL = `${API_BASE_URL}/user/login-tel`;
export const USER_LOGIN = `${API_BASE_URL}/user/login`;
export const USER_VERIFY_TEL = `${API_BASE_URL}/user/verify-tel`;
export const USER_LOGOUT = `${API_BASE_URL}/user/logout`;
export const USER_CHECK_CRED = `${API_BASE_URL}/user/check-cred`;
export const USER_SEND_TEL_CODE = `${API_BASE_URL}/user/send-tel-code`;
export const USER_SEND_EMAIL_VERIF = `${API_BASE_URL}/user/send-email-verif`;
export const USER_REGISTER = `${API_BASE_URL}/user/register`;
export const USER_PROFILE = `${API_BASE_URL}/profile`;
export const USER_LIST = `${API_BASE_URL}/user/list`;
export const USER_DETAIL = `${API_BASE_URL}/user/{{ID}}`;
export const USER_ADD = `${API_BASE_URL}/user/add`;
export const USER_DEL = `${API_BASE_URL}/user/del`;
export const USER_UPD = `${API_BASE_URL}/user/update`;
export const USER_UPD_PROFILE = `${API_BASE_URL}/user/update-profile`;
export const USER_UPD_PWD = `${API_BASE_URL}/user/update-password`;

export const LOGIN_LIST = `${API_BASE_URL}/login/list`;
export const LOGIN_DETAIL = `${API_BASE_URL}/login/{{ID}}`;
export const LOGIN_USER_LIST = `${API_BASE_URL}/user-login/{{ID}}`;
export const LOGIN_DEVICE_USER_LIST = `${API_BASE_URL}/user-login-device/{{ID}}`;
export const LOGIN_DEVICE_SET_BAN = `${API_BASE_URL}/user-login-device-set-ban`;

//time-zone-locale
export const TIME_ZONE_LOCALE_LIST = `${API_BASE_URL}/time-zone-locale/list`;
export const TIME_ZONE_LOCALE_DETAIL = `${API_BASE_URL}/time-zone-locale/{{ID}}`;
export const TIME_ZONE_LOCALE_ADD = `${API_BASE_URL}/time-zone-locale/add`;
export const TIME_ZONE_LOCALE_DEL = `${API_BASE_URL}/time-zone-locale/del`;
export const TIME_ZONE_LOCALE_UPD = `${API_BASE_URL}/time-zone-locale/update`;

//priceGroup
export const PRICE_GROUP_LIST = `${API_BASE_URL}/price-group/list`;
export const PRICE_GROUP_DETAIL = `${API_BASE_URL}/price-group/{{ID}}`;
export const PRICE_GROUP_ADD = `${API_BASE_URL}/price-group/add`;
export const PRICE_GROUP_DEL = `${API_BASE_URL}/price-group/del`;
export const PRICE_GROUP_UPD = `${API_BASE_URL}/price-group/update`;

//producer
export const PRODUCER_LIST = `${API_BASE_URL}/producer/list`;
export const PRODUCER_DETAIL = `${API_BASE_URL}/producer/{{ID}}`;
export const PRODUCER_ADD = `${API_BASE_URL}/producer/add`;
export const PRODUCER_DEL = `${API_BASE_URL}/producer/del`;
export const PRODUCER_UPD = `${API_BASE_URL}/producer/update`;

//country
export const COUNTRY_LIST = `${API_BASE_URL}/country/list`;
export const COUNTRY_DETAIL = `${API_BASE_URL}/country/{{ID}}`;
export const COUNTRY_ADD = `${API_BASE_URL}/country/add`;
export const COUNTRY_DEL = `${API_BASE_URL}/country/del`;
export const COUNTRY_UPD = `${API_BASE_URL}/country/update`;

//product-char
export const PRODUCT_CHAR_LIST = `${API_BASE_URL}/product-char/list`;
export const PRODUCT_CHAR_DETAIL = `${API_BASE_URL}/product-char/{{ID}}`;
export const PRODUCT_CHAR_ADD = `${API_BASE_URL}/product-char/add`;
export const PRODUCT_CHAR_DEL = `${API_BASE_URL}/product-char/del`;
export const PRODUCT_CHAR_UPD = `${API_BASE_URL}/product-char/update`;

//product-char-value
export const PRODUCT_CHAR_VALUE_LIST = `${API_BASE_URL}/product-char-value/list`;
export const PRODUCT_CHAR_VALUE_DETAIL = `${API_BASE_URL}/product-char-value/{{ID}}`;
export const PRODUCT_CHAR_VALUE_ADD = `${API_BASE_URL}/product-char-value/add`;
export const PRODUCT_CHAR_VALUE_DEL = `${API_BASE_URL}/product-char-value/del`;
export const PRODUCT_CHAR_VALUE_UPD = `${API_BASE_URL}/product-char-value/update`;

//country
export const HTML_SLIDER_LIST = `${API_BASE_URL}/html-slider/list`;
export const HTML_SLIDER_DETAIL = `${API_BASE_URL}/html-slider/{{ID}}`;
export const HTML_SLIDER_ADD = `${API_BASE_URL}/html-slider/add`;
export const HTML_SLIDER_DEL = `${API_BASE_URL}/html-slider/del`;
export const HTML_SLIDER_UPD = `${API_BASE_URL}/html-slider/update`;
export const HTML_SLIDER_PUBLIC = `${API_BASE_URL}/slider/{{SLIDER_NAME}}`;

//pictures
export const PICT_CDN = import.meta.env.VITE_BASE_CDN;
export const PICT_CDN_HTMLSLIDERS = `${PICT_CDN}/html_sliders`;
export const PICT_CDN_PROD_DETAIL = `${PICT_CDN}/products`;
export const PICT_CDN_PROD_PREVIEW = `${PICT_CDN}/products_preview`;
export const PICT_CDN_CAT_PREVIEW = `${PICT_CDN}/cats_preview`;
export const PICT_CDN_CERT_DETAIL = `${PICT_CDN}/certs`;
export const PICT_CDN_CERT_PREVIEW = `${PICT_CDN}/certs_preview`;

export const MAIN_TEL = '+3452568686';
export const MAIN_TEL_DESCR = '+7 (3452) 56 86 86';

//lenokm78
export const YANDEX_API_KEY = '1038f3a9-856b-41d6-b7a9-6118636c7d68';
