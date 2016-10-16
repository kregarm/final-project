const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    email:{type: String, unique: true},
    password: String,
    tokens: [
        {
            value: String,
            expires: { type: Date, default: function () {
                return +new Date()+1000*60*60*24*14;
            }}
        }
    ],
    role: {type: String, default:'user'},
    name: String,
    surname: String
});

mongoose.model('Account', Schema);