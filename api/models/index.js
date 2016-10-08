module.exports = () => {

    require('./account-type/model');
    //require('./account-type/routes')();

    require('./company-account/model');
    //require('./company-account/routes')();

    require('./project/model');
    require('./project/routes')();

    require('./test-case/model');
    //require('./test-case/routes')();

    require('./test-run/model');
    //require('./test-run/routes')();

    require('./user-account/model');
    //require('./user-account/routes')();

    require('./test-group/model');
    require('./test-group/routes')();

};