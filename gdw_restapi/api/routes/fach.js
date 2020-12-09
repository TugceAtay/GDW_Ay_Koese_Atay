const express = require('express');
const router = express.Router();


const fachController = require('../controllers/fach');
const Fach = require('../models/fach');


// Alle Datensätze finden/aufrufen.
router.get('/', fachController.fach_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', fachController.fach_create_fach);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:fachId', fachController.fach_get_fach);

// aktualisiert einen Datensatz.
router.patch('/:fachId', fachController.fach_update_fach);

// Löscht eine ID.
router.delete('/:fachId', fachController.fach_delete);

module.exports = router;
