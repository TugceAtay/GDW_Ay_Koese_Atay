const mongoose = require('mongoose');

// Schema - Tabelle.
const Schule = require('../models/schule');

exports.schule_get_all = (req, res, next) => {
    Schule
        .find()
        .select('_id schulname adresse lehrerid schuelerid klassenid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Schulen: docs.map(doc => {
                    return {
                        _id: doc._id,
                        schulname: doc.schulname,
                        adresse: doc.adresse,
                        lehrerid: doc.lehrerid,
                        schuelerid:doc.schuelerid,
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

exports.schule_create_schule = (req, res, next) => {
    const schule = new Schule({
        _id: new mongoose.Types.ObjectId(),
        schulname: req.body.schulname,
        adresse: req.body.adresse,
        lehrerid: req.body.lehrerid,
        schuelerid: req.body.schuelerid,
        klassenid: req.body.klassenid
    });
    schule
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Die neue Schule wurde gegründet',
                erstellteSchule: {
                    schulname: result.schulname,
                    adresse: result.adresse,
                    lehrerid: result.lehrerid,
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

exports.schule_get_schule = (req, res, next) => {
    const schuleId = req.params.schuleId;
    Schule.findById(schuleId)
        .select('_id schulname adresse lehrerid schuelerid klassenid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    schule: doc
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

exports.schule_update_schule = (req, res, next) => {
    const id = req.params.schuleId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Schule.update({_id: id}, { $set: updateOps })
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

exports.schule_delete = (req, res, next) => {
    Schule
        .remove({ _id: req.params.schuleId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Schule gelöscht!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/schule/",
                    body: {schuleId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
