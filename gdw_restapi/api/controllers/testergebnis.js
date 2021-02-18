const mongoose = require('mongoose');

// Schema - Tabelle.
const Testergebnis = require('../models/testergebnis');

exports.testergebnis_get_all = (req, res, next) => {
    Testergebnis
        .find()
        .select('_id fehler korrekt testid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Testergebnis: docs.map(doc => {
                    return {
                        _id: doc._id,
                        fehler: doc.fehler,
                        korrekt: doc.korrekt,
                        testid: doc.testid
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

exports.testergebnis_create_testergebnis = (req, res, next) => {
    const testergebnis = new Testergebnis({
        _id: new mongoose.Types.ObjectId(),
        fehler: req.body.fehler,
        korrekt: req.body.korrekt,
        testid: req.body.testid
    });
    testergebnis
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Der neue Testergebnis wurde hinzugefügt',
                erstellteTestergebnis: {
                    fehler: result.fehler,
                    korrekt: result.korrekt,
                    testid: result.testid
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

exports.testergebnis_get_testergebnis = (req, res, next) => {
    const testergebnisId = req.params.testergebnisId;
    Testergebnis.findById(testergebnisId)
        .select('_id fehler korrekt testid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    testergebnis: doc
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

exports.testergebnis_update_testergebnis = (req, res, next) => {
    const id = req.params.testergebnisId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Testergebnis.update({_id: id}, { $set: updateOps })
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

exports.testergebnis_delete = (req, res, next) => {
    Testergebnis
        .remove({ _id: req.params.testergebnisId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Testergebnis gelöscht!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/testergebnis/",
                    body: {testergebnisId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
