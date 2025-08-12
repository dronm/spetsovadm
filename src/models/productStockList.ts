import { type Ref } from '@/lib/types/ref';

export interface ProductStockList {
	id: number;
	product_id: number;
	warehouses_ref: Ref;
	characteristics_ref: Ref;
	quant: number;
	quant_available: number;
	update_at: Date;
}
