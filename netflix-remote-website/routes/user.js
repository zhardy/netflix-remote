var express = require('express');
var router = express.Router();
var db = require('../lib/index.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/new', function (req, res, next){
	authmessage = req.flash('auth') || '';
	res.render('new_user', {message : authmessage});
});

router.post('/new', function (req, res, next){

	var username 	= req.body.username;
	var password 	= req.body.password;
	var secpassword = req.body.repassword;


	if(password != secpassword){
		res.render('new_user', {message : "Your passwords did not match"});
	}
	else{
		db.new_user(username, password).then(
			function (success){
				console.log(success);
				req.session.user = success;
				res.redirect('/');
			},
			function (reject){
				var message = reject;
				req.flash('auth', reject);
				res.redirect('/user/new');
			});
	}
});

module.exports = router;
