import { TxAddPayload } from "../../types/global";
import { calcTxStats } from "./calcTxStats";
import { parseTxDecimals } from "./parseTxDecimals";
import { buildTx } from "./buildTx";
import { v4 as uuidv4 } from "uuid";

export function prepareNewTx(payload: TxAddPayload, coinId: string) {
  const decimals = parseTxDecimals(payload);
  const calculated = calcTxStats(decimals);
  const data = buildTx(calculated, payload);

  return {
    ...data,
    id: uuidv4(),
    coinId,
  };
}
