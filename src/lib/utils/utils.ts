export function uniqueID(): string {
	if (crypto && crypto.randomUUID) {
		return crypto.randomUUID();
	} else {
		return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
	}
}

export function shallowEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	return true;
}
