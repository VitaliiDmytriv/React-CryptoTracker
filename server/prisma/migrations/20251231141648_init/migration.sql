-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalProfit" DECIMAL NOT NULL DEFAULT 0,
    "activeInvestment" DECIMAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "activeInvestment" DECIMAL NOT NULL,
    "avgPrice" DECIMAL NOT NULL,
    "holdings" DECIMAL NOT NULL,
    "totalProfit" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Coin_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coinId" TEXT NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "pricePerCoinBought" DECIMAL NOT NULL,
    "fees" DECIMAL,
    "totalSpent" DECIMAL NOT NULL,
    "pricePerCoinSold" DECIMAL,
    "profit" DECIMAL,
    "notes" TEXT,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Transaction_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Portfolio_userId_idx" ON "Portfolio"("userId");

-- CreateIndex
CREATE INDEX "Coin_portfolioId_idx" ON "Coin"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_portfolioId_symbol_key" ON "Coin"("portfolioId", "symbol");

-- CreateIndex
CREATE INDEX "Transaction_coinId_idx" ON "Transaction"("coinId");

-- CreateIndex
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");
