export type updTx = {
  quantity: number;
  pricePerCoinBought: number;
  pricePerCoinSold: number | null;
  fees: number | null;
  date: string;
};

export type createTx = {
  name: string;
  quantity: number;
  pricePerCoinBought: number;
  fees: number | null;
  notes: string | null;
  pricePerCoinSold: null | number;
  date: string;
};

export type Modes = "add" | "edit" | "merge";

export const TransactionMode = {
  Add: "add",
  Edit: "edit",
  Merge: "merge",
} as const;

export type CoinOption = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
};

export type SearchCoin = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export type SearchResponse = {
  coins: SearchCoin[];
};

export type SearchSimplePrice = Record<string, { usd: number }>;
