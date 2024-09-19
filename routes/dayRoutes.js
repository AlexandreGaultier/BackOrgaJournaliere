const express = require('express');
const router = express.Router();
const dayService = require('../services/dayService');

// Route pour obtenir toutes les journées
router.get('/', async (req, res) => {
  try {
    const days = await dayService.getAllDays();
    res.json(days);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour obtenir une journée spécifique
router.get('/:date', async (req, res) => {
  try {
    const day = await dayService.getDayData(req.params.date);
    if (day) {
      res.json(day);
    } else {
      res.status(404).json({ message: 'Jour non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour créer ou mettre à jour une journée
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const { date, note, tasks_todo, tasks_if_possible, tasks_optional } = req.body;
    await dayService.createOrUpdateDay(date, note, tasks_todo, tasks_if_possible, tasks_optional);
    res.status(201).json({ message: 'Jour créé ou mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;