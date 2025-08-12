import { type Ref } from "vue";

import type { FormControl, FormSrvOperations, FormData } from "../types/form";
import { type FormKeyTypes } from "../types/form";

export interface FormCustomProps {
	keyTypes?: FormKeyTypes; //if opened from Modal, can be filled in parent component
	controlList?: FormControl[];
	srvOperations?: FormSrvOperations; //all possible form operation supported by object
	collectionRoute?: string; //for going back
	error?: string; //filled from Modal
	isNew?: boolean; //filled from Modal
	data?: FormData; //originally might not have all fields, only keys
	currentId?: string;
	beforeValidate?: (controlData: FormData, submitData: FormData, isNew: boolean) => void;
	showCommands?: boolean;
}

export interface FormCustomExposed {
	fetchFormData: () => Promise<void>;
	onSave: () => Promise<void>;
	onSubmit: () => Promise<void>;
	onCancel: () => void;
	editData: Ref;
}
