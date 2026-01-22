import Decimal from "decimal.js";
import { updTxApi } from "../../schemas/transactions.schema";

export function parseTxDecimals(payload: updTxApi) {
  return {
    quantity: new Decimal(payload.quantity),
    pxBought: new Decimal(payload.pricePerCoinBought),
    pxSold: payload.pricePerCoinSold ? new Decimal(payload.pricePerCoinSold) : null,
    fees: payload.fees ? new Decimal(payload.fees) : new Decimal(0),
  };
}

export type parseTxDecimalsType = ReturnType<typeof parseTxDecimals>;
