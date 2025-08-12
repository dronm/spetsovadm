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
 * useAPIFetch can be used for every api calls for retrieving data
 * It has the following features:
 *		- checks the API function cache policy;
 *		- traps all errors;
 *		- uses notification mechanism is case of error;
 *		- has flags: error text, loading state;
 */

//----- imports -----
import { ref } from "vue";
import { useNotificationStore, MessageType } from "../stores/useNotificationStore";
import type { APICall } from "../types/apiCall";
import { CachePolicies } from "../types/apiCall";

//----- main -----
export const useAPIFetch = (errorNotifTimeout: number) => {
	const result = ref<Record<string, any>>({});
	const error = ref<string | undefined>(undefined);
	const loading = ref<boolean>(false);
	// const errorNotifTimeout = ref<number>(errorTimeout ?? 0);

	//cache mechanics
	const cacheClear = (id: string, policy: CachePolicies) => {
		if (policy === CachePolicies.Local) {
			localStorage.removeItem(id);
		} else if (policy === CachePolicies.Session) {
			sessionStorage.removeItem(id);
		}
	};

	const cacheSet = (id: string, val: string, policy: CachePolicies): void => {
		if (policy === CachePolicies.Local) {
			localStorage.setItem(id, val);
		} else if (policy === CachePolicies.Session) {
			sessionStorage.setItem(id, val);
		}
	};

	const cacheGet = (id: string, policy: CachePolicies): string | null => {
		if (policy === CachePolicies.Local) {
			return localStorage.getItem(id);
		} else if (policy === CachePolicies.Session) {
			return sessionStorage.getItem(id);
		}
		return null;
	};

	//fetch expects result
	const fetch = async (apiCall: APICall, ...args: any) => {
		error.value = undefined;
		loading.value = true;

		try {
			//TODO: check cash type apiCall.cachPolicy
			if (apiCall.cache && apiCall.cache.policy !== CachePolicies.NoCache) {
				if (
					apiCall.cache.createdAt &&
					apiCall.cache.duration &&
					new Date().getTime() - apiCall.cache.createdAt.getTime() <
						apiCall.cache.duration
				) {
					const cachedVal = cacheGet(
						apiCall.id,
						apiCall.cache.policy,
					);
					if (cachedVal) {
						result.value = JSON.parse(cachedVal);
						return;
					}
				}

				apiCall.cache.createdAt = undefined;
				cacheClear(apiCall.id, apiCall.cache.policy);
			}

			const res = await apiCall.func(...args);
			result.value = res;
			if (apiCall.cache && apiCall.cache.policy !== CachePolicies.NoCache) {
				apiCall.cache.createdAt = new Date();
				cacheSet(apiCall.id, JSON.stringify(res), apiCall.cache.policy);
			}
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : String(err);

			const notificationStore = useNotificationStore();
			notificationStore.addNotification(
				error.value,
				errorNotifTimeout ?? 0,
				MessageType.Err,
			);
		} finally {
			loading.value = false;
		}
	};

	return {
		result,
		error,
		loading,
		fetch,
	};
};
