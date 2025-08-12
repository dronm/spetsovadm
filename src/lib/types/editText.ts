export interface EditTextProps {
	id: string;
	name?: string;
	disabled?: boolean;
	label?: string;
	required?: boolean;
	placeholder?: string;
	maxLength?: number;
	title?: string;
	focus?: boolean;
	actClear?: boolean;
	error?: string;
	cols?: number;
	rows?: number;
	wrap?: "soft" | "hard" | "off";
}
