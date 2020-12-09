const express = require('express');
const router = express.Router();


const lehrerController = require('../controllers/lehrer');
const Lehrer = require('../models/lehrer');


// Alle Datensätze finden/aufrufen.
router.get('/', lehrerController.lehrer_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', lehrerController.lehrer_create_lehrer);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:lehrerId', lehrerController.lehrer_get_lehrer);

// aktualisiert einen Datensatz.
router.patch('/:lehrerId', lehrerController.lehrer_update_lehrer);

// Löscht eine ID.
router.delete('/:lehrerId', lehrerController.lehrer_delete);

module.exports = router;
