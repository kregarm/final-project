'use strict';

const mongoose = require('mongoose');
const _         = require('lodash');
const aclList = require('../../config/acl').list;
const UrlPattern = require('url-pattern');

module.exports = (req, res, next)=>{

    const AccountModel = mongoose.model('Account');

    const token = req.headers.authorization;

    console.log(token);

    AccountModel.findOne({'tokens.value':token})
        .then((doc)=>{

            const isAllowed = checkAccess(req, doc);


            if(!doc){
                console.log('Failed');
                next('Failed');
            }else if(isAllowed) {
                req.account = doc;
                next();
            }else{
                next('Not allowed');
            }

        })
        .catch((err)=>{
            next('Not allowed');
        });

};

/**
 * Method that checks if the account has permission to request this resource with this method
 * @param req expects the request to check method, and path
 * @param accountDoc expects account document to get the role
 * @returns {boolean}
 */
function checkAccess(req, accountDoc){

    const method = req.method.toLowerCase();
    const path  = req.path;
    const role  = accountDoc.role;

    console.log('method', method);
    console.log('path', path);
    console.log('role', role);

    let allowed = false;

    _.each(aclList, (aclItem, i)=>{

        const pattern = new UrlPattern(aclItem.path);
        const match = pattern.match(path);

        if(match){

            _.each(aclItem.roles, (_role, j)=>{

                if(_role.type === role){

                    _.each(_role.methods, (_method, k)=>{

                        if(_method === method.toLowerCase()){
                            allowed = true;
                        }

                    });

                }

            });

        }

    });

    return allowed;

}