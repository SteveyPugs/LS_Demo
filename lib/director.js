var internals = {};
var request = require('request');

internals.data = require('./models');

var director = {};

director.add = function(input, callback) {
	var errorMessages = [];
	var req = this
	var directorResponse 
	var apiURL = "https://api.new.livestream.com/accounts/" + req.payload.livestream_id

	request(apiURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			directorResponse = JSON.parse(body);

			internals.data.Director.create({ full_name: directorResponse.full_name, dob: directorResponse.dob, favorite_camera: req.payload.favorite_camera, favorite_movies: req.payload.favorite_movies, livestream_ID: directorResponse.id}).success(function(newDirector) {
				callback(newDirector)
			}).error(function(error) {
				errorMessages.push("Insert Director Error");
				callback(new Error(errorMessages))
		  	})
		}
	})
}

director.update = function(input, callback) {
	callback(new Error("not yet implemented"))
}

director.list = function(input, callback) {
	callback(new Error("not yet implemented"))
}

module.exports = director;