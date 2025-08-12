import { exit } from 'process';

export const removeTelMask = (maskedValue: string): string => {
	let unmasked = maskedValue;
	if (unmasked.substring(0, 2) == '+7') {
		unmasked = unmasked.substring(2);
	}
	unmasked = unmasked.replaceAll('(', '');
	unmasked = unmasked.replaceAll(')', '');
	unmasked = unmasked.replaceAll('-', '');

	return unmasked;
};

export const applyTelMask = (unmaskedValue: string): string => {
	return `+7(${unmaskedValue.slice(0, 3)})-${unmaskedValue.slice(3, 6)}-${unmaskedValue.slice(6, 8)}-${unmaskedValue.slice(8, 10)}`;
};
