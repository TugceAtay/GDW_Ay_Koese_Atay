const mongoose = require('mongoose');

const schuleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    schulname: {type: String, required: true}, // inkl. validation.
    adresse: {type: String, required: true}, // inkl. validation.
    lehrerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Lehrer'}, // Ist eine Beziehung vom Lehrer-Schema.
    schuelerid: {type: mongoose.Schema.Types.ObjectId, ref: 'Schueler'}, // Ist eine Beziehung vom Schueler-Schema.
    klassenid: {type: mongoose.Schema.Types.ObjectId, ref: 'Klassen'} // Ist eine Beziehung vom Klassen-Schema.
});

module.exports = mongoose.model('Schule', schuleSchema);
