/**
 * Created by martinkregar on 07/10/16.
 */
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name      : String,
    Project   : { type : Object, ref:'Project'}
});

mongoose.model('test-group', Schema);