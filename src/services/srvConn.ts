import { Conn } from '@lib/services/Conn';
import { APIError } from '@/lib/services/Conn';

import { API_TIMEOUT } from '../config/constants';

class ProjectConn extends Conn {
	isAuthed: boolean = false;
	unlogUser: (() => void) | null = null;

	constructor(baseURL: string, timeout: number) {
		super(baseURL, timeout);
	}

	async request<T = any>(endpoint: string, options: RequestInit): Promise<T> {
		let body: any = null; //Promise<T> = null;
		try {
			options.credentials = 'include'; //cookies!
			body = await super.request(endpoint, options);
		} catch (err: any) {
			const isAPIErr = err instanceof APIError;
			const isErr = err instanceof Error;

			let msg: string;
			if (isAPIErr) {
				//401 - logout if logged
				if (
					this.response.status == 401 &&
					this.isAuthed &&
					this.unlogUser != null
				) {
					this.unlogUser();
				}
				msg = (err as APIError).message || 'unknown API error';
			} else if (isErr) {
				msg = (err as Error).message || 'unknown error';
			} else {
				msg = String(err);
			}
			throw new Error(msg);
		}

		return body;
	}
}

const srvConn = new ProjectConn('', API_TIMEOUT);

export default srvConn;
