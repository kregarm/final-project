const mongoose = require('mongoose');

exports.connect = () => {

    return new Promise((resolve, reject)=>{

        mongoose.connect('mongodb://localhost/testing-app-db');

        mongoose.connection.on('error', (err) => {

            console.log('Mongo error', err);
            reject(err);

        });

        mongoose.connection.on('open', ()=>{

            resolve();

        });
    });
    
};