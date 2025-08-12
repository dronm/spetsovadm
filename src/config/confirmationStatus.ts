import { API_BASE_URL } from './constants';
//confirmation-status
export const CONFIRMATION_STATUS_LIST = `${API_BASE_URL}/confirmation-status/list`;
export const CONFIRMATION_STATUS_DETAIL = `${API_BASE_URL}/confirmation-status/{{ID}}`;
export const CONFIRMATION_STATUS_ADD = `${API_BASE_URL}/confirmation-status/add`;
export const CONFIRMATION_STATUS_DEL = `${API_BASE_URL}/confirmation-status/del`;
export const CONFIRMATION_STATUS_UPD = `${API_BASE_URL}/confirmation-status/update`;
