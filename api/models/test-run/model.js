const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    testRunName     : String,
    dateCreated     : { type:Date, default: Date.now },
    completed       : Boolean,
    companyAccount  : { type:String, ref:'company-account' },
    casesTested     : [
        {
            testCase:{ type:String, ref:'test-case' },
            comment: "String"
        }

    ]
});

mongoose.model('test-run', Schema);