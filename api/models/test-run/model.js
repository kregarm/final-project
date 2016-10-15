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



/*

 <div ng-repeat="case in testRun.casesTested.testCase" class="test-case-margin">
 <div>
 <p class="test-case-name">{{case.testCaseName}}</p>
 </div>
 <h1>s</h1>
 </div>
 <form class="form-inline test-case-form">
 <div class="form-group">
 <input class="form-control test-case-form-input"  placeholder="Add a new test case" ng-model="testCase.testCaseName">
 <button type="submit" class="btn btn-xs btn-default" ng-click="createTestCase(group._id)">Add case</button>
 </div>
 </form>



 */