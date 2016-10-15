const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    companyAccount      : { type:String, ref:'company-account' },
    projectName         : String,
    teamMembers         : [

        { type:String, ref:'user-account' }

    ],
    projectDescription  : String,
    projectImage        : String,
    projectTools: [
        {
            toolName: String,
            URL: String
        }
    ]
});

mongoose.model('Project', Schema);