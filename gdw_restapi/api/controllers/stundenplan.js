const mongoose = require('mongoose');

// Schema - Tabelle.
const Stundenplan = require('../models/stundenplan');

exports.stundenplan_get_all = (req, res, next) => {
    Stundenplan
        .find()
        .select('_id fachid klassenid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Stundenplan: docs.map(doc => {
                    return {
                        _id: doc._id,
                        fachid: doc.fachid,
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

exports.stundenplan_create_stundenplan = (req, res, next) => {
    const stundenplan = new Stundenplan ({
        _id: new mongoose.Types.ObjectId(),
        fachid: req.body.fachid,
        klassenid: req.body.klassenid
    });
    stundenplan
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Der neue Stundenplan ist drin',
                angezeigterStundenplan: {
                    fachid: result.fachid,
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

exports.stundenplan_get_stundenplan = (req, res, next) => {
    const stundenplanId = req.params.stundenplanId;
    Stundenplan.findById(stundenplanId)
        .select('_id fachid klassenid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    stundenplan: doc
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

exports.stundenplan_update_stundenplan = (req, res, next) => {
    const id = req.params.stundenplanId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Stundenplan.update({_id: id}, { $set: updateOps })
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

exports.stundenplan_delete = (req, res, next) => {
    Stundenplan
        .remove({ _id: req.params.stundenplanId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Stundenplan gekillt!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/stundenplan/",
                    body: {stundenplanId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
