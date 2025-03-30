import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

const adapter = new PrismaD1(process.env.DB);
let prisma: PrismaClient | null = null;

export function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}
