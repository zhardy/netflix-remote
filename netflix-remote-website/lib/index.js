var Promise = require('promise');
var db = require('./dbAccess.js');
var User = require('./user.js');

function new_user(username, password){
	var promise = new Promise(function (resolve, reject){
		var check = db.checkExists(username);
		check.then( function (ti){
			reject("A user with that name already exists!");
		},
		function (userExists){
			if(!userExists){
				var addU = db.addUser(username);
				addU.then( function (uID){
					var addP = db.addPassword(password, uID);
					addP.then( function (success){
						var user = new User(username, uID);
						resolve(user);
					},
					function (err){
						reject(err);
					});
				},
				function (addError){
					reject(addError);
				});
			}
		});
	});
	return promise;
}

function check(username, password){
	var promise = new Promise( function (resolve, reject){
		db.checkExists(username).then(
			function (uID){
				db.checkPassword(uID, password).then(
					function (validated){
						
						if(validated){
							var user = new User(username, uID);
							resolve(user);
						}
						else{
							reject("You could not be logged in. Try again!")
						}
					},

					function (passErr){
						reject(passErr);
					});
			},
			function (checkErr){
				reject(checkErr);
			}
		);
	});
	return promise;
}

function new_playlist(userID, title, nodeIDs){
	var promise = new Promise( function (resolve, reject){
		var play = db.makePlaylist(title);
		play.then(
			function (playID){
				var connectUser = db.connectUserPlaylist(userID, playID);
				connectUser.then(
					function (result){
						for(var i=0; i<nodeIDs.length; i++){
							var connectPlay = db.connectPlaylistNodes(i, nodeIDs[i], playID, function (err, result){
								if(err){
									reject(err);
								}
								else{
									resolve(playID);
								}
							});
						}
					},
					function (connectingUserError){
						reject(connectingUserError);
					});
			},
			function (makingPlaylistError){
				reject(makingPlaylistError);
			});
	});
	return promise;
}

function put_movies(array){
	var promise = new Promise ( function (resolve, reject){
		array.forEach( function (movie){
			db.createNode('m').then(
				function (result){
					db.insertMovie(movie.title, movie.link, result).then(
						function (nextResult){
							resolve(nextResult);
						},
						function (error){
							reject(error);
						});
				},
				function (error){
					reject(error);
				});
		});
	});
	return promise;
}

function movies(){
	var promise = new Promise ( function (resolve, reject){
		db.getMovies().then(
			function (result){
				resolve(result);
			},
			function (error){
				reject(error);
			});
		});
	return promise;
}

function playlists(userID){
	var promise = new Promise ( function (resolve, reject){
		db.getPlaylists(userID).then(
			function (result){
				resolve(result);
			},
			function (error){
				reject(error);
			});
		});
	return promise;
}

function get_playlist(userID, playID){
	var promise = new Promise ( function (resolve, reject){
		db.getPlaylistInfo(userID, playID).then (
			function (result){
				resolve(result);
			},
			function (error){
				reject(error);
			});
		});
	return promise;
}

exports.new_user 	 = new_user; 
exports.new_playlist = new_playlist;
exports.check 		 = check;
exports.movies 		 = movies;
exports.put_movies	 = put_movies;
exports.playlists 	 = playlists;
exports.get_playlist = get_playlist;