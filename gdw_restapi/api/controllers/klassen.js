const mongoose = require('mongoose');

// Schema - Tabelle.
const Klassen = require('../models/klassen');

exports.klassen_get_all = (req, res, next) => {
    Klassen
        .find()
        .select('_id bezeichnung jahrgang lehrerid schuelerid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Klassen: docs.map(doc => {
                    return {
                        _id: doc._id,
                        bezeichnung: doc.bezeichnung,
                        jahrgang: doc.jahrgang,
                        lehrerid: doc.lehrerid,
                        schuelerid: doc.schuelerid
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

exports.klassen_create_klassen = (req, res, next) => {
    const klassen = new Klassen({
        _id: new mongoose.Types.ObjectId(),
        bezeichnung: req.body.bezeichnung,
        jahrgang: req.body.jahrgang,
        lehrerid: req.body.lehrerid,
        schuelerid: req.body.schuelerid
    });
    klassen
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Eine neue Klasse wurde eingerichtet',
                erstellteKlasse: {
                    bezeichnung: result.bezeichnung,
                    jahrgang: result.jahrgang,
                    lehrerid: result.lehrerid,
                    schuelerid: result.schuelerid
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

exports.klassen_get_klassen = (req, res, next) => {
    const klassenId = req.params.klassenId;
    Klassen.findById(klassenId)
        .select('_id bezeichnung jahrgang lehrerid schuelerid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    klassen: doc
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

exports.klassen_update_klassen = (req, res, next) => {
    const id = req.params.klassenId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Klassen.update({_id: id}, { $set: updateOps })
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

exports.klassen_delete = (req, res, next) => {
    Klassen
        .remove({ _id: req.params.lehrerId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Klasse zerstört!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/klassen/",
                    body: {klassenId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
