import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


// import { PrismaClient } from '@/app/generated/prisma'

// // Using a singleton pattern for PrismaClient
// // This prevents multiple instances during development with hot reloading

// // Use a declaration merging to add prisma to the global type
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// // Export a singleton prisma client
// export const prisma = global.prisma || new PrismaClient({
//   log: ['query', 'error', 'warn'], // Add logging for debugging
// });

// // In development, attach to global to prevent multiple instances
// if (process.env.NODE_ENV !== 'production') {
//   global.prisma = prisma;
// }




