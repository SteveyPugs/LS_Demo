var assert = require("assert")
var directory = require("../lib/").Directory

describe('Livestream Tests', function(){
	before(function(done){
		var db = require('../lib/models');
		done()
	})

	describe('#check()',function(){
		it('should return an error because livestream id is not provided', function(done){
			var postItems = {livestream_id: null}
			directory.check(postItems,function(err,directorCheck){
				assert(err !== null);
                assert(directorCheck == undefined);
				done()
			})
		})

		it('should return a director because livestream id was provided', function(done){
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
		var livestreamID_1 = 6488818
		var movies_1 = "Star Wars, Indiana Jones"
		var camera_1 = "35 MM 3D Sony"

		var livestreamID_2 = 6488819
		var movies_2 = null
		var camera_2 = null

		var livestreamID_3 = 6488820
		var movies_3 = null
		var camera_3 = "Panasonic SLR"

		var livestreamID_4 = 6488821
		var movies_4 = "GodFather. Rocky"
		var camera_4 = null

		it('should add new director w/ camera and movies',function(done){
			var postItems = {livestream_id: livestreamID_1}
			directory.check(postItems,function(err,directorCheck){
				var director_details = {
					full_name: directorCheck[0].full_name,
					dob: directorCheck[0].dob,
					favorite_camera: camera_1,
					favorite_movies: movies_1,
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

		it('should add new director w/o camera and movies',function(done){
			var postItems = {livestream_id: livestreamID_2}
			directory.check(postItems,function(err,directorCheck){
				var director_details = {
					full_name: directorCheck[0].full_name,
					dob: directorCheck[0].dob,
					favorite_camera: camera_2,
					favorite_movies: movies_2,
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

		it('should add new director w/o movies',function(done){
			var postItems = {livestream_id: livestreamID_3}
			directory.check(postItems,function(err,directorCheck){
				var director_details = {
					full_name: directorCheck[0].full_name,
					dob: directorCheck[0].dob,
					favorite_camera: camera_3,
					favorite_movies: movies_3,
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

		it('should add new director w/o camera',function(done){
			var postItems = {livestream_id: livestreamID_4}
			directory.check(postItems,function(err,directorCheck){
				var director_details = {
					full_name: directorCheck[0].full_name,
					dob: directorCheck[0].dob,
					favorite_camera: camera_4,
					favorite_movies: movies_4,
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

		it('should not add new director because they are registered',function(done){
			var postItems = {livestream_id: livestreamID_1}
			directory.check(postItems,function(err,directorCheck){
				var director_details = {
					full_name: directorCheck[0].full_name,
					dob: directorCheck[0].dob,
					favorite_camera: camera_1,
					favorite_movies: movies_1,
					livestream_ID: directorCheck[0].livestream_ID
				}
				
				directory.add(director_details, function(err,newDirector){
					assert(err !== null)
					assert(newDirector == undefined)
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