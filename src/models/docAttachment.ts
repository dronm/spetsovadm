import { type Ref } from '@/lib/types/ref';

export interface DocAttachmentDel {
	ref: Ref;
	content_id: string;
}

export interface DocAttachmentGet {
	ref: Ref;
	content_id: string;
	inline: boolean;
}

export interface DocAttachment {
	id?: number;
	date_time?: Date;
	ref: Ref;
	content_info: DocAttachmentContentInfo;
	content_data?: ArrayBuffer;
	content_preview?: ArrayBuffer;
}

export interface DocAttachmentContentInfo {
	id: string;
	name: string;
	size: number;
}
