var Directory = require('../lib/').Directory;
exports.routes = ([
    {
        method: 'POST', path: '/directors', config: {
            handler: function() {
            	var request = this;
            	var livestreamID = request.payload.livestream_id

            	Directory.livestreamRequest({ livestream_id: livestreamID }, function(err,getLivestreamRequest) {
            		if (err) throw err;
            		
                    Directory.add({full_name:getLivestreamRequest[0].full_name, dob:getLivestreamRequest[0].dob, favorite_camera: request.payload.favorite_camera, favorite_movies: request.payload.favorite_movies, livestream_ID: livestreamID}, function(err, addNewDirector) {
                    //        if (err) throw err;
                    //        request.reply(addNewDirector);
                    //        
                    })     
            	})
            }
        }
    },

    {
        method: 'GET', path: '/directors/list', config: {
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