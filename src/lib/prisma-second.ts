import { PrismaClient } from "@/generated/client";

declare global {
  var prisma2: PrismaClient | undefined;
}

let prisma2 = globalThis.prisma2 || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  prisma2 = new PrismaClient();
} else {
  if (!global.prisma2) {
    global.prisma2 = new PrismaClient();
  }
  prisma2 = global.prisma2;
}

export default prisma2;
