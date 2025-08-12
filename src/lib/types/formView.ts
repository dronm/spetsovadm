import { type FormSrvOperations } from "../types/form";
import type { FormControl, FormData, FormKeyTypes } from "../types/form";

export interface FormViewProps {
	keyTypes?: FormKeyTypes; //if opened from Modal, can be filled in parent component
	controlList?: FormControl[];
	srvOperations?: FormSrvOperations; //all possible form operation supported by object
	collectionRoute?: string; //for going back
	error?: string; //filled from Modal
	isNew?: boolean; //filled from Modal
	data?: FormData;
	currentId?: string;
}
