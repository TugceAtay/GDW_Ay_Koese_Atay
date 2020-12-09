const express = require('express');
const router = express.Router();


const lernstoffController = require('../controllers/lernstoff');
const Lernstoff = require('../models/lernstoff');


// Alle Datensätze finden/aufrufen.
router.get('/', lernstoffController.lernstoff_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', lernstoffController.lernstoff_create_lernstoff);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:lernstoffId', lernstoffController.lernstoff_get_lernstoff);

// aktualisiert einen Datensatz.
router.patch('/:lernstoffId', lernstoffController.lernstoff_update_lernstoff);

// Löscht eine ID.
router.delete('/:lernstoffId', lernstoffController.lernstoff_delete);

module.exports = router;
