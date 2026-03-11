import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { RegisterSchemaType } from "../schemas/auth.schema";
import bcrypt from "bcryptjs";

export const userService = {
  getByEmail: async <TSelect extends Prisma.UserSelect>(
    email: string,
    select: TSelect,
  ): Promise<Prisma.UserGetPayload<{ select: TSelect }> | null> => {
    return prisma.user.findUnique({
      where: { email },
      select,
    });
  },
  getById: async <TSelect extends Prisma.UserSelect>(
    id: string,
    select: TSelect,
  ): Promise<Prisma.UserGetPayload<{ select: TSelect }> | null> => {
    return prisma.user.findUnique({
      where: { id },
      select,
    });
  },

  create: async (data: RegisterSchemaType, tx: Prisma.TransactionClient) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await tx.user.create({
      data: {
        userName: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  },
};
