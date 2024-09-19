const { db } = require('../database');

module.exports = {
  getAllDays: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM day ORDER BY date DESC", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          rows.forEach(row => {
            row.tasks_todo = JSON.parse(row.tasks_todo);
            row.tasks_if_possible = JSON.parse(row.tasks_if_possible);
            row.tasks_optional = JSON.parse(row.tasks_optional);
          });
          resolve(rows);
        }
      });
    });
  },
  getDay: (date) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM day WHERE date = ?", [date], (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            row.tasks_todo = JSON.parse(row.tasks_todo);
            row.tasks_if_possible = JSON.parse(row.tasks_if_possible);
            row.tasks_optional = JSON.parse(row.tasks_optional);
          }
          resolve(row);
        }
      });
    });
  },
  
  createOrUpdateDay: (date, note, tasks_todo, tasks_if_possible, tasks_optional) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR REPLACE INTO day (date, note, tasks_todo, tasks_if_possible, tasks_optional) 
         VALUES (?, ?, ?, ?, ?)`,
        [date, note, JSON.stringify(tasks_todo), JSON.stringify(tasks_if_possible), JSON.stringify(tasks_optional)],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }
};