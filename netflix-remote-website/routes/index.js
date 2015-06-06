var express = require('express');
var router = express.Router();
var db = require('../lib/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.user;
	if(user){
		var movies = db.movies();
		movies.then( function (data){
			res.render('index', { title: 'Netflix Remote', movies : data });
		},
		function (reject){
			res.redirect('error', {message : reject});
		});
	}
  	else{
  		res.redirect('/login');
  	}
});

router.get('/logout', function(req, res){
	var user = req.session.user;
	if(user){
		delete req.session.user;
		res.redirect('/');
	}
});

module.exports = router;
