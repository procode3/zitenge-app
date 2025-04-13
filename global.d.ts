import { PrismaClient } from '@prisma/client';

declare global {
  const prisma: PrismaClient | undefined;
  namespace NodeJS {
    interface ProcessEnv extends CloudflareEnv {}
  }
}

export type {};
