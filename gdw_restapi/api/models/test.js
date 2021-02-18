const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    aufgabeid: {type: mongoose.Schema.Types.ObjectId, ref: 'Aufgabe'}, // inkl. validation.
    zeit: {type: Number, required: true}, // inkl. validation.
    lehrerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Lehrer'}, // Ist eine Beziehung vom Lehrer-Schema.
    schuelerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Schueler'} // Ist eine Beziehung vom Schueler-Schema.
});

module.exports = mongoose.model('Test', testSchema);
