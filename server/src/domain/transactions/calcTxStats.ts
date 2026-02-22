import { parseTxDecimalsType } from "./parseTx";

export function calcTxStats(payload: parseTxDecimalsType) {
  const totalSpent = payload.quantity.mul(payload.pxBought);
  const profit = payload.pxSold
    ? payload.quantity.mul(payload.pxSold).minus(totalSpent).minus(payload.fees)
    : null;

  return {
    ...payload,
    totalSpent,
    profit,
  };
}

export type CalcTxStatsType = ReturnType<typeof calcTxStats>;
