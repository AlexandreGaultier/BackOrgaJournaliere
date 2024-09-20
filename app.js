const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const dayRoutes = require('./routes/dayRoutes');
const { db } = require('./database');

app.use(cors({
  origin: 'https://organisation-journaliere.netlify.app',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('service : ok');
});

// Utilisation des routes pour /days
app.use('/days', dayRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});