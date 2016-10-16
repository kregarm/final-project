const server = require('../../server').server;
const mongoose = require('mongoose');
const mime = require('mime');
const _ = require('lodash');
const auth = require('../../helpers/auth/middleware');

var deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = function () {

    server.post('/api/test-run', auth, function (req, res) {

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
                                      status: 'Not Tested',
                                      imageUrl: ''
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

    server.get('/api/test-run/:testRunId', auth, function (req, res) {

        const testRun = mongoose.model('test-run');

        const testRunId = req.params.testRunId;

        testRun.find({'_id':testRunId})
            .deepPopulate('casesTested.testCase testGroups')
            .exec(function (err, docs) {
                res.send(docs);
            });


    });

    server.get('/api/test-run-project/:projectId', auth, function (req, res) {

        const testRun = mongoose.model('test-run');

        const projectId = req.params.projectId;

        testRun.find({'projectId':projectId})
            .exec(function (err, docs) {
                res.send(docs);
            });

    });

    server.put('/api/test-case/:testCaseId/test-run/:testRunId', auth, function (req, res) {

        const testRun = mongoose.model('test-run');

        const testCaseId = req.params.testCaseId;

        console.log('Test case id: ', testCaseId);
        console.log('Test run id:',req.params.testRunId);
        console.log('Status: ',req.body.status);

        var testRunId = req.body.testRunId;

        testRun.findOneAndUpdate(
            {
                _id:req.params.testRunId,
                'casesTested._id':testCaseId
            },
            {
                $set:{ 'casesTested.$.status':req.body.status }
            },
            {
              new:true
            })
            .deepPopulate('casesTested.testCase testGroups')
            .then(
            function(doc){

                    res.send(doc);

            });

    });

}