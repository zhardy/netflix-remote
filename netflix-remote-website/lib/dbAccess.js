var pg = require('pg');
var conString = "postgres://zhardy:password@localhost/netremote";
var Promise = require('promise');

//psql -h localhost -d netremote --u zhardy


var test = 'eggs';

var testing = ['http://www.netflix.com/WiPlayer?movieid=60033311', 'http://www.netflix.com/WiPlayer?movieid=261909&trkid=13466331', 'http://www.netflix.com/WiPlayer?movieid=563104', 'http://www.netflix.com/WiPlayer?movieid=555221']
//50 first dates, Annie Hall, Groundhog Day, the Graduate




var db = {

	checkExists: function(username){
		var promise = new Promise( function (resolve ,reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject("Error connecting to database while checking if the username exists");
				}
				else{
					client.query("SELECT uID FROM users WHERE username=($1)", [username], function (dbErr, result){
						if(dbErr){
							reject("Error interacting with the databases while checking if the username exists");
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
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done) {
				if(connErr){
					reject("Error connecting to the database while adding a new user");
				}
				else{
					client.query("INSERT INTO users VALUES ($1) RETURNING uid", [username], function (dbErr, result){
						if(dbErr){
							reject("Error interacting with the database while adding a new user");
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
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject("Error connecting to database while adding a password");
				}
				else{
					client.query("INSERT INTO passwords (uid, password) VALUES ($1, $2)", [uid, password], function (dbErr, result){
						if(dbErr){
							reject("Error interacting with database while adding a password");
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
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject("Error connecting with database");
				}
				else{
					client.query("SELECT * FROM movies", function (dbErr, result){
						if(dbErr){
							reject("Error interacting with database");
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
		var promise = new Promise( function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject("Error connecting with database");
				}
				else{
					client.query("INSERT INTO playlists VALUES ($1) RETURNING playID", [title], function (dbErr, result){
						if(dbErr){
							reject("Error interacting with database");
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
		pg.connect(conString, function (connErr, client, done){
			if(connErr){
				callback("Error connecting with database");
			}
			else{
				client.query("INSERT INTO playlistsnode VALUES ($1, $2, $3)", [order, playID, nodeID], function (dbErr, result){
					if(dbErr){
						callback(dbErr);
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
		var promise = new Promise(function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject("Error connecting with database");
				}
				else{
					client.query("INSERT INTO userplaylists VALUES ($1, $2)", [userID, playID], function (dbErr, result){
						if(dbErr){
							reject("Error interacting with database");
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
		var promise = new Promise(function (resolve, reject){
			pg.connect(conString, function (connErr, client, done){
				if(connErr){
					reject("Error connecting with database");
				}
				else{
					client.query("SELECT password FROM passwords WHERE uID=($1)", [uID], function (dbErr, result){
						if(dbErr){
							reject("Error interacting with database");
						}
						else{
							done();
							if(result.rows.length > 0){
								if(result.rows[0].password === password){
									resolve(true);
								}
								else{
									resolve(false);
									}
								}
							}
						});
					}
				});
			});
		return promise;
	}	

}








module.exports = db;