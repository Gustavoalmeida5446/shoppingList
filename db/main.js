import sqlite3 from 'sqlite3';
import { execute } from './sql.js';

const main = async () => {
  const db = new sqlite3.Database("shoppingList.db");
  try {
    await execute(
      db,
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        item TEXT NOT NULL);`
    );
  } catch (error) {
    console.log(error);
  } finally {
    db.close();
  }
};

main();
