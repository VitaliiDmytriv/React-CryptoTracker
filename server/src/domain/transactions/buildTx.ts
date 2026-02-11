import { TxUpdatePayload } from "../../types/global";
import { CalcTxStatsType } from "./calcTxStats";

export function buildTx(calcTx: CalcTxStatsType, payload: TxUpdatePayload) {
  return {
    quantity: calcTx.quantity.toString(),
    pricePerCoinBought: calcTx.pxBought.toString(),
    pricePerCoinSold: calcTx.pxSold ? calcTx.pxSold.toString() : null,
    fees: calcTx.fees.toString() === "0" ? null : calcTx.fees.toString(),
    totalSpent: calcTx.totalSpent.toString(),
    profit: calcTx.profit ? calcTx.profit.toString() : null,
    date: new Date(payload.date),
  };
}
