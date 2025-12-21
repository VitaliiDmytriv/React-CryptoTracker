import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // Тут ми розширюємо стандартний інтерфейс
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "left" | "center" | "right";
  }
}
