const express = require('express');
const router = express.Router();


const aufgabeController = require('../controllers/aufgabe');
const Aufgabe = require('../models/aufgabe');


// Alle Datensätze finden/aufrufen.
router.get('/', aufgabeController.aufgabe_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', aufgabeController.aufgabe_create_aufgabe);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:aufgabeId', aufgabeController.aufgabe_get_aufgabe);

// aktualisiert einen Datensatz.
router.patch('/:aufgabeId', aufgabeController.aufgabe_update_aufgabe);

// Löscht eine ID.
router.delete('/:aufgabeId', aufgabeController.aufgabe_delete);

module.exports = router;
