const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const globalForPrisma = globalThis;

let prisma;

if (!globalForPrisma.prisma) {
  console.log("🟢 Creating new Prisma client");
  const pool = new Pool({ connectionString: process.env.DIRECT_URL });
  const adapter = new PrismaPg(pool);

  prisma = new PrismaClient({ adapter });
  globalForPrisma.prisma = prisma;
} else {
  console.log("♻️ Reusing Prisma client");
  prisma = globalForPrisma.prisma;
}

module.exports = prisma;
