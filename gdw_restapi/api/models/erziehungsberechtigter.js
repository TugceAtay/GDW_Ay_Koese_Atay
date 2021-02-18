const mongoose = require('mongoose');

const erziehungsberechtigterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vorname: {type: String, required: true}, // inkl. validation.
    nachname: {type: String, required: true}, // inkl. validation.
    schuelerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Schüler'} // Ist eine Beziehung vom Schüler-Schema.
});

module.exports = mongoose.model('Erziehungsberechtigter', erziehungsberechtigterSchema);
