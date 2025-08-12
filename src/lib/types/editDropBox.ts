export interface EditDropboxProps {
	id: string;
	label?: string;
	required?: boolean;
	title?: string;
	focus?: boolean;
	error?: string;
	items: Record<string, string>; //key-value pair for dropbox
}
