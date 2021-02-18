const mongoose = require('mongoose');

// Schema - Tabelle.
const Test = require('../models/test');

exports.test_get_all = (req, res, next) => {
    Test
        .find()
        .select('_id aufgabeid zeit lehrerid schuelerid')
        .exec()
        .then(docs => {
            res.status(200).json({
                Anzahl: docs.length,
                Test: docs.map(doc => {
                    return {
                        _id: doc._id,
                        aufgabeid: doc.aufgabeid,
                        zeit: doc.zeit,
                        lehrerid: doc.lehrerid,
                        schuelerid:doc.schuelerid
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

exports.test_create_test = (req, res, next) => {
    const test = new Test({
        _id: new mongoose.Types.ObjectId(),
        aufgabeid: req.body.aufgabeid,
        zeit: req.body.zeit,
        lehrerid: req.body.lehrerid,
        schuelerid: req.body.schuelerid
    });
    test
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Der neue Test wurde hinzugefügt',
                erstellteTest: {
                    aufgabeid: result.aufgabeid,
                    zeit: result.zeit,
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

exports.test_get_test = (req, res, next) => {
    const testId = req.params.testId;
    Test.findById(testId)
        .select('_id aufgabeid zeit lehrerid schuelerid')
        .exec()
        .then(doc => {
            console.log("Gefunden:", doc);
            if(doc) {
                res.status(200).json({
                    test: doc
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

exports.test_update_test = (req, res, next) => {
    const id = req.params.testId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.bspName] = ops.value;
    }
    Test.update({_id: id}, { $set: updateOps })
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

exports.test_delete = (req, res, next) => {
    Test
        .remove({ _id: req.params.testId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Test gelöscht!',
                request: {
                    type:'POST',
                    url: "http://localhost:3000/test/",
                    body: {testId: 'ID'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
