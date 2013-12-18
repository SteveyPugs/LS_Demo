var Hapi = require('hapi'),
    options = { cors: true };

var masterConfig = require('./config/config');
var server = new Hapi.Server(masterConfig.config.hostname, masterConfig.config.port, options);
var serverroutes = require('./lib/routes');

server.route(serverroutes.routes) 

var virt_modules = [];

var db = require('./lib/models');
console.log('database setup complete');
server.start();
console.log('Server up at ' + server.info.uri + ' !');