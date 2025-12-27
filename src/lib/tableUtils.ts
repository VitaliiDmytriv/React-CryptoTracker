import type { ColumnDef } from "@tanstack/react-table";

export function computeInitialVisibility<T>(columns: ColumnDef<T>[], mobileWidth: number) {
  const isMobile = window.innerWidth <= mobileWidth;

  const visibility: Record<string, boolean> = {};
  columns.forEach((column) => {
    const meta = column.meta;
    visibility[column.id as string] = !(isMobile && meta?.hideOnMobile);
  });

  return visibility;
}
