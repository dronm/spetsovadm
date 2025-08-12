export function useNumericInput() {
	const correctPastedData = (event: ClipboardEvent): void => {
		const clipboardData = event.clipboardData?.getData("text") ?? "";
		if (/\D/.test(clipboardData)) {
			event.preventDefault();
		}
	};

	const onKeyDown = (event: KeyboardEvent): void => {
		if (event.ctrlKey || event.metaKey) return;

		const allowedKeys = [
			"Backspace",
			"Delete",
			"ArrowLeft",
			"ArrowRight",
			"Tab",
			"Enter",
		];
		const isDigit = /\d/.test(event.key);

		if (!isDigit && !allowedKeys.includes(event.key)) {
			event.preventDefault();
		}
	};

	const parseValue = (val: string): number | undefined => {
		const parsedVal = parseInt(val, 10);
		return isNaN(parsedVal) ? undefined : parsedVal;
	};

	return {
		correctPastedData,
		onKeyDown,
		parseValue,
	};
}
