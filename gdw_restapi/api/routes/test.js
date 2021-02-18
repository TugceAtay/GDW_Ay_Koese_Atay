const express = require('express');
const router = express.Router();


const testController = require('../controllers/test');
const Test = require('../models/test');


// Alle Datensätze finden/aufrufen.
router.get('/', testController.test_get_all);

// Datensätze vom POST-METHOD speichern.
router.post('/', testController.test_create_test);

// Findet nur einen Datensatz von POST-METHOD.
router.get('/:testId', testController.test_get_test);

// aktualisiert einen Datensatz.
router.patch('/:testId', testController.test_update_test);

// Löscht eine ID.
router.delete('/:testId', testController.test_delete);

module.exports = router;
