export const authEndpoints = {
  login: "/auth/login" as const,
};

export const userEndpoints = {
  me: "/users/me" as const,
};

export const portfolioEndpoints = {
  byName: (name: string) => `/users/me/portfolios/${name}` as const,
  coin: (portfolioName: string, symbol: string) =>
    `/users/me/portfolios/${portfolioName}/coins/${symbol}` as const,
};
