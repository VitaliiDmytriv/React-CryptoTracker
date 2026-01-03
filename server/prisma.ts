// server/src/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// створюємо adapter для SQLite
const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

// створюємо єдиний екземпляр PrismaClient
export const prisma = new PrismaClient({ adapter });
