const mongoose = require('mongoose');

const testergebnisSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fehler: {type: String, required: true}, // inkl. validation.
    korrekt: {type: String, required: true}, // inkl. validation.
    testid: {type: mongoose.Schema.Types.ObjectId, ref: 'Test'} // Ist eine Beziehung vom Test-Schema.
});

module.exports = mongoose.model('Testergebnis', testergebnisSchema);
