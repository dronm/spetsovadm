import { API_BASE_URL } from './constants';
//prom-action
export const PROM_ACTION_LIST = `${API_BASE_URL}/prom-action/list`;
export const PROM_ACTION_DETAIL = `${API_BASE_URL}/prom-action/{{ID}}`;
export const PROM_ACTION_ADD = `${API_BASE_URL}/prom-action/add`;
export const PROM_ACTION_DEL = `${API_BASE_URL}/prom-action/del`;
export const PROM_ACTION_UPD = `${API_BASE_URL}/prom-action/update`;
