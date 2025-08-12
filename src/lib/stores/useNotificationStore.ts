import { defineStore } from "pinia";
import { ref } from "vue";

export enum MessageType {
	Err = "error",
	Warn = "warning",
	Info = "info",
	Ok = "success",
}

interface Notification {
	id: number;
	content: string;
	timeout: number;
	messageType: MessageType;
}

export interface NotificationParam {
	content: string;
	timeout?: number;
	messageType?: MessageType;
}

export const useNotificationStore = defineStore("notification", () => {
	const notifications = ref<Notification[]>([]);

	// Define store early so we can use it in timeouts
	const store = {
		notifications,
		addNotification,
		removeNotification,
	};

	// Remove notification by id
	function removeNotification(id: number): void {
		notifications.value = notifications.value.filter((n) => n.id !== id);
	}

	// Add notification
	function addNotification(
		paramOrContent: NotificationParam | string,
		timeout: number = 5000,
		messageType: MessageType = MessageType.Info,
	): void {
		let content: string;
		if (typeof paramOrContent === "object") {
			({
				content,
				timeout = 5000,
				messageType = MessageType.Info,
			} = paramOrContent);
		} else {
			content = paramOrContent;
		}

		const id = Date.now(); // unique ID for each notification
		notifications.value.push({ id, content, timeout, messageType });

		if (timeout) {
			setTimeout(() => {
				store.removeNotification(id);
			}, timeout);
		}
	}

	return store;
});
