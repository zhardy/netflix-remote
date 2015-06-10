var squel = require('squel');
squel = squel.useFlavour('postgres');

var password = "j'; DROP TABLE users;";
var uid = 1; 

var sq = squel.select()
				.from('playlists', 'P')
				.from('userplaylists', 'Z')
				.from('users', 'U')
				.field('P.name')
				.field('P.playID')
				.where('U.uid = Z.uid')
				.where('P.playID = Z.playID')
				.where('U.uid=?', uid).toString();
console.log(sq);