import { prisma } from "../prisma";

async function main() {
  console.log("Starting seed...");

  await prisma.transaction.deleteMany();
  await prisma.coin.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      id: "20dbe14c-641b-42fc-af7c-ac11be1b7c33",
      userName: "vitaliq",
      email: "vitaliqq.dmutriv@gmail.com",
      password: "$2a$12$kmdyUseGIWpdfBw40HuOHuD5lkriQPQWd.2Vt.Wzviyfrs7UFvTuu",
    },
  });

  const portfolio = await prisma.portfolio.create({
    data: {
      portfolioName: "main",
      userId: user.id,
      currency: "USD",
      totalProfit: 150.1886378,
      activeInvestment: 2858.8421692,
    },
  });

  console.log("User and portfolio created");

  /* ---------------- BNB ---------------- */

  const bnb = await prisma.coin.create({
    data: {
      id: "b5a7e2d1-9540-470b-b455-2d7059bda1dc",
      portfolioId: portfolio.id,
      name: "BNB",
      symbol: "BNB",
      image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
      activeInvestment: 891.0659,
      avgPrice: 737.6373344370861,
      holdings: 1.208,
      totalProfit: 14.775,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        coinId: bnb.id,
        quantity: 0.15,
        pricePerCoinBought: 659,
        fees: 0.1,
        totalSpent: 98.85,
        date: new Date("2025-11-03"),
      },
      {
        coinId: bnb.id,
        quantity: 0.05,
        pricePerCoinBought: 755.19,
        fees: 1,
        totalSpent: 37.7595,
        pricePerCoinSold: 800,
        profit: 1.2405,
        date: new Date("2026-02-11"),
      },
      {
        coinId: bnb.id,
        quantity: 0.05,
        pricePerCoinBought: 712.19,
        totalSpent: 35.6095,
        pricePerCoinSold: 800,
        profit: 4.3905,
        date: new Date("2026-02-14"),
      },
      {
        coinId: bnb.id,
        quantity: 0.048,
        pricePerCoinBought: 623,
        totalSpent: 29.904,
        date: new Date("2026-02-13"),
      },
      {
        coinId: bnb.id,
        quantity: 0.072,
        pricePerCoinBought: 623,
        totalSpent: 44.856,
        pricePerCoinSold: 750,
        profit: 9.144,
        date: new Date("2026-02-13"),
      },
      {
        coinId: bnb.id,
        quantity: 0.01,
        pricePerCoinBought: 712.19,
        totalSpent: 7.1219,
        date: new Date("2026-02-14"),
      },
      {
        coinId: bnb.id,
        quantity: 1,
        pricePerCoinBought: 755.19,
        totalSpent: 755.19,
        date: new Date("2026-03-02"),
      },
    ],
  });

  console.log("BNB created");

  /* ---------------- BTC ---------------- */

  const btc = await prisma.coin.create({
    data: {
      id: "1f0ae6bb-d086-4f54-953a-844f17b0ce93",
      portfolioId: portfolio.id,
      name: "Bitcoin",
      symbol: "BTC",
      image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      activeInvestment: 83.21468,
      avgPrice: 109493,
      holdings: 0.00076,
      totalProfit: 1.9048,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        coinId: btc.id,
        quantity: 0.00076,
        pricePerCoinBought: 109493,
        fees: 1,
        totalSpent: 83.21468,
        date: new Date("2025-11-06"),
      },
      {
        coinId: btc.id,
        quantity: 0.0008,
        pricePerCoinBought: 77619,
        totalSpent: 62.0952,
        pricePerCoinSold: 80000,
        profit: 1.9048,
        date: new Date("2026-02-11"),
      },
    ],
  });

  console.log("BTC created");

  /* ---------------- DOGE ---------------- */

  const doge = await prisma.coin.create({
    data: {
      id: "4ae84fa5-86cb-4b66-af68-ef799bda2a98",
      portfolioId: portfolio.id,
      name: "Dogecoin",
      symbol: "DOGE",
      image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
      activeInvestment: 246.8456592,
      avgPrice: 0.11752764302582464,
      holdings: 2100.32,
      totalProfit: 0,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        coinId: doge.id,
        quantity: 100,
        pricePerCoinBought: 0.226898,
        fees: 0.1,
        totalSpent: 22.6898,
        date: new Date("2025-11-07"),
      },
      {
        coinId: doge.id,
        quantity: 2000.32,
        pricePerCoinBought: 0.11206,
        fees: 2,
        totalSpent: 224.1558592,
        date: new Date("2026-03-02"),
      },
    ],
  });

  console.log("DOGE created");

  /* ---------------- ETH ---------------- */

  const eth = await prisma.coin.create({
    data: {
      id: "97b03bfe-a9bb-4850-8541-41c97ecfd3a5",
      portfolioId: portfolio.id,
      name: "Ethereum",
      symbol: "ETH",
      image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      activeInvestment: 608.29622,
      avgPrice: 2321.741297709924,
      holdings: 0.262,
      totalProfit: 124.2488378,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        coinId: eth.id,
        quantity: 0.022,
        pricePerCoinBought: 2287.61,
        fees: 0.2,
        totalSpent: 50.32742,
        date: new Date("2026-02-03"),
      },
      {
        coinId: eth.id,
        quantity: 0.0165,
        pricePerCoinBought: 2118.81,
        totalSpent: 34.960365,
        pricePerCoinSold: 2100,
        profit: -0.310365,
        date: new Date("2026-02-04"),
      },
      {
        coinId: eth.id,
        quantity: 5.00156,
        pricePerCoinBought: 2324.87,
        fees: 1.13,
        totalSpent: 11627.9767972,
        pricePerCoinSold: 2350,
        profit: 124.5592028,
        date: new Date("2026-02-15"),
      },
      {
        coinId: eth.id,
        quantity: 0.2,
        pricePerCoinBought: 2324.87,
        fees: 2.26,
        totalSpent: 464.974,
        date: new Date("2026-02-15"),
      },
      {
        coinId: eth.id,
        quantity: 0.03,
        pricePerCoinBought: 2324.87,
        totalSpent: 69.7461,
        date: new Date("2026-02-15"),
      },
      {
        coinId: eth.id,
        quantity: 0.01,
        pricePerCoinBought: 2324.87,
        fees: 0.1,
        totalSpent: 23.2487,
        date: new Date("2026-03-01"),
      },
    ],
  });

  console.log("ETH created");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
