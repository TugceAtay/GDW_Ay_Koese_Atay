const mongoose = require('mongoose');

// Schema - Tabelle.
const Schueler = require('../models/schueler');

exports.schueler_get_all = (req, res, next) => {
    Schueler
        .find()
        .select('_id vorname nachname plz fachid lehrerid klassenid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Schueler: docs.map(doc => {
                    return {
                        _id: doc._id,
                        vorname: doc.vorname,
                        nachname: doc.nachname,
                        plz: doc.plz,
                        fachid: doc.fachid,
                        lehrerid:doc.lehrerid,
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

exports.schueler_create_schueler = (req, res, next) => {
    const schueler = new Schueler ({
        _id: new mongoose.Types.ObjectId(),
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        plz: req.body.plz,
        fachid: req.body.fachid,
        lehrerid: req.body.lehrerid,
        klassenid: req.body.klassenid
    });
    schueler
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Der neue Schüler ist drin',
                angezeigterSchueler: {
                    vorname: result.vorname,
                    nachname: result.nachname,
                    plz: result.plz,
                    fachid: result.fachid,
                    lehrerid: result.lehrerid,
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

exports.schueler_get_schueler = (req, res, next) => {
    const schuelerId = req.params.schuelerId;
    Schueler.findById(schuelerId)
        .select('_id vorname nachname plz fachid lehrerid klassenid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    schueler: doc
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

exports.schueler_update_schueler = (req, res, next) => {
    const id = req.params.schuelerId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Schueler.update({_id: id}, { $set: updateOps })
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

exports.schueler_delete = (req, res, next) => {
    Schueler
        .remove({ _id: req.params.schuelerId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Schüler gekillt!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/schueler/",
                    body: {schuelerId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
