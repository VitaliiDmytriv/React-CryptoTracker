export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const portfolioKeys = {
  all: ["portfolio"] as const,
  byName: (name: string) => [...portfolioKeys.all, name] as const,
  coin: (portfolioName: string, symbol: string) =>
    [...portfolioKeys.byName(portfolioName), symbol] as const,
};

// export const portfolioKeys = {
//   all: ['portfolio'] as const,
//   current: () => [...portfolioKeys.all, 'current'] as const,
//   detail: (id: string) => [...portfolioKeys.all, 'detail', id] as const,
//   coins: (portfolioId: string) => [...portfolioKeys.detail(portfolioId), 'coins'] as const,
//   coin: (portfolioId: string, coinId: string) => [...portfolioKeys.coins(portfolioId), coinId] as const,
//   transactions: (portfolioId: string, coinId: string) => [...portfolioKeys.coin(portfolioId, coinId), 'transactions'] as const,
//   transaction: (portfolioId: string, coinId: string, txId: string) =>
//     [...portfolioKeys.transactions(portfolioId, coinId), txId] as const,
// };
