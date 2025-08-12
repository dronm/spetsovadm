<template>
	<div class="notification-container">
		<transition-group name="notification" tag="div">
			<div
				v-for="(notification, index) in notifications"
				:key="notification.id"
				:class="[
					'notification',
					getNotificationClass(notification.messageType),
				]"
				:style="getNotificationStyle(index)"
			>
				<div class="notification-header">
					<span>{{ getHeaderText(notification.messageType) }}</span>
					<button @click="closeNotification(notification.id)">
						×
					</button>
				</div>
				<div
					class="notification-content"
					v-html="notification.content"
				></div>
			</div>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNotificationStore, MessageType } from "../stores/useNotificationStore";
import { useI18n } from "vue-i18n";

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);
const { t } = useI18n();

const closeNotification = (id: number) => {
	notificationStore.removeNotification(id);
};

const getNotificationStyle = (index: number) => {
	// Calculate the position of each notification.
	const rowHeight = 100; // The height of each notification
	const bottomPosition = index * (rowHeight + 10); // Positioning notifications upwards

	return {
		bottom: `${bottomPosition + 10}px`, // +10px for a small margin
		right: "10px", // Always stick to the right side
	};
};

const getHeaderText = (type: MessageType) => {
	switch (type) {
		case MessageType.Err:
			return t("NotificationWindow.msgTypes.err");
		case MessageType.Warn:
			return t("NotificationWindow.msgTypes.warn");
		case MessageType.Ok:
			return t("NotificationWindow.msgTypes.ok");
		case MessageType.Info:
		default:
			return t("NotificationWindow.msgTypes.info");
	}
};

const getNotificationClass = (type: MessageType) => {
	switch (type) {
		case MessageType.Err:
			return "error";
		case MessageType.Warn:
			return "warning";
		case MessageType.Ok:
			return "success";
		case MessageType.Info:
		default:
			return "info";
	}
};
</script>
