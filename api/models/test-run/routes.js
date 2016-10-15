const server = require('../../server').server;
const mongoose = require('mongoose');
const mime = require('mime');
const _ = require('lodash');

var deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = function () {

    server.post('/api/test-run', function (req, res) {

        req.checkBody('testRunName', 'Name is required').notEmpty();
        req.checkBody('testGroups', 'Groups are required').notEmpty();

        console.log(req.body.testGroups);


        var errors = req.validationErrors();

        if (errors) {

            console.log(errors);
            return res.status(400).send(errors);

        } else {

            var data = req.body;

            const TestRun = mongoose.model('test-run');
            const testRun = new TestRun(data);

            const TestCase = mongoose.model('test-case');

            console.log('Should save');

            testRun.save(function (err, run) {

                var runId = run._id;

                if (!err) {

                    console.log('Should find');

                    const testGroups = data.testGroups;

                    TestCase.find({ testGroup:{$in:testGroups}})
                        .then((docs)=>{

                            const runCases = docs.map((caseDoc)=>{

                                return {
                                      testCase: caseDoc._id,
                                      comment: '',
                                      status: ''
                                };

                            });

                            run.casesTested = runCases;

                            run.save()
                                .then(()=>{
                                    res.status(200).send(run);
                                })

                        });

                } else {

                    res.status(400).send(err);

                }

            })

        }
    });

    server.get('/api/test-run/:testRunId', function (req, res) {

        const testRun = mongoose.model('test-run');

        const testRunId = req.params.testRunId;

        testRun.find({'_id':testRunId})
            .deepPopulate('casesTested.testCase testGroups')
            .exec(function (err, docs) {
                res.send(docs);
            });


    });

    server.get('/api/test-run-project/:projectId', function (req, res) {

        const testRun = mongoose.model('test-run');

        const projectId = req.params.projectId;

        testRun.find({'projectId':projectId})
            .exec(function (err, docs) {
                res.send(docs);
            });

    });

};