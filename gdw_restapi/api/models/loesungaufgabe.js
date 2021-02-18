const mongoose = require('mongoose');

const loesungaufgabeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    aufgabeid: {type: mongoose.Schema.Types.ObjectId, ref: 'Aufgabe'}, // Ist eine Beziehung vom Aufgabe-Schema.
    testid: {type: mongoose.Schema.Types.ObjectId, ref: 'Test'},
    testergebnisid: {type: mongoose.Schema.Types.ObjectId, ref: 'Testergebnis'}
});

module.exports = mongoose.model('Loesungaufgabe', loesungaufgabeSchema);
