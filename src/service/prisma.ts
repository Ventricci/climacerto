import { PrismaClient} from "@prisma/client";

console.log("Chamando primsa");


declare global {
    var prisma : PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production"){
    global.prisma = prisma;
}
