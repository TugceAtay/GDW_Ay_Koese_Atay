const mongoose = require('mongoose');

const klassenSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bezeichnung: {type: String, required: true}, // inkl. validation.
    jahrgang: {type: String, required: true}, // inkl. validation.
    lehrerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Lehrer'}, // Ist eine Beziehung vom Lehrer-Schema.
    schuelerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Schueler'}, // Ist eine Beziehung vom Schueler-Schema.
});

module.exports = mongoose.model('Klassen', klassenSchema);
