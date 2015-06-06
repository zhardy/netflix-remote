var db = require('./lib/dbAccess.js');


var test = db.test('test');
test.then( function (resolve){
	console.log(resolve[0].playid);
},

function (reject){
	console.log('eggs');
});