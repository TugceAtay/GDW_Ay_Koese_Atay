const express = require('express');
const router = express.Router();


const loesungaufgabeController = require('../controllers/loesungaufgabe');
const Loesungaufgabe = require('../models/loesungaufgabe');


// Alle Datensätze finden/aufrufen.
router.get('/', loesungaufgabeController.loesungaufgabe_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', loesungaufgabeController.loesungaufgabe_create_loesungaufgabe);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:loesungaufgabeId', loesungaufgabeController.loesungaufgabe_get_loesungaufgabe);

// aktualisiert einen Datensatz.
router.patch('/:loesungaufgabeId', loesungaufgabeController.loesungaufgabe_update_loesungaufgabe);

// Löscht eine ID.
router.delete('/:loesungaufgabeId', loesungaufgabeController.loesungaufgabe_delete);

module.exports = router;
