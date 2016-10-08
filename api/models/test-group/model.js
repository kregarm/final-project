/**
 * Created by martinkregar on 07/10/16.
 */
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name      : String,
    testCase  : { type : Object, ref:'test-case' },
    Project   : { type : Object, ref:'Project'}
});

mongoose.model('test-group', Schema);