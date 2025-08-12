import { type Ref } from '@/lib/types/ref';

export interface ProductPriceList {
	id: number;
	product_id: number;
	price_types_ref: Ref;
	quant: number;
}
