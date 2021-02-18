const express = require('express');
const router = express.Router();


const erziehungsberechtigterController = require('../controllers/erziehungsberechtigter');
const Erziehungsberechtigter = require('../models/erziehungsberechtigter');


// Alle Datensätze finden/aufrufen.
router.get('/', erziehungsberechtigterController.erziehungsberechtigter_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', erziehungsberechtigterController.erziehungsberechtigter_create_erziehungsberechtigter);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:erziehungsberechtigterId', erziehungsberechtigterController.erziehungsberechtigter_get_erziehungsberechtigter);

// aktualisiert einen Datensatz.
router.patch('/:erziehungsberechtigterId', erziehungsberechtigterController.erziehungsberechtigter_update_erziehungsberechtigter);

// Löscht eine ID.
router.delete('/:erziehungsberechtigterId', erziehungsberechtigterController.erziehungsberechtigter_delete);

module.exports = router;
