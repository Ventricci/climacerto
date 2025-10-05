import { PrismaClient } from '@prisma/client';


declare global {
  
  var prisma: PrismaClient | undefined;
}


const prismaClient = globalThis.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], 
});


if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prismaClient;
}


export const prisma = prismaClient;


export default prisma;