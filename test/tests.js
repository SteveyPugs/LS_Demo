var Hapi = require('hapi');
var server = new Hapi.Server();
var serverroutes = require('../lib/routes');
server.route(serverroutes.routes) 

var assert = require("assert")
var request = require('request');

describe('Livestream Test API', function(){

	before(function(done) {
		var virt_modules = [];
		var db = require('../lib/models');
		db.init(virt_modules, function() {
			done();
		});
	})

	describe('#check request()', function() {
		it('if there is an livestream id present then it should return a data object with director information', function(done) {
			
			var req = {
		        method: 'post',
		        url: '/directors'
		    };
		    console.log(req)
			server.inject(req, function (res) {
			//    console.log(res.statusCode);
			    done()
			})
			
	// 		var director_id = 6488818
 //        	var favorite_camera = "35mm"
 //        	var favorite_movies = "Star Wars, Indiana Jones"
 //        	request.post("http://localhost:4662/directors", {form:{livestream_id: director_id, favorite_camera: favorite_camera, favorite_movies: favorite_movies}})
 //        	//console.log(body)
 //            //Directors.Director.add({ livestream_id: director_id, favorite_camera: favorite_camera, favorite_movies: favorite_movies} , function(err, director) {
	// 		//	assert(err.length == undefined);
	// 			done();
	// 		//})
         })
	})

	// describe('#add()', function() {
	// // 	it('should return the a new director registration object after adding it to the database.', function(done) {
	// // 		var director_id = 6488818
 // //        	var favorite_camera = "35mm"
 // //        	var favorite_movies = "Star Wars, Indiana Jones"
 // //        	request.post("http://localhost:4662/directors", {form:{livestream_id: director_id, favorite_camera: favorite_camera, favorite_movies: favorite_movies}})
 // //        	//console.log(body)
 // //            //Directors.Director.add({ livestream_id: director_id, favorite_camera: favorite_camera, favorite_movies: favorite_movies} , function(err, director) {
	// // 		//	assert(err.length == undefined);
	// // 			done();
	// // 		//})
 // //        })
	// })
	// describe('#list()', function() {
	// 	it('should return a list of directors from the newly created database registrations.', function(done) {
	// 		Directors.Director.list({}, function(err, director) {
	//  			done();
	//         })
	// 	})

	// })
})