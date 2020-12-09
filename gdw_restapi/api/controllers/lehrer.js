const mongoose = require('mongoose');

// Schema - Tabelle.
const Lehrer = require('../models/lehrer');

exports.lehrer_get_all = (req, res, next) => {
    Lehrer
        .find()
        .select('_id vorname nachname plz fachid schuelerid klassenid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Lehrer: docs.map(doc => {
                    return {
                        _id: doc._id,
                        vorname: doc.vorname,
                        nachname: doc.nachname,
                        plz: doc.plz,
                        fachid:doc.fachid,
                        schuelerid: doc.schuelerid,
                        klassenid: doc.klassenid
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

exports.lehrer_create_lehrer = (req, res, next) => {
    const lehrer = new Lehrer({
        _id: new mongoose.Types.ObjectId(),
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        plz: req.body.plz,
        fachid: req.body.fachid,
        schuelerid: req.body.schuelerid,
        klassenid: req.body.klassenid
    });
    lehrer
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Ein neuer Lehrer wurde eingestellt',
                erstellteLehrer: {
                    vorname: result.vorname,
                    nachname: result.nachname,
                    plz: result.plz,
                    fachid: result.fachid,
                    schuelerid: result.schuelerid,
                    klassenid: result.klassenid
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

exports.lehrer_get_lehrer = (req, res, next) => {
    const lehrerId = req.params.lehrerId;
    Lehrer.findById(lehrerId)
        .select('_id vorname nachname plz fachid schuelerid klassenid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    lehrer: doc
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

exports.lehrer_update_lehrer = (req, res, next) => {
    const id = req.params.lehrerId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Lehrer.update({_id: id}, { $set: updateOps })
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

exports.lehrer_delete = (req, res, next) => {
    Lehrer
        .remove({ _id: req.params.lehrerId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Lehrer gekündigt!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/lehrer/",
                    body: {lehrerId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
