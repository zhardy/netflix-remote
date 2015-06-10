var squel = require('squel');
squel = squel.useFlavour('postgres');

var password = "j'; DROP TABLE users;";
var uid = 1; 

var sq = squel.insert()
									.into('users')
									.set('username', 'z')
									.returning('uid').toString();
console.log(sq);