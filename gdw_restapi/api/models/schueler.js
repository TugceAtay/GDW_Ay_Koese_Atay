const mongoose = require('mongoose');

const schuelerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vorname: {type: String, required: true}, // inkl. validation.
    nachname: {type: String, required: true}, // inkl. validation.
    plz: {type: Number, required: true}, // inkl. validation.
    schuleid: {type: mongoose.Schema.Types.ObjectId, ref: 'Schule'}, // Ist eine Beziehung vom Schule-Schema.
    lehrerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Lehrer'}, // Ist eine Beziehung vom Lehrer-Schema.
    klassenid: {type: mongoose.Schema.Types.ObjectId, ref: 'Klassen'} // Ist eine Beziehung vom Klassen-Schema.
});

module.exports = mongoose.model('Schueler', schuelerSchema);
