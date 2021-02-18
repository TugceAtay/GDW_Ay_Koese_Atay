const express = require('express');
const router = express.Router();


const stundenplanController = require('../controllers/stundenplan');
const Stundenplan = require('../models/stundenplan');


// Alle Datensätze finden/aufrufen.
router.get('/', stundenplanController.stundenplan_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', stundenplanController.stundenplan_create_stundenplan);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:stundenplanId', stundenplanController.stundenplan_get_stundenplan);

// aktualisiert einen Datensatz.
router.patch('/:stundenplanId', stundenplanController.stundenplan_update_stundenplan);

// Löscht eine ID.
router.delete('/:stundenplanId', stundenplanController.stundenplan_delete);

module.exports = router;
