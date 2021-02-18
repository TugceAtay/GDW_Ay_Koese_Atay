const mongoose = require('mongoose');

// Schema - Tabelle.
const Erziehungsberechtigter = require('../models/erziehungsberechtigter');

exports.erziehungsberechtigter_get_all = (req, res, next) => {
    Erziehungsberechtigter
        .find()
        .select('_id vorname nachname schuelerid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Erziehungsberechtigter: docs.map(doc => {
                    return {
                        _id: doc._id,
                        vorname: doc.vorname,
                        nachname: doc.nachname,
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

exports.erziehungsberechtigter_create_erziehungsberechtigter = (req, res, next) => {
    const erziehungsberechtigter = new Erziehungsberechtigter ({
        _id: new mongoose.Types.ObjectId(),
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        schuelerid: req.body.schuelerid
    });
    erziehungsberechtigter
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Der neue Erziehungsberechtigter ist drin',
                angezeigterErziehungsberechtigter: {
                    vorname: result.vorname,
                    nachname: result.nachname,
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

exports.erziehungsberechtigter_get_erziehungsberechtigter = (req, res, next) => {
    const erziehungsberechtigterId = req.params.erziehungsberechtigterId;
    Erziehungsberechtigter.findById(erziehungsberechtigterId)
        .select('_id vorname nachname schuelerid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    erziehungsberechtigter: doc
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

exports.erziehungsberechtigter_update_erziehungsberechtigter = (req, res, next) => {
    const id = req.params.erziehungsberechtigterId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Erziehungsberechtigter.update({_id: id}, { $set: updateOps })
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

exports.erziehungsberechtigter_delete = (req, res, next) => {
    Erziehungsberechtigter
        .remove({ _id: req.params.erziehungsberechtigterId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Erziehungsberechtigter gekillt!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/schueler/",
                    body: {erziehungsberechtigterId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
