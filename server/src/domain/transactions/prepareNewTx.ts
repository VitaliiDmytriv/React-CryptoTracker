import { TxDecimalFields } from "../../types/global";
import { calcTxStats } from "./calcTxStats";
import { parseTxDecimals } from "./parseTx";
import { buildTx } from "./buildTx";
import { v4 as uuidv4 } from "uuid";

export function prepareNewTx(payload: TxDecimalFields & { date: string }, coinId: string) {
  const decimals = parseTxDecimals(payload);
  const calculated = calcTxStats(decimals);
  const data = buildTx(calculated, payload);

  return {
    ...data,
    id: uuidv4(),
    coinId,
  };
}
