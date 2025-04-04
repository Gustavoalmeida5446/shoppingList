import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const item = await prisma.items.create({
    data: {
      item: 'pão',
    },
  })
  console.log(item)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })