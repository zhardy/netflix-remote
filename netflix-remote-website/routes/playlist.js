var express = require('express');
var router = express.Router();
var db = require('../lib/index.js');
var test = 'eggs';

router.get('/', function (req, res){
	console.log('doesn\'t exist');
});

router.get('/new', function (req, res){
	user = req.session.user;
	if(user){
		var movies = db.movies();
		movies.then( function (data){

			res.render('new_playlist', { movies : data });
		},
		function (reject){
			res.redirect('error', {message : reject});
		});
	}
  	else{
  		res.redirect('/login');
  	}
});

router.post('/new', function (req, res){
	var user = req.session.user;
	var name  = req.body.name;
	var nodes = JSON.parse(req.body.nodes);
	for(var i=0; i<nodes.length; i++){
		nodes[i] = parseInt(nodes[i]);
	}
	var playlist = db.new_playlist(user.uid, name, nodes);
	playlist.then( function (resolve){
	 	console.log('good');
	 },
	 function (error){
	 	console.log(error);
	 });
});

module.exports = router;