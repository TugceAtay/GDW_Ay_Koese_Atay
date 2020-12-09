const mongoose = require('mongoose');

// Schema - Tabelle.
const Fach = require('../models/fach');

exports.fach_get_all = (req, res, next) => {
    Fach
        .find()
        .select('_id fachname lernstoffid lehrerid schuelerid klassenid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Fach: docs.map(doc => {
                    return {
                        _id: doc._id,
                        fachname: doc.fachname,
                        lernstoffid: doc.lernstoffid,
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

exports.fach_create_fach = (req, res, next) => {
    const fach = new Fach({
        _id: new mongoose.Types.ObjectId(),
        fachname: req.body.fachname,
        lernstoffid: req.body.lernstoffid,
        lehrerid: req.body.lehrerid,
        schuelerid: req.body.schuelerid,
        klassenid: req.body.klassenid
    });
    fach
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Neuer Fach wird erstellt!',
                erstellerFaecher: {
                    fachname: result.fachname,
                    lernstoffid: result.lernstoffid,
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

exports.fach_get_fach = (req, res, next) => {
    const fachId = req.params.fachId;
    Fach.findById(fachId)
        .select('_id fachname lernstoffid lehrerid schuelerid klassenid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    fach: doc
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

exports.fach_update_fach = (req, res, next) => {
    const id = req.params.fachId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Fach.update({_id: id}, { $set: updateOps })
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

exports.fach_delete = (req, res, next) => {
    Fach
        .remove({ _id: req.params.fachId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Fach ciao!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/fach/",
                    body: {fachId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
