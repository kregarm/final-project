const server = require('../../server').server;
const mongoose = require('mongoose');
const mime = require('mime');
const auth = require('../../helpers/auth/middleware');

module.exports = function () {

    server.post('/api/test-case', auth, function (req, res) {

        req.checkBody('testCaseName', 'Name is required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {

            return res.status(400).send(errors);

        } else {

            var data = req.body;

            const TestCase = mongoose.model('test-case');
            const testCase = new TestCase(data);

            testCase.save(function (err, doc) {

                if (!err) {
                    console.log(doc);
                    res.status(200).send(doc);

                } else {

                    res.status(400).send(err);

                }

            })

        }
    });

    server.put('/api/test-case/:testCaseId', auth, function (req, res) {

        var data = req.body;

        const TestCase = mongoose.model('test-case');

        TestCase.findByIdAndUpdate(req.params.testCaseId, data, {new:true}, function (err, doc) {

            if (!err) {

                doc.save(function (err, doc) {
                    if (!err) {

                        res.status(200).send(doc);

                    } else {

                        res.status(400).send(err);

                    }
                })

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.get('/api/test-cases-group/:testGroupId', auth, function (req, res) {

        const TestCase = mongoose.model('test-case');

        groupId = req.params.testGroupId;

        TestCase.find({'testGroup' : groupId}, function (err, docs) {

            if (!err) {
                console.log(docs);

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.get('/api/test-cases-project/:projectId', auth, function (req, res) {

        const TestCase = mongoose.model('test-case');

        projectsId = req.params.projectId;

        TestCase.find({'Project' : projectsId}, function (err, docs) {

            if (!err) {

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.get('/api/test-case/:testCaseId', auth, function (req, res) {

        const TestCase = mongoose.model('test-case');

        const caseId = req.params.testCaseId;

        TestCase.findById(caseId, function (err, docs) {

            if (!err) {
                console.log(docs);

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.delete('/api/test-case/:testCaseId', auth, function (req, res) {

        const TestCase = mongoose.model('test-case');

        TestCase.findByIdAndRemove(req.params.testCaseId, function (err, docs) {

            if (!err) {

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });
};