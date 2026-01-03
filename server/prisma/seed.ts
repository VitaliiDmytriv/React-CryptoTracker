import { prisma } from "../prisma";

// prisma/seed.ts

async function main() {
  console.log("Starting seed...");

  // Очищення бази даних
  await prisma.transaction.deleteMany();
  await prisma.coin.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.user.deleteMany();

  // Створення користувача
  const user = await prisma.user.create({
    data: {
      id: "20dbe14c-641b-42fc-af7c-ac11be1b7c33",
      userName: "vitaliq",
      email: "vitaliqq.dmutriv@gmail.com",
      password: "$2a$12$kmdyUseGIWpdfBw40HuOHuD5lkriQPQWd.2Vt.Wzviyfrs7UFvTuu",
    },
  });

  console.log("User created:", user.userName);

  // Створення портфоліо
  const portfolio = await prisma.portfolio.create({
    data: {
      portfolioName: "Main Portfolio",
      userId: user.id,
      totalProfit: 29.1,
      activeInvestment: 3238.8076940000005,
      currency: "USD",
    },
  });

  console.log("Portfolio created:", portfolio.portfolioName);

  // Створення монет та транзакцій

  // XRP
  const xrpCoin = await prisma.coin.create({
    data: {
      portfolioId: portfolio.id,
      name: "XRP",
      symbol: "XRP",
      image:
        "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
      activeInvestment: 33.480000000000004,
      avgPrice: 2.7900000000000005,
      holdings: 12,
      totalProfit: -2.8999999999999986,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        coinId: xrpCoin.id,
        quantity: 5,
        pricePerCoinBought: 2.79,
        totalSpent: 13.95,
        date: new Date("2025-10-26"),
      },
      {
        coinId: xrpCoin.id,
        quantity: 1,
        pricePerCoinBought: 2.79,
        totalSpent: 2.79,
        date: new Date("2025-10-26"),
      },
      {
        coinId: xrpCoin.id,
        quantity: 6,
        pricePerCoinBought: 2.79,
        totalSpent: 16.740000000000002,
        pricePerCoinSold: 0,
        date: new Date("2025-10-26"),
      },
      {
        coinId: xrpCoin.id,
        quantity: 5,
        pricePerCoinBought: 2.79,
        totalSpent: 13.95,
        pricePerCoinSold: 3,
        profit: 1.0500000000000007,
        date: new Date("2025-10-27"),
      },
      {
        coinId: xrpCoin.id,
        quantity: 5,
        pricePerCoinBought: 2.79,
        totalSpent: 13.95,
        pricePerCoinSold: 2,
        profit: -3.9499999999999993,
        date: new Date("2025-10-27"),
      },
    ],
  });

  console.log("XRP coin and transactions created");

  // SOL
  const solCoin = await prisma.coin.create({
    data: {
      portfolioId: portfolio.id,
      name: "Solana",
      symbol: "SOL",
      image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      activeInvestment: 394.394,
      avgPrice: 197.00000000000003,
      holdings: 2.002,
      totalProfit: 32,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        coinId: solCoin.id,
        quantity: 0.5,
        pricePerCoinBought: 183,
        totalSpent: 91.5,
        pricePerCoinSold: 210,
        profit: 13.5,
        date: new Date("2025-10-26"),
      },
      {
        coinId: solCoin.id,
        quantity: 0.5,
        pricePerCoinBought: 183,
        totalSpent: 91.5,
        pricePerCoinSold: 220,
        profit: 18.5,
        date: new Date("2025-10-26"),
      },
      {
        coinId: solCoin.id,
        quantity: 2.002,
        pricePerCoinBought: 197.00000000000003,
        totalSpent: 394.394,
        date: new Date("2025-11-24"),
      },
    ],
  });

  console.log("SOL coin and transactions created");

  // BNB
  const bnbCoin = await prisma.coin.create({
    data: {
      portfolioId: portfolio.id,
      name: "BNB",
      symbol: "BNB",
      image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
      activeInvestment: 2677.1200000000003,
      avgPrice: 2107.9685039370083,
      holdings: 1.27,
      totalProfit: 0,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        coinId: bnbCoin.id,
        quantity: 0.06766000000000001,
        pricePerCoinBought: 659,
        totalSpent: 44.58794000000001,
        date: new Date("2025-11-03"),
      },
      {
        coinId: bnbCoin.id,
        quantity: 0.00234,
        pricePerCoinBought: 659,
        totalSpent: 1.54206,
        date: new Date("2025-11-03"),
      },
      {
        coinId: bnbCoin.id,
        quantity: 0.2,
        pricePerCoinBought: 8332,
        totalSpent: 1666.4,
        pricePerCoinSold: 0,
        date: new Date("2025-11-03"),
      },
      {
        coinId: bnbCoin.id,
        quantity: 1,
        pricePerCoinBought: 964.59,
        totalSpent: 964.59,
        date: new Date("2025-11-03"),
      },
    ],
  });

  console.log("BNB coin and transactions created");

  // DOGE
  const dogeCoin = await prisma.coin.create({
    data: {
      portfolioId: portfolio.id,
      name: "Dogecoin",
      symbol: "DOGE",
      image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
      activeInvestment: 50.598254,
      avgPrice: 0.226898,
      holdings: 223,
      totalProfit: 0,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        coinId: dogeCoin.id,
        quantity: 100,
        pricePerCoinBought: 0.226898,
        totalSpent: 22.689799999999998,
        pricePerCoinSold: 0,
        date: new Date("2025-11-03"),
      },
      {
        coinId: dogeCoin.id,
        quantity: 123,
        pricePerCoinBought: 0.226898,
        totalSpent: 27.908454,
        date: new Date("2025-11-24"),
      },
    ],
  });

  console.log("DOGE coin and transactions created");

  // BTC
  const btcCoin = await prisma.coin.create({
    data: {
      portfolioId: portfolio.id,
      name: "Bitcoin",
      symbol: "BTC",
      image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      activeInvestment: 83.21544,
      avgPrice: 109494,
      holdings: 0.00076,
      totalProfit: 0,
    },
  });

  await prisma.transaction.create({
    data: {
      coinId: btcCoin.id,
      quantity: 0.00076,
      pricePerCoinBought: 109494,
      totalSpent: 83.21544,
      date: new Date("2025-11-03"),
    },
  });

  console.log("BTC coin and transactions created");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
