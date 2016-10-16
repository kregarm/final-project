const server = require('../../server').server;
const mongoose = require('mongoose');
const auth = require('../../helpers/auth/middleware');


module.exports = function () {

    server.get('/api/project-environment', auth, function (req, res) {

        const ProjectEnvironment = mongoose.model('project-environment');

        ProjectEnvironment.find(function (err, docs) {

            if (!err) {

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.delete('/api/project-environment/:id', auth, function (req, res) {

        const ProjectEnvironment = mongoose.model('project-environment');

        ProjectEnvironment.findByIdAndRemove(req.params.id, function (err, docs) {

            if (!err) {

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.put('/api/project-environment/:id', auth, function (req, res) {

        req.checkBody('environmentType', 'Type is required').notEmpty();
        req.checkBody('URL', 'URL is required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {

            return res.status(400).send(errors);

        } else {

            var data = req.body;

            const ProjectEnvironment = mongoose.model('project-environment');

            ProjectEnvironment.findByIdAndUpdate(req.params.id, data, {new: true}, function (err, docs) {

                if (!err) {

                    res.status(200).send(docs);

                } else {

                    res.status(400).send(err);

                }

            });
        }

    });

    server.post('/api/project-environment', auth, function (req, res) {

        req.checkBody('environmentType', 'Type is required').notEmpty();
        req.checkBody('URL', 'URL is required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {

            return res.status(400).send(errors);

        } else {

            var data = req.body;

            const ProjectEnvironment = mongoose.model('project-environment');
            const projectEnvironment = new ProjectEnvironment(data);

            projectEnvironment.save(function (err, doc) {

                if (!err) {

                    res.status(200).send(doc);

                } else {

                    res.status(400).send(err);

                }

            });

        }

    });

    server.get('/api/project-environment/:id', auth, (req, res)=> {

        const envId = req.params.id;

        const ProjectEnvironment = mongoose.model('project-environment');

        ProjectEnvironment.findById(envId, function (err, doc) {

            if (!err) {

                res.status(200).send(doc);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.get('/api/project-environments/:projectId', auth, function (req, res) {

        const ProjectEnvironment = mongoose.model('project-environment');

        const projectId = req.params.projectId;

        ProjectEnvironment.find({'Project' : projectId}, function (err, docs) {

            if (!err) {

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }
        });

    });

}