const server = require('./server');
const database = require('./database');
//const config = require('./config');

function init() {

    database.connect()
        .then(server.init)
        .then(() => {
            require('./models')();
        })
        .catch((err)=>{
            console.log('Init error', err);
        });

}

init();