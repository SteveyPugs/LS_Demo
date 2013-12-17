var internals = {};
var request = require('request');

internals.data = require('./models');

internals.add = function(input, callback) {
	var errorMessages = [];
	
	internals.data.Director.create({ full_name: input.full_name, dob: input.dob, favorite_camera: input.favorite_camera, favorite_movies: input.favorite_movies, livestream_ID: input.livestream_ID})
		.success(function(newDirector) {
		callback(null, newDirector)
 		})
		.error(function(error) {
 			errorMessages.push("Insert Director Error")
			callback(new Error(errorMessages))
 		})
}

internals.livestreamRequest = function(input, callback) {
	var liveStreamResponse
	if (input.livestream_id !== undefined){
		var apiURL = "https://api.new.livestream.com/accounts/" + input.livestream_id

		request(apiURL, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				liveStreamResponse = JSON.parse(body);
				var output = [];
				var output_single = {};
				output_single.full_name = liveStreamResponse.full_name;
				output_single.dob = liveStreamResponse.dob;
				output_single.livestream_ID = liveStreamResponse.id;
				output.push(output_single);
				callback(null, output);
			}
		})
	}
	else{
		callback("No Livestream ID passed", null)
	}
}

internals.update = function(input, callback) {
	callback(new Error("not yet implemented"))
}

internals.list = function(input, callback) {
	internals.data.Director.findAll().success(function(directorList) {

		var output = [];
        var total_count = directorList.length;
        
        for (var i = 0; i < total_count; i++) {
                var output_single = {};

                output_single.full_name = directorList[i].full_name;
                output_single.dob = directorList[i].dob;
                output_single.favorite_camera = directorList[i].favorite_camera;
                output_single.favorite_movies = directorList[i].favorite_movies;
                output_single.livestream_ID = directorList[i].livestream_ID;
                output_single.id = directorList[i].id;
                output_single.createdAt = directorList[i].createdAt;
                output_single.updatedAt = directorList[i].updatedAt;
                
                output.push(output_single);
        }
        
        callback(null, output);
	}).error(function(error) {
		errorMessages.push("Director List Error");
		callback(new Error(errorMessages))
	})
}

exports.livestreamRequest = internals.livestreamRequest;
exports.add = internals.add;
exports.update = internals.update;
exports.list = internals.list;
