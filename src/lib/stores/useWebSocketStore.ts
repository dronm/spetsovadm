// src/stores/useWebSocketStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

type WSStatus = "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED";

export const useWebSocketStore = defineStore("webSocket", () => {
	const socket = ref<WebSocket | null>(null);
	const status = ref<WSStatus>("CLOSED");
	const messages = ref<string[]>([]);
	const url = ref<string>("");
	let reconnectAttempts = 0;
	const maxReconnectAttempts = 10;
	const reconnectInterval = 3000;

	function init(wsUrl: string) {
		url.value = wsUrl;
		connect();
	}

	function connect() {
		if (socket.value) socket.value.close();

		socket.value = new WebSocket(url.value);
		status.value = "CONNECTING";

		socket.value.onopen = () => {
			status.value = "OPEN";
			reconnectAttempts = 0;
			console.log("[WS] Connected");
		};

		socket.value.onmessage = (event: MessageEvent) => {
			messages.value.push(event.data);
		};

		socket.value.onerror = (error) => {
			console.error("[WS] Error", error);
			socket.value?.close();
		};

		socket.value.onclose = () => {
			status.value = "CLOSED";
			console.warn("[WS] Disconnected");
			tryReconnect();
		};
	}

	function tryReconnect() {
		if (reconnectAttempts >= maxReconnectAttempts) {
			console.error("[WS] Max reconnect attempts reached.");
			return;
		}

		reconnectAttempts++;
		console.log(`[WS] Reconnect attempt ${reconnectAttempts}...`);

		setTimeout(() => {
			connect();
		}, reconnectInterval);
	}

	function send(data: string | object) {
		if (socket.value?.readyState === WebSocket.OPEN) {
			const payload = typeof data === "string" ? data : JSON.stringify(data);
			socket.value.send(payload);
		} else {
			console.warn("[WS] Cannot send, socket not open");
		}
	}

	function close() {
		socket.value?.close();
		status.value = "CLOSING";
	}

	return {
		// State
		messages,
		status,

		// Methods
		init,
		send,
		close,
	};
});
