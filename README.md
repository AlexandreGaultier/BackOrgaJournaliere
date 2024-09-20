# Gestionnaire de Tâches Quotidiennes

Application backend Node.js/Express avec SQLite pour gérer des tâches quotidiennes.

## Prérequis

- Node.js (v12+)
- npm (v6+)

## Installation

1. Cloner le dépôt :
   ```
   git clone https://github.com/votre-utilisateur/gestionnaire-taches-quotidiennes.git
   ```

2. Installer les dépendances :
   ```
   npm install
   ```

3. Démarrer le serveur :
   ```
   npm start
   ```

Le serveur démarre sur `http://localhost:3000`.

## Structure du Projet

- `app.js` : Point d'entrée de l'application
- `database.js` : Configuration SQLite
- `dao/dayDao.js` : Accès aux données
- `routes/dayRoutes.js` : Routes API
- `services/dayService.js` : Logique métier

## API Endpoints

- `GET /` : Vérifier l'état du service
- `GET /days` : Obtenir toutes les journées
- `GET /days/:date` : Obtenir une journée spécifique
- `POST /days` : Créer/mettre à jour une journée

## Exemple d'utilisation

Ajouter une nouvelle journée :

```javascript
const { addNewDay } = require('./database');
addNewDay('2023-04-22',7,
["Apprendre React", "Faire du yoga"],
["Appeler un ami"],
["Regarder un film"])
.then(() => console.log("Ajouté avec succès"))
.catch(error => console.error("Erreur :", error));
```

## Débogage

Voir les données dans SQLite :

``` bash
sqlite3 days.db
SELECT FROM day;
```
