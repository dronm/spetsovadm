// Menu structure type definition
export interface MenuItem {
	caption: string;
	route: string | null;
	children: MenuItem[] | null;
}
