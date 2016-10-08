const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    testCaseName    : String,
    instruction     : String,
    image           : String,
    companyAccount  : { type:String, ref:'company-account' },
    dateCreated     : { type:Date, default: Date.now }
});

mongoose.model('test-case', Schema);