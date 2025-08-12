import { API_BASE_URL } from './constants';
//client
export const CLIENT_LIST = `${API_BASE_URL}/client/list`;
export const CLIENT_DETAIL = `${API_BASE_URL}/client/{{ID}}`;
export const CLIENT_ADD = `${API_BASE_URL}/client/add`;
export const CLIENT_DEL = `${API_BASE_URL}/client/del`;
export const CLIENT_UPD = `${API_BASE_URL}/client/update`;
export const CLIENT_FIND_BY_INN = `${API_BASE_URL}/client/find-by-inn/{{INN}}`;
