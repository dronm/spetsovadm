type EventCallback = (eventId: string, event: AppEvent) => void;
type ConnectionCallback = (param?: any) => void;

export interface EventSubscription {
	events: Array<string>;
	onEvent?: EventCallback;
	onOpen?: ConnectionCallback;
	onClose?: ConnectionCallback;
	onError?: ConnectionCallback;
	onSubscribed?: ConnectionCallback;
	onWakeup?: ConnectionCallback;
}

interface SubscriptionGroup {
	groups: Record<string, EventSubscription>; //key is a unique ID for a group (a component)
	cnt: number;
}

interface AppEvent {
	eventId: string;
	controllerId?: string;
	methodId?: string;
	params: Record<string, any>;
}

interface Message {
	f: string; //function: Service.Method
	p?: any; //payload any object
	q: string; //queryID
}

export class WSManager {
	private static readonly EVENT_SUBSCRIBE = "Event.Subscribe";
	private static readonly EVENT_UNSUBSCRIBE = "Event.Unsubscribe";

	private url: string;

	private connection!: WebSocket;

	private doNotReconnect = false;

	private subscriptions: Record<string, SubscriptionGroup> = {}; //key is an EventID
	private subscribeEvents: Record<string, EventSubscription> = {};
	private unsubscribeQueue: string[] = [];

	public lastConnOpenTime: number | undefined;

	constructor(url: string) {
		console.log("WSManager.constructor, url:", url);
		if (!("WebSocket" in window)) {
			throw new Error("WebSocket not supported in this browser");
		}

		this.url = url;

		// if ('Worker' in window) {
		// 	const worker = new Worker('DetectWakeup.js');
		// 	worker.onmessage = (event) => {
		// 		if (event.data === 'wakeup') {
		// 			this.notifyConnectionEvent('onWakeup');
		// 		}
		// 	};
		// }
	}

	public connect(): void {
		this.setupConnection();
	}

	public disconnect(): void {
		if (this.isConnected()) {
			// this.doNotReconnect = doNotReconnect;
			this.connection.close();
		}
		this.clearSubscriptions();
	}

	public isConnected(): boolean {
		return this.connection?.readyState === WebSocket.OPEN;
	}

	public subscribe(events: EventSubscription, groupId?: string): string {
		console.log("subscribe events:", events);
		groupId ??= crypto.randomUUID();

		if (!this.isConnected()) {
			console.log("subscribe postponed for events:", events);
			this.subscribeEvents[groupId] = events;
			return groupId;
		}

		const newSubscriptions: Array<string> = [];
		events.events.forEach((evId: string) => {
			if (!this.subscriptions[evId]) {
				this.subscriptions[evId] = { groups: {}, cnt: 0 };
				newSubscriptions.push(evId);
			}
			this.subscriptions[evId].groups[groupId] = events;
			this.subscriptions[evId].cnt++;
		});

		if (newSubscriptions.length > 0) {
			this.send(WSManager.EVENT_SUBSCRIBE, { events: newSubscriptions });
			events.onSubscribed?.call(this);
		}

		return groupId;
	}

	public unsubscribe(groupId: string): void {
		if (this.subscribeEvents[groupId]) {
			delete this.subscribeEvents[groupId];
			return;
		}

		if (!this.isConnected()) {
			this.unsubscribeQueue.push(groupId);
			return;
		}

		const eventsToRemove = [];

		for (const [eventId, sub] of Object.entries(this.subscriptions)) {
			if (sub.groups[groupId]) {
				delete sub.groups[groupId];
				sub.cnt--;

				if (sub.cnt === 0) {
					eventsToRemove.push(eventId);
					delete this.subscriptions[eventId];
				}
			}
		}

		if (eventsToRemove.length > 0) {
			this.send(WSManager.EVENT_UNSUBSCRIBE, { events: eventsToRemove });
		}
	}

	private setupConnection(): void {
		const protocol = location.protocol === "https:" ? "wss" : "ws";
		console.log("setupConnection WSManager with url:", this.url);
		this.connection = new WebSocket(`${protocol}://${this.url}`);

		this.connection.onopen = () => {
			this.handleOpen();
			this.notifyConnectionEvent("onOpen");
		};

		this.connection.onerror = (err) => {
			this.notifyConnectionEvent("onError", err);
		};

		this.connection.onclose = (event) => {
			this.notifyConnectionEvent("onClose", event);
			if (event.code >= 1000 && !this.doNotReconnect) {
				console.log("WSManager reconnecting")
				this.setupConnection();
			}
		};

		this.connection.onmessage = (message: MessageEvent) => {
			this.handleMessage(message);
		};
	}

	private handleOpen(): void {
		const groups: Record<string, EventSubscription> = {};

		for (const [eventId, sub] of Object.entries(this.subscriptions)) {
			for (const [groupId, group] of Object.entries(sub.groups)) {
				groups[groupId] = groups[groupId] || {
					events: [],
					onEvent: group.onEvent,
					onOpen: group.onOpen,
					onClose: group.onClose,
					onError: group.onError,
					onSubscribed: group.onSubscribed,
				};
				groups[groupId].events.push(eventId);
			}
		}

		this.subscriptions = {};
		for (const [groupId, group] of Object.entries(groups)) {
			this.subscribe(group, groupId);
		}

		for (const [id, event] of Object.entries(this.subscribeEvents)) {
			this.subscribe(event, id);
		}
		this.subscribeEvents = {};

		for (const id of this.unsubscribeQueue) {
			this.unsubscribe(id);
		}
		this.unsubscribeQueue = [];
	}

	private notifyConnectionEvent(event: keyof EventSubscription, param?: any): void {
		const called: Record<string, boolean> = {};

		for (const sub of Object.values(this.subscriptions)) {
			for (const [groupId, group] of Object.entries(sub.groups)) {
				if (
					!called[groupId] &&
					group[event] &&
					typeof group[event] == "function"
				) {
					group[event].call(this, event, param);
					called[groupId] = true;
				}
			}
		}

		if (event === "onClose") {
			for (const eventObj of Object.values(this.subscribeEvents)) {
				eventObj?.onClose?.call(this, param);
			}
		}
	}

	private send(func: string, payload?: any, queryId?: string): void {
		const message: Message = { f: func, q: queryId || crypto.randomUUID() };
		if (payload) message.p = payload;
		console.log(`WSManager.send, message:`, message);

		this.connection.send(JSON.stringify(message));
	}

	private handleMessage(message: MessageEvent): void {
		console.log("handleMessage:", message);
		try {
			const data = JSON.parse(message.data) as {
				query_id: string;
				event_id: string;
				payload?: any;
				error?: {
					code: string;
					message: string;
				} | null;
			};

			if (data.event_id === "Response") {
				//match by query ID
				if (data.error) {
					throw new Error(
						`Server error [${data.error.code}]: ${data.error.message}`,
					);
				}
				return;
			}
			//match by event ID
			if (this.subscriptions[data.event_id]) {
				const groups = this.subscriptions[data.event_id].groups;
				for (const subscription of Object.values(groups)) {
					if (data.error) {
						if (subscription.onError) {
							subscription.onError(data.error);
							return;
						}
						throw new Error(
							`Server error [${data.error.code}]: ${data.error.message}`,
						);
					} else if (subscription.onEvent) {
						subscription.onEvent(data.event_id, data.payload);
					}
				}
			}
		} catch (err) {
			console.error("handleMessage error:", err);
		}
	}

	private clearSubscriptions(): void {
		this.subscriptions = {};
	}
}
