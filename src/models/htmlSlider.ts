import type { PictureM } from '../models/picture';

export interface HtmlSlider {
	id: number;
	name: string;
	options: HtmlSliderOptions;
	pictures: PictureM[];
	createdAt: Date;
	updatedAt: Date;
}

export interface HtmlSliderDetail {
	id: number;
	name: string;
}

//new data: insert, update
//validation?
export interface HtmlSliderNew {
	id?: number;
	name: string;
}

//key model for update, delete
export interface HtmlSliderKey {
	id: number;
}

//update model
export interface HtmlSliderUpdate {
	keys: HtmlSliderKey;
	model: HtmlSliderNew;
}

export type HtmlSliderDataType = 'html_sliders';

export interface HtmlSliderRef {
	keys: HtmlSliderKey;
	descr: string;
	dataType?: HtmlSliderDataType;
}

//**********************************************
export interface HtmlSliderOptI18 {
	ariaNextSlide?: string;
	ariaPreviousSlide?: string;
	ariaNavigateToSlide?: string;
	ariaGallery?: string;
	itemXOfY?: string;
	iconArrowUp?: string;
	iconArrowDown?: string;
	iconArrowRight?: string;
	iconArrowLeft?: string;
}

export interface HtmlSliderOptions {
	enabled: boolean;
	itemsToShow: number;
	itemsToScroll: number;
	mouseDrag: boolean;
	mouseTouch: boolean;
	breakpoints: any;
	wrapAround: boolean;
	snapAlign: string;
	transition: number;
	autoplay: number;
	perPage: number;
	navigationEnabled: boolean;
	breakpointMode: string;
	modelValue: number;
	touchDrag: boolean;
	pauseAutoplayOnHover: boolean;
	dir: string;
	i18n: HtmlSliderOptI18;
	gap: number;
	height: string;
	ignoreAnimations: boolean;
	paginationEnabled: boolean;
}
