import { type GridCommand } from '@/lib/types/grid';
// import GridCmdAddRow from '@/lib/components/GridCmdAddRow.vue';
// import GridCmdEditRow from '@/lib/components/GridCmdEditRow.vue';
// import GridCmdCopyRow from '@/lib/components/GridCmdCopyRow.vue';
// import GridCmdPrint from '@/lib/components/GridCmdPrint.vue';
// import GridCmdDeleteRow from '@/lib/components/GridCmdDeleteRow.vue';
import GridCmdRefresh from '@/components/GridCmdRefresh.vue';
import GridCmdSearch from '@/components/GridCmdSearch.vue';

export const defGridSrvCommands: GridCommand[] = [
	// { id: 'add_row', btn: true, comp: GridCmdAddRow },
	// { id: 'edit_row', btn: true, comp: GridCmdEditRow },
	// { id: 'copy_row', btn: true, comp: GridCmdCopyRow },
	// { id: 'delete_row', btn: true, comp: GridCmdDeleteRow },
	{ id: 'search', btn: true, comp: GridCmdSearch },
	{ id: 'refresh', btn: true, comp: GridCmdRefresh },
	// { id: 'print', btn: true, comp: GridCmdPrint },
];
