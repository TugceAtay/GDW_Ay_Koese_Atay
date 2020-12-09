const mongoose = require('mongoose');

const lehrerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vorname: {type: String, required: true}, // inkl. validation.
    nachname: {type: String, required: true}, // inkl. validation.
    plz: {type: Number, required: true}, // inkl. validation.
    fachid: {type: mongoose.Schema.Types.ObjectId, ref: 'Fach'}, // Ist eine Beziehung vom Fach-Schema.
    schuelerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Schueler'}, // Ist eine Beziehung vom Schueler-Schema.
    klassenid: {type: mongoose.Schema.Types.ObjectId, ref: 'Klassen'} // Ist eine Beziehung vom Klassen-Schema.
});

module.exports = mongoose.model('Lehrer', lehrerSchema);
