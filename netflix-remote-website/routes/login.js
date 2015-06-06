var express = require('express');
var router = express.Router();
var db = require('../lib/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var authmessage = req.flash('auth') || '';
	var user = req.session.user;
	if(user){
		res.redirect('/');
	}
  	else{	

  		res.render('login', {message : authmessage});
  	}
});

router.post('/', function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;
	db.check(username, password).then(
		function (user){
			console.log('something');
			req.session.user = user;
			res.redirect('/');
		},
		function (err){
			req.flash('auth', err); 
			res.redirect('/');
		});
});

module.exports = router;
