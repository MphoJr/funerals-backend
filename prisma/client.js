import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Optional: log queries for debugging
prisma.$use(async (params, next) => {
  console.log(`Query: ${params.model}.${params.action}`);
  return next(params);
});
