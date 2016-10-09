const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    testCaseName    : String,
    instruction     : String,
    image           : String,
    companyAccount  : { type:String, ref:'company-account' },
    Project         : { type:String, ref:'Project' },
    dateCreated     : { type:Date, default: Date.now },
    testGroup       : { type:String, ref:'test-group'}
});

mongoose.model('test-case', Schema);