import Decimal from "decimal.js";
import { TxDecimalFields } from "../../types/global";

export function parseTxDecimals<T extends TxDecimalFields>(payload: T) {
  return {
    quantity: new Decimal(payload.quantity),
    pxBought: new Decimal(payload.pricePerCoinBought),
    pxSold: payload.pricePerCoinSold ? new Decimal(payload.pricePerCoinSold) : null,
    fees: payload.fees ? new Decimal(payload.fees) : new Decimal(0),
  };
}

export type parseTxDecimalsType = ReturnType<typeof parseTxDecimals>;
