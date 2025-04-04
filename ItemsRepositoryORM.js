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
        const item = await prisma.items.findFirst({
            where: filters,
        })
        return item
    }

    async update(id, attrs) {
        const updated = await prisma.items.update({
            where: { id },
            data: attrs,
        })
        return updated
    }

    async delete(id) {
        const deleted = await prisma.items.delete({
            where: { id },
        })
        return deleted
    }

    async getAll() {
        const items = await prisma.items.findMany()
        return items
    }

}


export default new ItemsRepositoryORM();
