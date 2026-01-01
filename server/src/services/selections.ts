import { Prisma } from "@prisma/client";

export const userSelectBase = {
  email: true,
  id: true,
  portfolios: true,
  userName: true,
} satisfies Prisma.UserSelect;

export const userSelectCredentials = {
  email: true,
  password: true,
  id: true,
  userName: true,
} satisfies Prisma.UserSelect;

export const userSelectMe = {
  email: true,
  id: true,
  userName: true,
} satisfies Prisma.UserSelect;
