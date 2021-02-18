const express = require('express');
const router = express.Router();


const testergebnisController = require('../controllers/testergebnis');
const Testergebnis = require('../models/testergebnis');


// Alle Datensätze finden/aufrufen.
router.get('/', testergebnisController.testergebnis_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', testergebnisController.testergebnis_create_testergebnis);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:testergebnisId', testergebnisController.testergebnis_get_testergebnis);

// aktualisiert einen Datensatz.
router.patch('/:testergebnisId', testergebnisController.testergebnis_update_testergebnis);

// Löscht eine ID.
router.delete('/:testergebnisId', testergebnisController.testergebnis_delete);

module.exports = router;
