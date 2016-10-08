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

        console.log('received');

        const testGroup = mongoose.model('test-group');

        testGroup.find({})
            .populate('Project')
            .exec(function (err, docs) {
                res.send(docs);
                console.log(docs);
            });
    });
};