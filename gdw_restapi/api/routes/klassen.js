const express = require('express');
const router = express.Router();


const klassenController = require('../controllers/klassen');
const Klassen = require('../models/klassen');


// Alle Datensätze finden/aufrufen.
router.get('/', klassenController.klassen_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', klassenController.klassen_create_klassen);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:klassenId', klassenController.klassen_get_klassen);

// aktualisiert einen Datensatz.
router.patch('/:klassenId', klassenController.klassen_update_klassen);

// Löscht eine ID.
router.delete('/:klassenId', klassenController.klassen_delete);

module.exports = router;
