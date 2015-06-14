var express = require('express');
var router = express.Router();
var db = require('../lib/index.js');

router.get('/', function (req, res){
	var user = req.session.user;
	if (user){
		var playlists = db.playlists(user.uid);
		playlists.then( function (data){
			
			res.send({playlists : data});
		},
		function (reject){
			res.send({error : reject});
		});
	}
	else{
		res.send({error: "You are not logged in!"});
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
	 	console.log(resolve);
	 },
	 function (error){
	 	console.log(error);
	 });
});

module.exports = router;