const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'days.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
  }
});

// Fonction pour insérer des données fictives
function insertFakeData(date, note, tasks_todo, tasks_if_possible, tasks_optional) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR REPLACE INTO day (date, note, tasks_todo, tasks_if_possible, tasks_optional) VALUES (?, ?, ?, ?, ?)`,
      [date, note, JSON.stringify(tasks_todo), JSON.stringify(tasks_if_possible), JSON.stringify(tasks_optional)],
      (err) => {
        if (err) {
          console.error("Erreur lors de l'insertion des données fictives:", err);
          reject(err);
        } else {
          console.log(`Données insérées pour la date ${date}`);
          resolve();
        }
      }
    );
  });
}

db.serialize(async () => {
  db.run(`CREATE TABLE IF NOT EXISTS day (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT UNIQUE,
    note INTEGER,
    tasks_todo TEXT,
    tasks_if_possible TEXT,
    tasks_optional TEXT
  )`);

  // Insérer les données fictives
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  try {
    await insertFakeData(
      today.toISOString().split('T')[0],
      6,
      ["Corder une application", "Faire un design", "Lire 500 pages"],
      ["Faire du sport", "Dessiner 20 minutes"],
      ["Faire une balade", "Réserver le saut en parapente"]
    );

    await insertFakeData(
      yesterday.toISOString().split('T')[0],
      5,
      ["Corder une site web", "Manger sainement", "Essayer une nouvelle recette"],
      ["Faire du sport", "Méditer 15 minutes"],
      ["Organiser une randonee", "Ranger le salon"]
    );

    await insertFakeData(
      twoDaysAgo.toISOString().split('T')[0],
      4,
      ["Tester Framer", "Faire un design", "Lire 50 pages"],
      ["20min de vélo", "Dessiner 20 minutes"],
      ["Ecouter le nouvel album de Imagine Dragons", "Jouer à Core Keeper"]
    );

    console.log("Toutes les données fictives ont été insérées avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données fictives:", error);
  }
});

// Fonction pour ajouter facilement de nouvelles entrées
function addNewDay(date, note, tasks_todo, tasks_if_possible, tasks_optional) {
  return insertFakeData(date, note, tasks_todo, tasks_if_possible, tasks_optional);
}

module.exports = { db, addNewDay };