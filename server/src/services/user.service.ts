import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";

export const userService = {
  getByEmail: async <TSelect extends Prisma.UserSelect>(
    email: string,
    select: TSelect
  ): Promise<Prisma.UserGetPayload<{ select: TSelect }> | null> => {
    return prisma.user.findUnique({
      where: { email },
      select,
    });
  },
  getById: async <TSelect extends Prisma.UserSelect>(
    id: string,
    select: TSelect
  ): Promise<Prisma.UserGetPayload<{ select: TSelect }> | null> => {
    return prisma.user.findUnique({
      where: { id },
      select,
    });
  },
};
