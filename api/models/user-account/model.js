const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    fullName        : String,
    password        : String,
    accountType     : { type:String, ref:'user-account-types' },   //company-admin, admin, dev, tester, zaradi omejitev dostopa
    companyAccount  : { type:String, ref:'company-account' },
    image           : String,
    position        : String,    //za prikaz: "teser, developer, JS dev, ..."
    about           : String,
    tokens          : [{
        value   :String,
        expires :
        {
            type    : Date,
            default : function(){
                return +new Date()+1000*60*60*2;
            }}
    }]

    });

mongoose.model('user-account', Schema);