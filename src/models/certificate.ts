import type { Picture } from './picture';

export interface ProductDetailCertificate {
	cert_type: string;
	date_from: string;
	descr: string;
	pictures: Picture[];
}
