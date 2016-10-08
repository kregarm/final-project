/**
 * Created by martinkregar on 07/10/16.
 */
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name      : String,
    testCase  : { type : Object, ref:'test-case' },
    project   : { type: Number, ref:'project'}
});

mongoose.model('test-group', Schema);