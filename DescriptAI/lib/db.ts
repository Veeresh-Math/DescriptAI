import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use global singleton to prevent multiple instances in serverless environments
export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Handle graceful shutdown (important for serverless)
process.on('beforeExit', async () => {
  await db.$disconnect();
});

