const express = require('express');
const router = express.Router();
const Contador = require('../models/Contador');

// Ruta para obtener el contador
router.get('/', async (req, res) => {
  try {
    let counter = await Contador.findOne();
    if (!counter) {
      counter = new Contador();
      await counter.save();
    }
    res.json(counter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para incrementar el contador
router.post('/increment', async (req, res) => {
  try {
    let counter = await Contador.findOne();
    if (!counter) {
      counter = new Contador();
      await counter.save();
    }
    counter.value += 1;
    await counter.save();
    res.json(counter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;