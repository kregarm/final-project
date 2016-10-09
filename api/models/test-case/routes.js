const server = require('../../server').server;
const mongoose = require('mongoose');
const mime = require('mime');

module.exports = function () {

    server.post('/api/test-case', function (req, res) {

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

    server.get('/api/test-case/:testGroupId', function (req, res) {

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
                console.log(docs);

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.get('/api/project/:id', function (req, res) {

        const Project = mongoose.model('Project');
        const projectId = req.params.id;

        Project.findById(projectId, function (err, docs) {

            if (!err) {

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }
        })

    });

    server.put('/api/project/:id', function (req, res) {

        var data = req.body;

        const Project = mongoose.model('Project');

        Project.findById(req.params.id, function (err, doc) {

            if (!err) {

                doc.projectEnvironments.push(data);

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

    server.delete('/api/project/:id', function (req, res) {

        const Project = mongoose.model('Project');

        Project.findByIdAndRemove(req.params.id, function (err, docs) {

            if (!err) {

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.get('/api/project-environment/:envId', function (req, res) {

        const Project = mongoose.model('Project');

        const envId = req.params.envId;

        Project.findOne({"projectEnvironments.id" : envId },{'projectEnvironments.$': 1}, function (err, project) {
            if(!err){
                res.send(project.projectEnvironments[0]);
            } else{
                console.log(err);
            }
        })

    });

};