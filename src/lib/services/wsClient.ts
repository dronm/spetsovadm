// src/utils/wsClient.ts

type WSStatus = "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED";

export class WSClient {
	private socket: WebSocket | null = null;
	private url: string;
	private reconnectInterval: number;
	private reconnectAttempts: number;
	private maxReconnectAttempts: number;
	private listeners: Set<(msg: MessageEvent) => void> = new Set();

	constructor(url: string, reconnectInterval = 3000, maxReconnectAttempts = 10) {
		this.url = url;
		this.reconnectInterval = reconnectInterval;
		this.reconnectAttempts = 0;
		this.maxReconnectAttempts = maxReconnectAttempts;

		this.connect();
	}

	private connect() {
		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			this.reconnectAttempts = 0;
			console.log("[WS] Connected");
		};

		this.socket.onmessage = (event: MessageEvent) => {
			this.listeners.forEach((cb) => cb(event));
		};

		this.socket.onclose = () => {
			console.log("[WS] Connection closed");
			this.tryReconnect();
		};

		this.socket.onerror = (error) => {
			console.error("[WS] Error", error);
			this.socket?.close();
		};
	}

	private tryReconnect() {
		if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			console.warn("[WS] Max reconnect attempts reached.");
			return;
		}

		this.reconnectAttempts++;
		console.log(`[WS] Attempting reconnect ${this.reconnectAttempts}...`);

		setTimeout(() => {
			this.connect();
		}, this.reconnectInterval);
	}

	public send(data: string | object) {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.send(typeof data === "string" ? data : JSON.stringify(data));
		} else {
			console.warn("[WS] Cannot send, socket not open");
		}
	}

	public onMessage(callback: (event: MessageEvent) => void) {
		this.listeners.add(callback);
	}

	public removeMessageListener(callback: (event: MessageEvent) => void) {
		this.listeners.delete(callback);
	}

	public close() {
		this.socket?.close();
		this.listeners.clear();
	}

	public getStatus(): WSStatus {
		return this.socket
			? (["CONNECTING", "OPEN", "CLOSING", "CLOSED"][
					this.socket.readyState
				] as WSStatus)
			: "CLOSED";
	}
}
