
import type { CollectionFilterFields, CollectionFilterField, CollectionParams } from '@/lib/types/collection';
import { FilterOperatorParam, FilterJoinParam } from '@/lib/types/collection';


import {
	useNotificationStore,
	MessageType,
} from '@/lib/stores/useNotificationStore';

interface GridCmdSearch {
	id: string;
	val: string;
}

type GridClient = {
	setFetchParams: (params: CollectionParams) => void;
	refresh: (resolve: (err: string) => void) => void;
};

export function useGridSearchHandler(
	gridClient: GridClient,
	searchFieldNames: string[],
) {
	const notificationStore = useNotificationStore();

	const handler = (cmd: GridCmdSearch) => {
		if (cmd.id !== 'search') return;

		const searchColumns = <CollectionFilterFields>{};

		if (cmd.val.length) {
			cmd.val.split(' ').forEach((search: string) => {
				searchFieldNames.forEach((field) => {
					searchColumns[field] = <CollectionFilterField>{
						o: FilterOperatorParam.ILK,
						v: `%${search}%`,
					};
				});
			});

			gridClient.setFetchParams(<CollectionParams>{
				filter: [
					{
						f: searchColumns,
						j: FilterJoinParam.OR,
					},
				],
			});
		} else {
			gridClient.setFetchParams(<CollectionParams>{});
		}

		const result = new Promise<string>((resolve) =>
			gridClient.refresh(resolve),
		);
		result.then((err: string) => {
			if (err?.length) {
				notificationStore.addNotification(err, 5000, MessageType.Err);
			}
		});
	};

	return {
		handleGridEvent: handler,
	};
}

