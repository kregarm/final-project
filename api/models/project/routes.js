const server = require('../../server').server;
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

const upload = multer({storage: storage});

module.exports = function () {

    server.post('/upload', upload.single('file'), function (req, res) {

        res.send(req.file);

    });

    server.post('/api/project', function (req, res) {

        req.checkBody('projectName', 'Name is required').notEmpty();
        req.checkBody('projectDescription', 'Description is required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {

            return res.status(400).send(errors);

        } else {

            var data = req.body;

            const Project = mongoose.model('Project');
            const project = new Project(data);

            project.save(function (err, doc) {

                if (!err) {

                    res.status(200).send(doc);

                } else {

                    res.status(400).send(err);

                }

            })

        }
    });

    server.get('/api/project', function (req, res) {

        const Project = mongoose.model('Project');

        Project.find(function (err, docs) {

            if (!err) {

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

    server.put('/api/project/:projectId', function (req, res) {

        var data = req.body;
        var projectId = req.params.projectId;

        const Project = mongoose.model('Project');

        Project.findByIdAndUpdate(projectId, data, {new: true}, function (err, docs) {

            if (!err) {
                res.status(200).send(docs);
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

};