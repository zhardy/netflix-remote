var express = require('express');
var router = express.Router();
var db = require('../lib/index.js');

/* Post to Login */
router.post('/login', function(req, res, next) {
	username = req.body.username;
	password = req.body.password;
	res.json({status:'Good!'});
	// check = db.check(username, password);
	// check.then(
	// 	function (user){
	// 		console.log('good');
	// 		res.json({status:'Good!'});
	// 	},
	// 	function (error){
	// 		console.log('problem');
	// 		res.send('problem');
	// 	});
});

module.exports = router;
