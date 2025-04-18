const fs = require('fs');
const {v4: uuidv4} = require('uuid');

class ItemsRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async create(attrs) {
        attrs.id = this.randomId();
        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    randomId() {
        return uuidv4();
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        Object.assign(record, attrs);
        await this.writeAll(records);
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

    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
    
        if (filteredRecords.length === records.length) {
            return false;
        }
    
        await this.writeAll(filteredRecords);
        return true;
    }
    

    async getAll() {
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        );
    }
}

// const test = async () => {
//     const repo = new ItemsRepository('items.json');
//     repo.create({ id: 19, item: 'new item' });
//     const items = await repo.getAll();
//     console.log(items);
// };

// test();

module.exports = new ItemsRepository('items.json');