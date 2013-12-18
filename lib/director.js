var internals = {};
var request = require('request');
var mysql = require('mysql');
models = require('./models');

internals.check = function(input,callback){
	if (input == undefined){
		callback(new Error("No LiveStream ID was provided"))
	}
	else{
		request("https://api.new.livestream.com/accounts/" + input,function(e,r,b){
			if (!e && r.statusCode == 200) {
				response = JSON.parse(b);
				var output = [];
				var output_single = {};
				output_single.full_name = response.full_name;
				output_single.dob = response.dob;
				output_single.livestream_ID = response.id;
				output.push(output_single);
				callback(null, output);
			}
		})
	}
}

internals.add = function(input,callback){
	var query = {where:{livestream_ID: input.livestream_ID}}
	models.Director.findAndCountAll(query).success(function(registeredDirectors) {
		if (registeredDirectors.count >= 1){
			callback(new Error("Director Already Exists"))
		}
		else{
			models.Director.create({ full_name: input.full_name, dob: input.dob, favorite_camera: input.favorite_camera, favorite_movies: input.favorite_movies, livestream_ID: input.livestream_ID})
			.success(function(newDirector) {
				callback(null, newDirector);
			})
			.error(function(error){
				callback(new Error("Director Insert Error"))
			})
		}
	})
}

internals.update = function(input,callback){
	var query = {where:{full_name: input.full_name}}
	models.Director.findAndCountAll(query).success(function(registeredDirectors) {
		if (registeredDirectors.count >= 1){
			var idToUpdate = registeredDirectors.rows[0].dataValues.id
			var fieldsToUpdate = new Object()

			if (input.favorite_camera != undefined){
				fieldsToUpdate.favorite_camera = input.favorite_camera
			}
			if (input.favorite_movies != undefined){
				fieldsToUpdate.favorite_movies = input.favorite_movies
			}

			var size = 0
			var key
		    for (key in fieldsToUpdate) {
		        if (fieldsToUpdate.hasOwnProperty(key)) size++;
		    }
		  	if (size >= 1){
		  		models.Director.update(fieldsToUpdate,{id:idToUpdate})
				.success(function(){
					callback(null);
				})
				.error(function(error){
				 	callback(new Error("Director Update Error"))
				})
		  	}
		  	else{
		  		callback(new Error("No Fields to Update"))
		  	}
		}
		else{
			callback(new Error("Director Does Not Exist"))
		}
	})









	//callback(new Error("Nothing Here Yet"))
}

internals.list = function(input,callback){

	models.Director.findAll()
	.success(function(directorsList) {
		var output = [];
		var total_count = directorsList.length;
		for (var i = 0; i < total_count; i++) {
		 	var output_single = {};
		 	output_single.full_name = directorsList[i].full_name;
			output_single.dob = directorsList[i].dob;
			output_single.favorite_camera = directorsList[i].favorite_camera;
			output_single.favorite_movies = directorsList[i].favorite_movies;
			output_single.livestream_ID = directorsList[i].livestream_ID;
			output_single.id = directorsList[i].id;
			output_single.createdAt = directorsList[i].createdAt;
			output_single.updatedAt = directorsList[i].updatedAt;
			output.push(output_single);
		}
		callback(null, output);
	})
	.error(function(error){
		callback(new Error("Directory Listing Error"))
	})
}
exports.check = internals.check
exports.add = internals.add
exports.update = internals.update
exports.list = internals.list