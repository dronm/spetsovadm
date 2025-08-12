import type { EditAutocomplete } from "../types/editAutocomplete";

export interface EditProps {
	id: string;
	type?: string;
	name?: string;
	disabled?: boolean;
	label?: string;
	required?: boolean;
	placeholder?: string;
	maxLength?: number;
	title?: string;
	focus?: boolean;
	useAutocomplete?: EditAutocomplete;
	editMaskOpts?: any;
	actClear?: boolean;
	error?: string;
}
