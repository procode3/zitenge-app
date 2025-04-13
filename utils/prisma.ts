import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

let prisma: PrismaClient | null = null;

export function getPrisma() {
  const adapter = new PrismaD1(process.env.DB);
  if (!prisma) {
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}
