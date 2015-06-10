var db = require('./netflix-remote-website/lib/index.js');

var testing = [{title: "50 First Dates", link:'http://www.netflix.com/WiPlayer?movieid=60033311'},
				{title: 'Annie Hall', link: 'http://www.netflix.com/WiPlayer?movieid=261909'},
				{title:"Groundhog Day", link:'http://www.netflix.com/WiPlayer?movieid=563104'},
				{title:"The Graduate", link:'http://www.netflix.com/WiPlayer?movieid=555221'}];


db.put_movies(testing).then(function (result){
	console.log(result);
	process.exit()
}, function (error){
	console.log(error);
});