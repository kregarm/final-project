const server = require('../../server').server;
const mongoose = require('mongoose');
const mime = require('mime');

module.exports = function () {

    server.post('/api/test-run', function (req, res) {

        req.checkBody('testRunName', 'Name is required').notEmpty();
        req.checkBody('testGroups', 'Groups are required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {

            return res.status(400).send(errors);

        } else {

            var data = req.body;

            const TestRun = mongoose.model('test-run');
            const testRun = new TestRun(data);

            const TestCase = mongoose.model('test-case');

            testRun.save(function (err, run) {

                var runId = run._id;

                if (!err) {

                    for (var i = 0; i < run.testGroups.length; i++) {

                        TestCase.find({'testGroup': run.testGroups[i]}, function (err, doc) {

                            if (!err) {

                                var listOfCases = [];

                                for (var i = 0; i < doc.length; i++) {
                                    listOfCases.push('testCase:' + doc[i]._id);
                                };
                                    TestRun.findById(runId, function (err, run2) {

                                        run2.casesTested = listOfCases;
                                        run2.save(function (err, updatedRun) {
                                            console.log()
                                        })

                                    });



                            } else {

                                console.log(err);

                            }

                        });
                    };

                    //res.status(200).send(doc);

                } else {

                    res.status(400).send(err);

                }

            })

        }
    });

    /*server.put('/api/test-case/:testCaseId', function (req, res) {

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

     server.get('/api/test-cases-group/:testGroupId', function (req, res) {

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

     server.get('/api/test-cases-project/:projectId', function (req, res) {

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

     server.get('/api/test-case/:testCaseId', function (req, res) {

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

     server.delete('/api/test-case/:testCaseId', function (req, res) {

     const TestCase = mongoose.model('test-case');

     TestCase.findByIdAndRemove(req.params.testCaseId, function (err, docs) {

     if (!err) {

     res.status(200).send(docs);

     } else {

     res.status(400).send(err);

     }

     });

     });*/
};