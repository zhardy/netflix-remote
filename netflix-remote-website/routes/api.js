var express = require('express');
var router = express.Router();
var db = require('../lib/index.js');

/* Post to Login */
router.post('/login', function(req, res, next) {
	console.log(req.toString());
	username = req.body.username;
	password = req.body.password;

	check = db.check(username, password);
	check.then(
		function (user){
			res.send('Good!');
		},
		function (error){
			res.send(error);
		});
});

module.exports = router;
