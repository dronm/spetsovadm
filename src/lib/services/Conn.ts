/*
 * MIT License
 *
 * Copyright (c) 2025 Andrey Mikhalevich
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 */

export type RequestHeaders = Record<string, any>;

export interface HTTPResponse<T = any> {
	body: T;
	status: number;
	headers: Headers;
}

// APIError is thrown is case of an error. It extends default Error class
// with status and body fields.
export class APIError extends Error {
	status?: number;
	body?: any;

	constructor(message: string, status?: number, body?: any) {
		super(message); // Call the parent constructor with the message
		this.name = this.constructor.name; // Set the error name to the class name
		this.status = status;
		this.body = body;

		// Set the prototype explicitly for inheritance to work correctly in TypeScript
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export enum RequestMethods {
	Get = "GET",
	Post = "POST",
	Put = "PUT",
	Delete = "DELETE",
}
//----- types -----
//
interface GetParams {
	[key: string]: any;
}

enum RequestContentTypes {
	TEXT = "text/html",
	JSON = "application/json",
	FORM = "multipart/form-data",
	XML = "text/xml",
	ARRAY_BUFFER = "arraybuffer",
	BLOB = "blob",
}

//----- class -----
export class Conn {
	static DEF_TIMEOUT = 1000;

	baseURL: string;
	timeout: number;
	defaultHTTPHeaders: RequestHeaders;

	public response: HTTPResponse;

	constructor(baseURL: string, timeout?: number) {
		this.baseURL = baseURL;
		this.timeout = timeout || Conn.DEF_TIMEOUT;
		// 'Content-Type': RequestContentTypes.JSON,
		this.defaultHTTPHeaders = {
			Accept: "application/json",
		};

		this.response = { body: null, status: 0, headers: new Headers() };
	}

	protected async request<T = any>(endpoint: string, options: RequestInit): Promise<T> {
		const res = await fetch(this.baseURL + endpoint, {
			...options,
			headers: {
				Accept: "application/json",
				...(options.headers || {}),
			},
		});

		const contentType = res.headers.get("Content-Type");
		const isJson = contentType?.includes(RequestContentTypes.JSON);
		const isNoContent = res.status === 204 || res.status === 205;

		const body = isNoContent
			? null
			: isJson
			? await res.json()
			: null;

		this.response = {
			body,
			status: res.status,
			headers: res.headers,
		};

		if (!res.ok) {
			throw new APIError(
				body.error && (body.error as string).length
					? body.error
					: "request error",
				res.status,
				body,
			);
		}

		return body;
	}

	//add some common headers, auth
	//encodeURIComponent each parameter.
	public get<T = any>(endpoint: string, params?: GetParams): Promise<T> {
		// Ensure the base endpoint is encoded correctly
		const url = new URL(endpoint, window.location.origin);

		if (params) {
			const debugMode = true;
			let debugMsg = "";
			for (const [key, value] of Object.entries(params)) {
				if (value !== undefined && value !== null) {
					url.searchParams.append(
						encodeURIComponent(key),
						encodeURIComponent(JSON.stringify(value)),
					);
					if (debugMode) {
						debugMsg += debugMsg === "" ? "&" : "";
						debugMsg += JSON.stringify(value);
					}
					// url.searchParams.append(key, JSON.stringify(value));
				}
			}
			if (debugMode) {
				console.log(`Conn.get: ${endpoint}/${debugMsg}`);
			}
		}

		// console.log("Conn.get converted ",endpoint," to ",url.toString())
		return this.request<T>(url.toString(), {
			method: RequestMethods.Get,
			headers: this.defaultHTTPHeaders,
		});
	}

	//no encodeURIComponent needed since stringify() is used
	public post<T = any>(endpoint: string, data?: any): Promise<T> {
		return this.request<T>(endpoint, {
			method: RequestMethods.Post,
			body: data ? JSON.stringify(data) : undefined,
			headers: {
				...this.defaultHTTPHeaders,
				"Content-Type": "application/json",
			},
		});
	}

	//no encodeURIComponent is needed for FormData
	public postForm<T = any>(endpoint: string, data: FormData): Promise<T> {
		return this.request<T>(endpoint, {
			method: RequestMethods.Post,
			body: data,
			headers: { ...this.defaultHTTPHeaders },
		});
	}
}
