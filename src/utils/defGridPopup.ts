import { type PopoverItem } from "@/lib/types/popover";

import i18n from "@/i18n";

export const defGridPopup = () => <PopoverItem[]> [
	{id: "add_row", caption: i18n.global.t("GridCmdInsert.caption"), icon: new URL(`../assets/collection-cmd/add.png`, import.meta.url).href},
	{id: "edit_row", caption: i18n.global.t("GridCmdEdit.caption"), icon: new URL(`../assets/collection-cmd/edit.png`, import.meta.url).href},
	{id: "copy_row", caption: i18n.global.t("GridCmdCopy.caption"), icon: new URL(`../assets/collection-cmd/copy.png`, import.meta.url).href},
	{id: "delete_row", caption: i18n.global.t("GridCmdDelete.caption"), icon: new URL(`../assets/collection-cmd/delete.png`, import.meta.url).href},
	// {id: "search", caption: i18n.global.t("GridCmdSearch.caption"), icon: "magnifying-glass"},
	{id: "refresh", caption: i18n.global.t("GridCmdRefresh.caption"), icon: new URL(`../assets/collection-cmd/refresh.png`, import.meta.url).href},
	// {id: "print", caption: i18n.global.t("GridCmdPrint.caption"), icon: "print"},
];

