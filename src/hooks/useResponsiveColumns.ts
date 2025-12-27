import type { Table } from "@tanstack/react-table";

export function useResponsiveColumns<T>(table: Table<T>, mobile: number) {
  const isMobile = useMediaQuery(`(max-width: ${mobile}px)`);

  useEffect(() => {
    const visibility: Record<string, boolean> = {};

    table.getAllLeafColumns().forEach((column) => {
      const meta = column.columnDef.meta;

      if (isMobile && meta?.hideOnMobile) {
        visibility[column.id] = false;
        return;
      }

      visibility[column.id] = true;
    });
    console.log(visibility);

    table.setColumnVisibility(visibility);
  }, [mobile, table, isMobile]);
}
