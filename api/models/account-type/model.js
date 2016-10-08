const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    type: [String]
});

mongoose.model('account-type', Schema);