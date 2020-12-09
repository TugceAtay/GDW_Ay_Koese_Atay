const mongoose = require('mongoose');

// Schema - Tabelle.
const Lernstoff = require('../models/lernstoff');

exports.lernstoff_get_all = (req, res, next) => {
    Lernstoff
        .find()
        .select('_id fachid klassenid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Lernstoff: docs.map(doc => {
                    return {
                        _id: doc._id,
                        fachid:doc.fachid,
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

exports.lernstoff_create_lernstoff = (req, res, next) => {
    const lernstoff = new Lernstoff({
        _id: new mongoose.Types.ObjectId(),
        fachid: req.body.fachid,
        klassenid: req.body.klassenid
    });
    lernstoff
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Neuer Lernstoff',
                erstellterLernstoff: {
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

exports.lernstoff_get_lernstoff = (req, res, next) => {
    const lernstoffId = req.params.lernstoffId;
    Lernstoff.findById(lernstoffId)
        .select('_id fachid klassenid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    lernstoff: doc
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

exports.lernstoff_update_lernstoff = (req, res, next) => {
    const id = req.params.lernstoffId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Lernstoff.update({_id: id}, { $set: updateOps })
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

exports.lernstoff_delete = (req, res, next) => {
    Lernstoff
        .remove({ _id: req.params.lernstoffId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Lernstoff weg bam!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/lehrer/",
                    body: {lernstoffId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
