var internals = {};
var request = require('request');

models = require('./models');

internals.check = function(input,callback){
	//console.log(input)
	if (input == undefined){
		callback(new Error("No LiveStream ID was provided"))
	}
	else{
		request("https://api.new.livestream.com/accounts/" + input.livestream_id,function(e,r,b){
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
	callback(new Error("nNothing Here Yet"))
}

internals.list = function(input,callback){
	callback(new Error("nNothing Here Yet"))
}
exports.check = internals.check
exports.add = internals.add
exports.update = internals.update
exports.list = internals.list




// internals.update = function(input, callback) {
// 	callback(new Error("not yet implemented"))
// }

// internals.list = function(input, callback) {
// 	internals.data.Director.findAll().success(function(directorList) {

// 		var output = [];
//         var total_count = directorList.length;
        
//         for (var i = 0; i < total_count; i++) {
//                 var output_single = {};

//                 output_single.full_name = directorList[i].full_name;
//                 output_single.dob = directorList[i].dob;
//                 output_single.favorite_camera = directorList[i].favorite_camera;
//                 output_single.favorite_movies = directorList[i].favorite_movies;
//                 output_single.livestream_ID = directorList[i].livestream_ID;
//                 output_single.id = directorList[i].id;
//                 output_single.createdAt = directorList[i].createdAt;
//                 output_single.updatedAt = directorList[i].updatedAt;
                
//                 output.push(output_single);
//         }
        
//         callback(null, output);
// 	}).error(function(error) {
// 		errorMessages.push("Director List Error");
// 		callback(new Error(errorMessages))
// 	})
// }

// exports.update = internals.update;
// exports.list = internals.list;
