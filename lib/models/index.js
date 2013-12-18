var Sequelize = require('sequelize');
//console.log("process.env.NODE_ENV: [" + process.env.NODE_ENV + "]");
var db_config_to_use = '';

switch (process.env.NODE_ENV) {
    case 'test':
        db_config_to_use = '../../config/database.test';
        break;
    case undefined:
    case 'production':
    case 'development':
        db_config_to_use = '../../config/database';
        break;
}
var dbconfig = require(db_config_to_use).config;
var dbname = dbconfig.db;
var dbhostname = dbconfig.hostname;
var dbport = dbconfig.port;
var dbuser = dbconfig.user;
var dbpassword = dbconfig.password;

var sequelize = new Sequelize(dbname, dbuser, dbpassword, {
    host: dbhostname,
    port: dbport,
    logging: false
});

//list all models that will be loaded
var models = [
    {
        name: 'Director',
        file: 'director'
    }
];

//load models dynamically
models.forEach(function(model) {
    module.exports[model.name] = sequelize.import(__dirname + '/' + model.file); 
});

exports.setupTables = function(done){

    var syncConfig = {};
        switch (process.env.NODE_ENV) {
            case 'test':
            syncConfig = { force: true };
            break;
    }

    sequelize.sync(syncConfig).success(function() {
        done()
    }).error(function(error) {
        console.log('Error during Models Sync(): ' + error)
    })
}

module.exports.sequelize = sequelize;