const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const exams = await prisma.exam.findMany({
    include: { questions: true }
  });
  console.log(JSON.stringify(exams, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
