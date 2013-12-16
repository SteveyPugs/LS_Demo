var Directors = require('./lib');
var Hapi = Directors.Hapi,
    options = { cors: true };

var masterConfig = require('./config/config');
var serverConfig = masterConfig.config;
var server = new Hapi.Server(serverConfig.hostname, serverConfig.port, options);

var director = Directors.Director;
server.route([
        { method: "POST", path: "/directors", config: { handler: director.add}}
]);

var virt_modules = [];

var db = require('./lib/models');
db.init(virt_modules, function() {
    console.log('database setup complete');
    server.start();
    console.log('Server up at ' + server.info.uri + ' !');
});