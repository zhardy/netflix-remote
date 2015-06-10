/*
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Note for users: Using this script to scrape Netflix is probably a violation of their terms of use.
Note for Netflix: Please reopen your API! Something something something.
*/


// http://www.netflix.com/api/shakti/44fa70f2/wigenre?genreId=83&full=true&from=0&to=703&secure=false&authURL=1429376613685.NbwWX%2F0vcvC5LsIOWpUkj3VqqOc%3D&_retry=0&_=1429376615238 (tv shows)

// dependencies
var fs = require("fs");
var cheerio = require("cheerio");
var sp = require('superagent');
var	request = require('request').defaults({
		maxRedirects:20,
		jar: true
	});

sqlite = require("sqlite3");

// create the database and table for storing categories
var db = new sqlite.Database("netflix.sqlite");
var zack= "is great";
db.run("CREATE TABLE IF NOT EXISTS categories (urlID INTEGER PRIMARY KEY, title TEXT, movies INTEGER)");


// you need to provide your login credentials when you run the script, like so:
// node scrape.js my.email@example.com fluffy1 

var LOGIN = process.argv[2],
	PASSWORD = process.argv[3];

if (!LOGIN || !PASSWORD) {
	console.log("Please include your email and password");
	return;
}

var BASE = "http://movies.netflix.com/WiGenre?agid=$id";

function login(email, password, callback) {
	// POST data we're going to send to Netflix to log in
	var data = {
		email: email,
		password: password
	}

	console.log("Logging in to Netflix with your info...");


	// We need an authorization code from the source of the login page before proceding
	request("https://signup.netflix.com/Login", function(err, resp, body) {

	// request
	// 	.get('http://www.netflix.com/WiMovie/$mvID?actionMethod=seasonDetails&seasonId=$sID')
	// 	.end(function (err, result){
	// 		if(err){
	// 			console.log(err);
	// 		}
	// 		else{
	// 			console.log(result);
	// 		}
	// 	});
		// cheerio parses the raw HTML of the response into a jQuery-like object for easy parsing
		// var $ = cheerio.load(body);

		// // we're specifically looking for an ID on the page we need to log in, which looks like this: 
		// // <input type="hidden" name="authURL" value="1388775312720.+vRSN6us+IhZ1qOSlo8CyAS/ZJ4=">
		// data.authURL = $("input[name='authURL']").attr("value");

		// request.post("https://signup.netflix.com/Login", { form: data }, function(err, resp, body) {
		// 	if (err) { throw err; }
		// 	console.log("Successfully logged in.");

		// 	// when you first log in, NF prompts you to use the default profile or create a new one
		// 	// this function gets us through that interstitial page
		// 	getProfileCookie(function() {
		// 		// for (var c = 0; c < 100000; c += 1) {
		// 			getGenre(2);
		// 		// }
		// 	});
		// });
	});
}

// merely asking for the same URL twice seems to set this cookie
function getProfileCookie(callback) {
	request(BASE.replace("$id", 0), function(err, response, body) {
		if (err) throw err;

		request(BASE.replace("$id", 0), function(err, response, body) {
			if (err) throw err;
			callback();
		});
	});
}

function getGenre(id) {
	request(BASE.replace("$id", id), function(err, response, body) {
		if (err) throw err;



		 $ = cheerio.load(body);

		// //uncomment if you want to cache the HTML responses. Make sure you make and set the cache directory
		// //fs.writeFileSync("cache/" + id + ".html", body);

		 var title = $(".boxart").attr('alt');
		 var link  = $('.playHover');
		 console.log(link[0].attribs.href);
		 
		// 	// may fail on pagination, not certain
		// 	movies = $(".playHover href").length;

		// // db.run("INSERT OR IGNORE INTO categories (urlID, title, movies) VALUES (?, ?, ?)", [id, title, movies]);
		// console.log(id, title, movies);
	});
}


all(LOGIN, PASSWORD);
// tv(LOGIN, PASSWORD);