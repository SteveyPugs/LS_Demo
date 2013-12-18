var Hapi = require('hapi'),
    options = { cors: true };

var masterConfig = require('./config/config');
var server = new Hapi.Server(masterConfig.config.hostname, masterConfig.config.port, options);
var Directory = require('./lib/').Directory;
server.route([
    {
         method: 'POST', path: '/directors', config: {
             handler: function() {
             	var request = this;
             	var liveStreamID = request.payload.livestream_id
             	var camera = request.payload.favorite_camera
             	var movies = request.payload.favorite_movies
             	Directory.check(liveStreamID,function(err,directorCheck){
             		if (err){
     					request.reply(err);
     				}
     				else{
     					if (directorCheck.length >= 1){
	             			Directory.add({full_name:directorCheck[0].full_name, dob:directorCheck[0].dob, favorite_camera: camera, favorite_movies: movies, livestream_ID: liveStreamID}, function(err, directorAdded) {
	             				if (err){
	             					request.reply(err);
	             				}
	             				else{
	             					request.reply(directorAdded);
	             				}
	             				
	             			})
						}
     				}
             	})
         	}
    	}
    },
    {
         method: 'POST', path: '/director/update', config: {
             handler: function() {
             	var request = this;

             	var fullName = request.payload.full_name
             	var camera = request.payload.favorite_camera
             	var movies = request.payload.favorite_movies

             	var fieldsToUpdate = new Object()
             	fieldsToUpdate.full_name = fullName
             	
				if (camera.length >= 1){
					fieldsToUpdate.favorite_camera = camera
				}
				if (movies.length >= 1){
					fieldsToUpdate.favorite_movies = movies
				}

             	Directory.update(fieldsToUpdate, function(err,updatedDirector){
             		if (err){
     					request.reply(err);
     				}
     				else{
     					request.reply(fullName + " was updated");
     				}
             	})
         	}
    	}
    },
    {
        method: 'GET', path: '/directors', config: {
            handler: function() {
            	var request = this;
                Directory.list({ }, function(err, getAllDirectors) {
                    if (err) throw err;
                    request.reply(getAllDirectors);
                })     
            }
        }
    }
]) 

var db = require('./lib/models');
db.setupTables(function(){
    console.log('database setup complete');
    server.start()
    console.log('Server up at ' + server.info.uri + ' !');
})