const express = require('express');
const router = express.Router();


const schuleController = require('../controllers/schule');
const Schule = require('../models/schule');


// Alle Datensätze finden/aufrufen.
router.get('/', schuleController.schule_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', schuleController.schule_create_schule);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:schuleId', schuleController.schule_get_schule);

// aktualisiert einen Datensatz.
router.patch('/:schuleId', schuleController.schule_update_schule);

// Löscht eine ID.
router.delete('/:schuleId', schuleController.schule_delete);

module.exports = router;
