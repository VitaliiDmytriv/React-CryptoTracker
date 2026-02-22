import Decimal from "decimal.js";
import { TxDecimalFields } from "../../types/global";

type TxFromBase = {
  quantity: Decimal;
  pricePerCoinBought: Decimal;
  pricePerCoinSold: Decimal | null;
  fees: Decimal | null;
};

export function parseTxDecimals<T extends TxDecimalFields>(payload: T) {
  return {
    quantity: new Decimal(payload.quantity),
    pxBought: new Decimal(payload.pricePerCoinBought),
    pxSold: payload.pricePerCoinSold ? new Decimal(payload.pricePerCoinSold) : null,
    fees: payload.fees ? new Decimal(payload.fees) : new Decimal(0),
  };
}

export function parseTxToString(payload: TxFromBase & { date: Date }) {
  return {
    quantity: payload.quantity.toString(),
    pricePerCoinBought: payload.pricePerCoinBought.toString(),
    pricePerCoinSold: payload.pricePerCoinSold ? payload.pricePerCoinSold.toString() : "",
    fees: payload.fees ? payload.fees.toString() : "",
    date: payload.date.toISOString(),
  };
}

export type parseTxDecimalsType = ReturnType<typeof parseTxDecimals>;
