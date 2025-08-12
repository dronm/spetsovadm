export function isFileExtensionAllowed(
	file: File,
	allowedExtensions: string[],
): { extension: string | null; isAllowed: boolean } {
	const fileName = file.name;
	const fileExtension = fileName.split('.').pop()?.toLowerCase() || null;

	return {
		extension: fileExtension,
		isAllowed: fileExtension
			? allowedExtensions.includes(fileExtension)
			: false,
	};
}
