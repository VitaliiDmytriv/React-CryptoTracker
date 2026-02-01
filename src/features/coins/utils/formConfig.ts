import type { Modes } from "../types/coin.types";

type ModeConfig = {
  submitText: string;
  showCoinSelect: boolean;
  showDelete: boolean;
};

export const MODE_CONFIG: Record<Modes, ModeConfig> = {
  add: { submitText: "Add", showCoinSelect: true, showDelete: false },
  edit: { submitText: "Edit", showCoinSelect: false, showDelete: true },
  merge: { submitText: "Merge", showCoinSelect: false, showDelete: false },
} as const;
