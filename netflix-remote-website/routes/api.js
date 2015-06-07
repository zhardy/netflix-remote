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
			console.log('good');
			res.send('Good!');
		},
		function (error){
			console.log('problem');
			res.send('problem');
		});
});

module.exports = router;
