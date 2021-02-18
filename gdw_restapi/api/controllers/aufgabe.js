const mongoose = require('mongoose');

// Schema - Tabelle.
const Aufgabe = require('../models/aufgabe');

exports.aufgabe_get_all = (req, res, next) => {
    Aufgabe
        .find()
        .select('_id fachid klassenid thema')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Aufgabe: docs.map(doc => {
                    return {
                        _id: doc._id,
                        fachid:doc.fachid,
                        klassenid: doc.klassenid,
                        thema: doc.thema
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

exports.aufgabe_create_aufgabe = (req, res, next) => {
    const aufgabe = new Aufgabe({
        _id: new mongoose.Types.ObjectId(),
        fachid: req.body.fachid,
        klassenid: req.body.klassenid,
        thema: req.body.thema
    });
    aufgabe
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Neue Aufgabe',
                erstellterAufgabe: {
                    fachid: result.fachid,
                    klassenid: result.klassenid,
                    thema: result.thema

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

exports.aufgabe_get_aufgabe = (req, res, next) => {
    const aufgabeId = req.params.aufgabeId;
    Aufgabe.findById(aufgabeId)
        .select('_id fachid klassenid thema')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    aufgabe: doc
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

exports.aufgabe_update_aufgabe = (req, res, next) => {
    const id = req.params.aufgabeId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Aufgabe.update({_id: id}, { $set: updateOps })
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

exports.aufgabe_delete = (req, res, next) => {
    Aufgabe
        .remove({ _id: req.params.aufgabeId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Aufgabe weg bam!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/aufgabe/",
                    body: {aufgabeId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
