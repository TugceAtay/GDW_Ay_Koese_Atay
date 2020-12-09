const express = require('express');
const router = express.Router();


const schuelerController = require('../controllers/schueler');
const Schueler = require('../models/schueler');


// Alle Datensätze finden/aufrufen.
router.get('/', schuelerController.schueler_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', schuelerController.schueler_create_schueler);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:schuelerId', schuelerController.schueler_get_schueler);

// aktualisiert einen Datensatz.
router.patch('/:schuelerId', schuelerController.schueler_update_schueler);

// Löscht eine ID.
router.delete('/:schuelerId', schuelerController.schueler_delete);

module.exports = router;
