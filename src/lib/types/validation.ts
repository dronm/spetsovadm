export enum ValidationConstraint {
	required,
	maxLen,
	minLen,
	fixLen,
	maxVal,
	minVal,
	precision,
	fixList,
	regExp,
}

export interface ValidationRule {
	constraint: ValidationConstraint;
	value?: any;
}
