import { updTxApi } from "../../schemas/transactions.schema";
import { CalcTxStatsType } from "./calcTxStats";

export function buildTxUpd(calcTx: CalcTxStatsType, payload: updTxApi) {
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
