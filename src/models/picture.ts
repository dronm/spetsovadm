export interface Picture {
	ref_1c: string;
	size: number;
	ext: string;
	preview_ext: string | null;
	main: boolean;
}

export interface PictureM {
	id: string;
	size: number;
	ext: string;
	main: boolean;
}
