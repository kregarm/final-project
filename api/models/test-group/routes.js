const server = require('../../server').server;
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');



module.exports = function () {

    server.post('/api/test-group', function (req, res) {

        req.checkBody('name', 'Name is required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {

            return res.status(400).send(errors);

        } else {

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

        }
    });

};