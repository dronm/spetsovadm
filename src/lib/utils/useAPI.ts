import {
	useNotificationStore,
	MessageType,
	type NotificationParam,
} from "../stores/useNotificationStore";
import type { APICall } from "../types/apiCall";

export interface APIResult {
	isError: boolean;
	data?: any;
}

export const useAPI = async (
	apiCall: APICall,
	okNotif: NotificationParam | string | null,
	errNotifTimeout: number,
	...args: any
): Promise<APIResult> => {
	let result = <APIResult>{ isError: false };
	try {
		result.data = await apiCall.func(...args);
		if (okNotif !== null) {
			//need to notify
			const notificationStore = useNotificationStore();
			if (typeof okNotif === "string") {
				okNotif = <NotificationParam>{ content: okNotif };
			}
			notificationStore.addNotification(okNotif);
		}
	} catch (err: unknown) {
		result.isError = false;
		const errMsg = err instanceof Error ? err.message : String(err);

		const notificationStore = useNotificationStore();
		notificationStore.addNotification(errMsg, errNotifTimeout, MessageType.Err);
	}

	return result;
};
