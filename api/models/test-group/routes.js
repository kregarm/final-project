const server = require('../../server').server;
const mongoose = require('mongoose');
const multer = require('multer');
const mime = require('mime');



module.exports = function () {

    server.post('/api/test-group', function (req, res) {

        console.log(req.body);

            var data = req.body;

            const Group = mongoose.model('test-group');
            const group = new Group(data);

            group.save(function (err, doc) {

                if (!err) {

                    res.status(200).send(doc);

                } else {

                    res.status(400).send(err);

                }

            })
    });

    server.get('/api/test-group', function (req, res) {

        const testGroup = mongoose.model('test-group');

        testGroup.find({})
            .populate('Project')
            .exec(function (err, docs) {
                res.send(docs);
                console.log(docs);
            });
    });

    server.get('/api/test-group/:projectId', function (req, res) {

        const testGroup = mongoose.model('test-group');
        const projectId = req.params.projectId;

        testGroup.find({"Project" : projectId })
            .exec(function (err, docs) {
                res.send(docs);
                console.log(docs);
            });
    });

    server.delete('/api/test-group/:groupId', function (req, res) {

        const testGroup = mongoose.model('test-group');
        const groupId = req.params.groupId;

        testGroup.findByIdAndRemove(req.params.groupId, function (err, docs) {

            if (!err) {

                res.status(200).send(docs);

            } else {

                res.status(400).send(err);

            }

        });

    });

    server.put('/api/test-group/:groupId', function (req, res) {

        var data = req.body;

        const testGroup = mongoose.model('test-group');

        const groupId = req.params.groupId;

        testGroup.findByIdAndUpdate(groupId, data, {new: true}, function (err, docs) {

            if (!err) {
                res.status(200).send(docs);
            } else {
                res.status(400).send(err);
            }


        });

    });
};