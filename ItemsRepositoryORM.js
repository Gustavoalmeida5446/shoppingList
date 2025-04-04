import { PrismaClient } from './generated/prisma/index.js'
const prisma = new PrismaClient()


class ItemsRepositoryORM {
    async create(attrs) {
        const item = await prisma.items.create({
            data: {
                item: attrs.item,
            },
        })
        console.log(item)
    }

    async getOneBy(filters) {

    }

    async update(id, attrs) {

    }

    async delete(id) {

    }

    async getAll() {
        const items = await prisma.items.findMany()
        return items
    }

}


export default new ItemsRepositoryORM();
