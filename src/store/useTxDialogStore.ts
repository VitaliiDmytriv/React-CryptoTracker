import type { TransactionWithCoin } from "@/types/global";
import { create } from "zustand";

export type ModalState =
  | { type: "edit"; props: { initialData: TransactionWithCoin } }
  | { type: "add"; props: { initialData: TransactionWithCoin } }
  | { type: "merge"; props: { somethingElse: string } }
  | { type: null };

type UseTxDialogStore = {
  isOpen: boolean;
  modal: ModalState;
  open: (modal: Exclude<ModalState, { type: null }>) => void;
  close: () => void;
};

export const useTxDialogStore = create<UseTxDialogStore>((set) => ({
  isOpen: false,
  modal: { type: null },

  open: (modal) =>
    set({
      isOpen: true,
      modal,
    }),

  close: () =>
    set({
      isOpen: false,
      modal: { type: null },
    }),
}));
