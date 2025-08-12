import { CachePolicies } from '@/lib/types/apiCall';
import type { APICall } from '@/lib/types/apiCall';

import { type MainMenuForUser } from '@/models/mainMenu';

import { MAIN_MENU_FOR_USER } from '@/config/constants';

import srvConn from './srvConn';
import { transformJSON } from '@/lib/services/transformJSON';

export const mainMenuMenu: APICall = {
	id: 'MainMenuForUser',
	func: async (): Promise<MainMenuForUser[]> => {
		const data = await srvConn.get(MAIN_MENU_FOR_USER);
		return transformJSON(data);
	},
	cachePolicy: CachePolicies.Session,
};
