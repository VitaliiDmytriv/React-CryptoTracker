// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Portfolio } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
    portfolio?: PortfolioPayload;
    coin?: CoinPayload;
    transaction?: TransactionPayload;
  }
}
