import type { ReactNode } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
export interface Props {
  children: ReactNode;
}
