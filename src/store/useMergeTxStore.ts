import type { Coin, CoinInfoForTx, TransactionWithCoin } from "@/types/global";
import type { RowSelectionState } from "@tanstack/react-table";
import { create } from "zustand";

export type MergedTx = {
  quantity: string;
  pricePerCoinBought: string;
  fees: string;
  totalSpent: string;
};

type useMergeTxStore = {
  rowSelection: RowSelectionState;
  isOpenMerge: boolean;
  txMergeInfo: CoinInfoForTx | null;

  setRowSelection: (
    updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState),
  ) => void;
  openMerge: (coin: Coin<TransactionWithCoin>) => void;
  closeMerge: () => void;
};

export const useMergeTxStore = create<useMergeTxStore>((set) => ({
  isOpenMerge: false,
  txMergeInfo: null,
  rowSelection: {},

  openMerge: (coin) =>
    set({
      isOpenMerge: true,
      txMergeInfo: {
        image: coin.image,
        name: coin.name,
        symbol: coin.symbol,
      },
    }),
  closeMerge: () => set({ isOpenMerge: false, txMergeInfo: null, rowSelection: {} }),

  setRowSelection: (updater) =>
    set((state) => ({
      rowSelection: typeof updater === "function" ? updater(state.rowSelection) : updater,
    })),
}));
