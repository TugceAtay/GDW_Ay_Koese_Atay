const mongoose = require('mongoose');

// Schema - Tabelle.
const Loesungaufgabe = require('../models/loesungaufgabe');

exports.loesungaufgabe_get_all = (req, res, next) => {
    Loesungaufgabe
        .find()
        .select('_id aufgabeid testid testergebnisid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Loesungaufgabe: docs.map(doc => {
                    return {
                        _id: doc._id,
                        aufgabeid:doc.aufgabeid,
                        testid: doc.testid,
                        testergebnisid: doc.testergebnisid
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
};

exports.loesungaufgabe_create_loesungaufgabe = (req, res, next) => {
    const loesungaufgabe = new Loesungaufgabe({
        _id: new mongoose.Types.ObjectId(),
        aufgabeid: req.body.aufgabeid,
        testid: req.body.testid,
        testergebnisid: req.body.testergebnisid
    });
    loesungaufgabe
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Neue Lösung',
                erstellterLoesungaufgabe: {
                    aufgabed: result.aufgabeid,
                    testid: result.testid,
                    testergebnisid: result.testergebnisid

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.loesungaufgabe_get_loesungaufgabe = (req, res, next) => {
    const loesungaufgabeId = req.params.loesungaufgabeId;
    Loesungaufgabe.findById(loesungaufgabeId)
        .select('_id aufgabeid testid testergebnisid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    loesungaufgabe: doc
                });
            } else {
                res.status(404).json({message: 'Keine ID gefunden!'});
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
};

exports.loesungaufgabe_update_loesungaufgabe = (req, res, next) => {
    const id = req.params.loesungaufgabeId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Loesungaufgabe.update({_id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.loesungaufgabe_delete = (req, res, next) => {
    Loesungaufgabe
        .remove({ _id: req.params.loesungaufgabeId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Loesungaufgabe weg bam!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/loesungaufgabe/",
                    body: {loesungaufgabeId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
