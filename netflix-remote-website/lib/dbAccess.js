var pg = require('pg');
var squel = require("squel");
squel = squel.useFlavour('postgres');
var Promise = require('promise');

var conString = "postgres://zhardy:password@localhost/netremote";


//psql -h localhost -d netremote --u zhardy

var databaseConnectionError = "Error connecting with database";
var databaseInteractionError = "Error interacting with database";


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
					var sq = squel.select()
									.from('users')
									.field('uID')
									.where('username=?', username).toString();
					client.query(sq, function (dbErr, result){
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
					var sq = squel.insert()
									.into('users')
									.set('username', username)
									.returning('uid').toString();
					console.log(sq);
					client.query(sq, function (dbErr, result){
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
					var sq = squel.insert()
									.into('passwords')
									.set('uid', uid)
									.set('password', password).toString();
					client.query(sq, function (dbErr, result){
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

	checkPassword: function (uID, password){
		var checkPasswordError = " while checking password";
		var promise = new Promise(function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + checkPasswordError);
				}
				else{
					var sq = squel.select()
									.from('passwords')
									.field('password')
									.where('uID=?', uID).toString();
					client.query(sq, function (dbErr, result){
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


	getMovies: function (){
		var movieError = " while getting movies";
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + movieError);
				}
				else{
					var sq = squel.select()// .field('*')
									.from('movies').toString();
					client.query(sq, function (dbErr, result){
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
					var sq = squel.insert()
									.into('playlists')
									.set('name', title)
									.returning('playID').toString();
					client.query(sq, function (dbErr, result){
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
				var sq = squel.insert()
								.into('playlistsnode')
								.set('position', order)
								.set('playID', playID)
								.set('nodeID', nodeID).toString();
				console.log(sq);
				client.query(sq, function (dbErr, result){
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
					var sq = squel.insert()
									.into('userplaylists')
									.set('uID', userID)
									.set('playID', playID).toString();
					client.query(sq, function (dbErr, result){
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

	getPlaylists: function(uID){
		var getPlaylistsError = " while getting the users playlists";
		var promise = new Promise(function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject(datbaseConnectionError + getPlaylistsError)
				}
				else{
					var sq = squel.select()
									.from('playlists', 'P')
									.from('userplaylists', 'Z')
									.from('users', 'U')
									.field('P.name')
									.field('P.playID')
									.where('U.uid = Z.uid')
									.where('P.playID = Z.playID')
									.where('U.uid=?', uid).toString();
					client.query(sq, function (dbErr, result){
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