
const execute = async (db, sql) => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = { execute };
