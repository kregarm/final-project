const mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);


const Schema = new mongoose.Schema({
    testRunName     : String,
    projectId       : String,
    dateCreated     : { type:Date, default: Date.now },
    completed       : Boolean,
    companyAccount  : { type:String, ref:'company-account' },
    testGroups      : [{ type:String, ref:'test-group'}],
    casesTested     : [
        {
            testCase    : { type:String, ref:'test-case' },
            status      : String,
            comment     : String
        }
    ]
});
Schema.plugin(deepPopulate);
mongoose.model('test-run', Schema);