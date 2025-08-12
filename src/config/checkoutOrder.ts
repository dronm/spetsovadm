import { API_BASE_URL } from './constants';
//checkout-order
export const CHECKOUT_ORDER_LIST = `${API_BASE_URL}/checkout-order/list`;
export const CHECKOUT_ORDER_DETAIL = `${API_BASE_URL}/checkout-order/{{ID}}`;
export const CHECKOUT_ORDER_ADD = `${API_BASE_URL}/checkout-order/add`;
export const CHECKOUT_ORDER_DEL = `${API_BASE_URL}/checkout-order/del`;
export const CHECKOUT_ORDER_UPD = `${API_BASE_URL}/checkout-order/update`;
