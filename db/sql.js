
// export async function execute(db, sql) {
//   return new Promise((resolve, reject) => {
//     db.run(sql, (err) => {
//       if (err) reject(err);
//       resolve();
//     });
//   });
// };

export const execute = async (db, query) => {
  return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
          if (err) {
              reject(err);
          } else {
              resolve(rows);
          }
      });
  });
};
