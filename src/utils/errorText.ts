import { APIError } from '@/lib/services/Conn';

export const errorText = (err: unknown): string => {
	const isAPIErr = err instanceof APIError;
	const isErr = err instanceof Error;
	console.log("isAPIErr:",isAPIErr," isErr:",isErr, " msg:",(err as Error).message)

	let msg: string;
	if (isAPIErr) {
		msg = (err as APIError).message || 'unknown API error';
	} else if (isErr) {
		msg = (err as Error).message || 'unknown error';
	} else {
		msg = String(err);
	}
	return msg;
};
