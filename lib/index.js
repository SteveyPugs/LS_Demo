var Directors = {};
module.exports = Directors;
Directors.Hapi = require('hapi');


var director = require('./director');
Directors.Director = director;

module.exports = Directors;