import { Locale } from '../lib/types/locale';
import { type Enum } from '../lib/types/enum';

export const notif_providersEnum: Enum = {
	tm: { [Locale.ru]: 'Telegram' },
	email: { [Locale.ru]: 'Электронная почта' },
	wa: { [Locale.ru]: 'WatsApp' },
	sms: { [Locale.ru]: 'SMS' },
};
