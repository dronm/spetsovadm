import { Locale } from '../lib/types/locale';
import { type Enum } from '../lib/types/enum';

export const checkout_order_status_typesEnum: Enum = {
	created: { [Locale.ru]: 'Создан' },
	processed_1c: { [Locale.ru]: 'Обработан в 1с' },
	payed: { [Locale.ru]: 'Оплачен' },
	shipped: { [Locale.ru]: 'Отгружен' },
	passed_to_delivery: { [Locale.ru]: 'Передан в доставку' },
	cancelled: { [Locale.ru]: 'Отменен' },
};

export const checkout_order_status_typesFixList: string =
	'created,processed_1c,payed,shipped,passed_to_delivery,cancelled';
