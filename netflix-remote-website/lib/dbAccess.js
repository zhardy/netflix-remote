var pg = require('pg');
var squel = require("squel");
squel = squel.useFlavour('postgres');
var Promise = require('promise');

var conString = "postgres://zhardy:password@localhost/netremote";


//psql -h localhost -d netremote --u zhardy

var databaseConnectionError = "Error connecting with database";
var databaseInteractionError = "Error interacting with database";
var test = 'eggs';

var testing = ['http://www.netflix.com/WiPlayer?movieid=60033311', 'http://www.netflix.com/WiPlayer?movieid=261909&trkid=13466331', 'http://www.netflix.com/WiPlayer?movieid=563104', 'http://www.netflix.com/WiPlayer?movieid=555221']
//50 first dates, Annie Hall, Groundhog Day, the Graduate




var db = {

	checkExists: function(username){

		var checkExistsError = " while checking if the username exists";
		var promise = new Promise( function (resolve ,reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + checkExistsError);
				}
				else{

					var sq = squel.select().from('users').field('uID').where('username=$1').toString();
					client.query(sq, [username], function (dbErr, result){
						if(dbErr){
							console.log(dbErr);
							reject(databaseInteractionError + checkExistsError);
						}
						else{
							if(result.rows.length > 0){
								resolve(result.rows[0].uid);
							}
							else{
								reject(undefined);
							}
						}
					});
				}
			});
		});
		return promise;
	},


	addUser: function (username){
		var addUserError = " while adding a new user";
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done) {
				if(connErr){
					reject(databaseConnectionError + addUserError);
				}
				else{
					client.query("INSERT INTO users VALUES ($1) RETURNING uid", [username], function (dbErr, result){
						if(dbErr){
							reject(databaseInteractionError + addUserError);
						}
						else{
							done();
							resolve(result.rows[0].uid);

						}
					});
				}
			});
		});
		return promise;
	},

	addPassword: function (password, uid){
		var addPasswordError = " while adding a password";
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + addPasswordError);
				}
				else{
					client.query("INSERT INTO passwords (uid, password) VALUES ($1, $2)", [uid, password], function (dbErr, result){
						if(dbErr){
							reject(databaseInteractionError + addPasswordError);
						}
						else{
							done();
							resolve(true);
						}
					});
				}
			});
		});
		return promise;
	},

	getMovies: function (){
		var movieError = " while getting movies";
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + movieError);
				}
				else{
					client.query("SELECT * FROM movies", function (dbErr, result){
						if(dbErr){
							reject(databaseInteractionError + movieError);
						}
						else{
							done();
							resolve(result.rows);
						}
					});
				}
			});
		});
		return promise;
	},

	makePlaylist: function (title){
		var makePlaylistError = " while making a playlist";
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + makePlaylistError);
				}
				else{
					client.query("INSERT INTO playlists VALUES ($1) RETURNING playID", [title], function (dbErr, result){
						if(dbErr){
							reject(databaseInteractionError + makePlaylistError);
						}
						else{
							done();
							resolve(result.rows[0].playid);
						}
					});
				}
			});
		});
		return promise;
	},

	connectPlaylistNodes: function (order, nodeID, playID, callback){
		var connectingNodesError = " while connecting the playlist nodes";
		pg.connect(conString, function (connErr, client, done){
			if(connErr){
				callback(datbaseConnectionError + connectingNodesError);
			}
			else{
				client.query("INSERT INTO playlistsnode VALUES ($1, $2, $3)", [order, playID, nodeID], function (dbErr, result){
					if(dbErr){
						callback(databaseInteractionError + connectingNodesError);
						}
					else{
						done();
						callback(undefined, true);
					}
				});
			}
		});
	},

	connectUserPlaylist: function (userID, playID){
		var connectUserPlaylistError = " while connecting the user to the playlist";
		var promise = new Promise(function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + connectUserPlaylistError);
				}
				else{
					client.query("INSERT INTO userplaylists VALUES ($1, $2)", [userID, playID], function (dbErr, result){
						if(dbErr){
							reject(databaseInteractionError + connectUserPlaylistError);
						}
						else{
							done();
							resolve(true);
						}
					});
				}
			});
		});
		return promise;
	},


	checkPassword: function (uID, password){
		var checkPasswordError = " while checking password";
		var promise = new Promise(function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + checkPasswordError);
				}
				else{
					client.query("SELECT password FROM passwords WHERE uID=($1)", [uID], function (dbErr, result){
						if(dbErr){
							reject(databaseInteractionError + checkPasswordError);
						}
						else{
							done();
							if(result.rows.length > 0){
								result.rows[0].password === password ? resolve(true) : resolve(false);
								}
							}
						});
					}
				});
			});
		return promise;
	},

	getPlaylists: function(uID){
		var getPlaylistsError = " while getting the users playlists";
		var promise = new Promise(function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + getPlaylistsError)
				}
				else{
					client.query("SELECT P.name FROM playlists P, userplaylists Z, users U WHERE U.uid = Z.uid AND P.playid = Z.playid AND U.uid =($1)", [uID], function (dbErr, result){
						if(dbErr){
							reject(databaseInteractionError + getPlaylistsError);
						}
						else{
							done();
							resolve(result.rows);
						}
					});
				}

			})
			});
		return promise;
	}

}








module.exports = db;