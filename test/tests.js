var assert = require("assert")
var directory = require("../lib/").Directory

describe('Livestream Tests', function(){
	before(function(done){
		var db = require('../lib/models');
		done()
	})

	describe('#check()',function(){
		it('should return an error if no livestream id is provided for the get request', function(done){
			var liveStreamID = 6488818
			var postItems = {livestream_id: liveStreamID}
			directory.check(postItems,function(err,directorCheck){
				assert(err == null);
                assert(directorCheck[0] !== undefined);
                assert(directorCheck[0].full_name !== undefined);
                assert(directorCheck[0].dob !== undefined);
                assert(directorCheck[0].livestream_ID !== undefined);
				done()
			})
		})
	})

	describe('#add()',function(){
		it('should return an error if the director is already in the system or if the db did not insert a record',function(done){

			var liveStreamID = 6488818
			var movies = "Star Wars, Indiana Jones"
			var camera = "35 MM 3D Sony"
			var postItems = {livestream_id: liveStreamID}
			directory.check(postItems,function(err,directorCheck){
				var director_details = {
					full_name: directorCheck[0].full_name,
					dob: directorCheck[0].dob,
					favorite_camera: camera,
					favorite_movies: movies,
					livestream_ID: directorCheck[0].livestream_ID
				}
				directory.add(director_details, function(err,newDirector){
					assert(err == null)
					assert(newDirector.dataValues !== undefined)
                	assert(newDirector.dataValues.full_name !== undefined)
                	assert(newDirector.dataValues.dob !== undefined)
                	assert(newDirector.dataValues.favorite_camera !== undefined)
                	assert(newDirector.dataValues.favorite_movies !== undefined)
                	assert(newDirector.dataValues.livestream_ID !== undefined)
                	assert(newDirector.dataValues.id !== undefined)
					done()
				})

			})
		})
	})
	describe('#update()',function(done){
		//it('should return an error if user is not authenticated',function(done){

		//})
		it('should return an error if director is not already in the database',function(done){

		})
		it('should return an error if director information (dob and full name) is different from whats in the database, only movie and camera can change',function(done){

		})
	})
	describe('#list()',function(done){
		it('should return an error if no directors are in the database', function(done){

		})
	})
})