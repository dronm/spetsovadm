export interface PopoverItem {
	id: string;
	icon?: string;
	caption?: string;
	isBreak?: boolean;
	subItems?: PopoverItem[]; 
}

export type PopoverPosition = {x: number, y: number};
