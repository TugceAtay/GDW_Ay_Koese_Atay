const mongoose = require('mongoose');

const aufgabeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fachid: {type: mongoose.Schema.Types.ObjectId, ref: 'Fach'}, // Ist eine Beziehung vom Fach-Schema.
    klassenid: {type: mongoose.Schema.Types.ObjectId, ref: 'Klassen'}, // Ist eine Beziehung vom Klassen-Schema.
    thema: {type: String, required: true}
});

module.exports = mongoose.model('Aufgabe', aufgabeSchema);
