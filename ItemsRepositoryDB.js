import sqlite3 from 'sqlite3';
import { execute } from './db/sql.js';

const db = new sqlite3.Database("shoppingList.db");

class ItemsRepositoryDB {
    async create(attrs) {
        try {
            await execute(
                db,
                `INSERT INTO items (item) 
                VALUES ('${attrs.item}');`
            );
        } catch (error) {
            console.log(error);
        }

    }

    async getOneBy(filters) {
        const records = await this.getAll();

        for (let record of records) {
            let found = true;

            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }

            if (found) {
                return record;
            }
        }
    }

    async update(id, attrs) {
        try {
            await execute(
                db,
                `UPDATE items
SET item = '${attrs.item}'
WHERE id = ${id};
;`
            );
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            await execute(
                db,
                `DELETE FROM items WHERE id = ${id};`
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const result = await execute(
                db,
                `SELECT * FROM items;`
            );
            return result;
        } catch (error) {
            console.log(error);
        }
    }

}


export default new ItemsRepositoryDB();
