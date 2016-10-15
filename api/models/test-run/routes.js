const server = require('../../server').server;
const mongoose = require('mongoose');
const mime = require('mime');
const _ = require('lodash');

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

                    /*for (var i = 0; i < run.testGroups.length; i++) {

                        TestCase.find({'testGroup': run.testGroups[i]}, function (err, doc) {

                            if (!err) {

                                var listOfCases = [];

                                for (var i = 0; i < doc.length; i++) {
                                    listOfCases.push('testCase:' + doc[i]._id);
                                };
                                    TestRun.findById(runId, function (err, run2) {

                                        run2.casesTested = listOfCases;
                                        run2.save(function (err, updatedRun) {
                                        })

                                    });



                            } else {

                                console.log(err);

                            }

                        });
                    };*/

                    const testGroups = data.testGroups;
                    
                    TestCase.find({ testGroup:{$in:testGroups}})
                        .then((docs)=>{
                            
                            console.log(docs);
                            
                            const runCases = docs.map((caseDoc)=>{
                               
                                return {
                                  testCase: caseDoc._id
                                };
                                
                            });

                            run.casesTested = runCases;

                            console.log(run);

                            run.save()
                                .then(()=>{
                                    console.log(run);
                                    res.status(200).send(run);
                                });

                        });

                } else {

                    res.status(400).send(err);

                }

            })

        }
    });

};