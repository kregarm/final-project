const server = require('../../server').server;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const randToken = require('rand-token');
const acl = require('../../config/acl');
const auth = require('../../helpers/auth/middleware');

const AccountModel = mongoose.model('Account');


module.exports = function () {

    server.post('/api/account/login', function (req, res) {

        req.checkBody('email', 'Not a valid email').isEmail();
        req.checkBody('password', 'Not a valid password').notEmpty().isLength({min:8});

        var errors = req.validationErrors();
        if(errors) return res.send(errors, 400);

        AccountModel.findOne({email:req.body.email})
            .then(function (doc) {
                if(!doc){
                    res.status(401).send("Failed");
                }else{

                    bcrypt.compare(req.body.password, doc.password, function (err, match) {
                        if(match){
                            const token = randToken.generate(255);
                            doc.tokens.push({
                                value:token
                            });
                            doc.save()
                                .then(function () {
                                    res.send({
                                        token: token,
                                        email: doc.email
                                    })
                                })
                                .catch(function (err) {
                                    res.status(400).send(err);
                                })

                        }else{
                            res.status(401).send("Failed");
                        }
                    })

                }
            })
            .catch(function (err) {

            })
    });

    server.put('/api/account', function (req, res) {

    });

    server.post('/api/account/checkLogin', auth, function (req, res) {

        console.log(req.account.role);

        const permissions = acl.getPermissionsForRole(req.account.role);
        res.send(permissions);

    });

    server.post('/api/account', function (req, res) {

        req.checkBody('email', 'Not a valid email').isEmail();
        req.checkBody('password', 'Not a valid password').notEmpty().isLength({min:8});

        var errors = req.validationErrors();
        if(errors) return res.send(errors, 400);

        bcrypt.genSalt(10, function (err, salt) {

            if(!err) {

                bcrypt.hash(req.body.password, salt, function (err, hash) {

                    const token = randToken.generate(255);

                    var newAccount = AccountModel({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        surname: req.body.surname,
                        tokens: [{value: token}]
                    });

                    newAccount.save()
                        .then(function () {
                            res.send({
                                token: token,
                                email: newAccount.email
                            })
                        })
                        .catch(function (err) {
                            res.status(400).send(err);
                        });
                });

            } else{
                res.status(400).send(err);
            };

        });


    });

    server.get('/api/account/logout', auth, function (req, res) {
        const accountId = req.account._id;
        const token = req.headers.authorization;

        AccountModel.findByIdAndUpdate(accountId, {
            $pull: {
                tokens: {value: token}
            }
        }, {new:true})
            .then((doc)=>{
                res.sendStatus(200);
            })
            .catch((err)=>{
                res.send(err, 400);
            });
    });

}