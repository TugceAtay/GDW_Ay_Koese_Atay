const mongoose = require('mongoose');

const fachSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fachname: {type: String, required: true}, // inkl. validation.
    lernstoffid: {type: mongoose.Schema.Types.ObjectId, ref: 'Lernstoff', required: true}, // Ist eine Beziehung vom Lernstoff-Schema.
    lehrerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Lehrer', required: true}, // Ist eine Beziehung vom Lehrer-Schema.
    schuelerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Schueler', required: true}, // Ist eine Beziehung vom Schueler-Schema.
    klassenid: {type: mongoose.Schema.Types.ObjectId, ref: 'Klassen', required: true} // Ist eine Beziehung vom Klassen-Schema.
});

module.exports = mongoose.model('Fach', fachSchema);
