const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

exports.server = server;

exports.init = function () {
    return new Promise(function (resolve, reject) {

        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({extended:true}));
        server.use(expressValidator());
        server.use(cors());
        server.listen(3011, function () {

            console.log('Server started');
            resolve();

        });
    });
};
