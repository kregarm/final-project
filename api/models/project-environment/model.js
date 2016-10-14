const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    environmentType : String,
    URL             : String,
    username        : String,
    password        : String,
    description     : String,
    Project         : { type: Object, ref:'project' }
});

mongoose.model('project-environment', Schema);