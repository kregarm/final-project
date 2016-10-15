'use strict';

let config;

if(process.env.NODE_ENV ==='production'){
    console.log('Production environment set');
    config = require('./config.prod');
} else if(process.env.NODE_ENV ==='development'){
    console.log('Development environment set');
    config = require('./config.dev');
} else {
    throw new Error('Missing NODE_ENV');
}

module.exports = config;