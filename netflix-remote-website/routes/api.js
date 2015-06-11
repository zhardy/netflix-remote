var express = require('express');
var router = express.Router();
var db = require('../lib/index.js');

/* Post to Login */
router.post('/login', function(req, res, next) {
	username = req.body.username;
	password = req.body.password;

	check = db.check(username, password);
	check.then(
		function (user){

			playlists = db.playlists(user.uid);
			playlists.then( function (result){
					res.json({playlists: result});
				});
			},
			function (error){
				console.log(error);
			});
		},
		function (error){
			res.json({status: error.toString()});
		});
});



module.exports = router;
