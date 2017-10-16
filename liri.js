//Grab data from keys.js
var keys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter (keys.twitterKeys);
var Spotify = require('node-spotify-api');
var song = new Spotify (keys.spotifyKeys);
var request = require('request');
var fs = require('fs');

//Stored arguments' array
var nodeArgv = process.argv
var command = process.argv[2];

// Movie or song with more than one word titles
var x = "";

for (var i=3; i<nodeArgv.length; i++){
	if(i>3 && i<nodeArgv.length){
		x = x + "+" + nodeArgv[i];
	} else{
		x = x + nodeArgv[i];
	}
}

function searchBy(){
//Swith case 
switch (command){
	case "my-tweets":
	tweet();
	break;

	case "spotify-this-song":
	spotify ();
	break;

	case "movie-this":
	movie();
	break;

	case "do-what-it-says":
	doWhat();
	break
	}
}

//Twitter Function
function tweet () { 

	//Pull tweets from twitter account ersing_n
	var params = {screen_name: 'ersing_n'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	// if (!error) {
  	for (var i = 0; i < tweets.length; i++){
  				var texts = tweets[i].text;
  				var create = tweets[i].created_at;

  				console.log("@ersing_n: " + texts);
  				console.log("Created: " + create);
  				console.log("------------------------------------------");
  			}
  				//append tweets to file
  				fs.appendFile('log.txt', "@ersing_n: " + texts, (err)=>{if (err) throw err;});
  				fs.appendFile('log.txt', "Created: " + create, (err)=>{if (err) throw err;});
	  });
}


//Spotify function 
function spotify () {

	if(x === ""){
		x = "The Sign by Ace of Base";
	}

//Searching for the song entered by the user
song.search({type: 'track', query: x, limit: 1}, function(error, data){
	if (error) {
		return console.log('Error occurred: ' + error);
	}
	  if (x) {
// console.log(JSON.stringify(data, null, 2));
		//Pulling data from the song object to display in terminal
		var person = data.tracks.items[0].album.artists[0].name;
		var songName = data.tracks.items[0].name;
		var previewSong = data.tracks.items[0].preview_url;
		var album = data.tracks.items[0].album.name;
       }

      	//Output on Terminal the results
		console.log("\nArtist: " + person);
		console.log("\nSong Title: " + songName);
		console.log("\nPreview the Song: " + previewSong);
		console.log("\nAlbum Title: " + album);

		//append information to log.txt file
		fs.appendFile('log.txt', "Artist: " + person, (err)=>{if (err) throw err;});
		fs.appendFile('log.txt', "Song Title: " + songName, (err)=>{if (err) throw err;});
		fs.appendFile('log.txt', "Preview the Song: " + previewSong, (err)=>{if (err) throw err;});
		fs.appendFile('log.txt', "Album Title: " + album, (err)=>{if (err) throw err;});
		

   })	
}



// Movie Function
function movie () {

if (x === ""){
		x = "Mr. Nobody";
	}
	// Search url variable
	var queryURL = "http://www.omdbapi.com/?t=" + x + "&y=&plot=short&apikey=40e9cece";

	request(queryURL, function(error, response, body) {

   		if (!error && response.statusCode === 200) {
     //Output of movie title from user unput into the terminal window 
     // console.log(JSON.parse(body, null, 2));
		 if (x){ 	
			console.log("\nTitle of the movie: " + JSON.parse(body).Title);
			console.log("\nYear the movie came out: " + JSON.parse(body).Year);
			console.log("\nIMBD Rating of the movie: " + JSON.parse(body).imdbRating);
			console.log("\nRotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
			console.log("\nCountry where the movie was produced: " + JSON.parse(body).Country);
			console.log("\nLanguage of the movie: " + JSON.parse(body).Language);
			console.log("\nPlot of the movie: " + JSON.parse(body).Plot);
			console.log("\nActors in the movie: " + JSON.parse(body).Actors);

			}
			//append information to log.txt file
			fs.appendFile('log.txt', "Title of the movie: " + JSON.parse(body).Title, (err)=>{if (err) throw err;});
			fs.appendFile('log.txt', "Year the movie came out: " + JSON.parse(body).Year, (err)=>{if (err) throw err;});
			fs.appendFile('log.txt', "IMBD Rating of the movie: " + JSON.parse(body).imdbRating, (err)=>{if (err) throw err;});
			fs.appendFile('log.txt', "Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value, (err)=>{if (err) throw err;});
			fs.appendFile('log.txt', "Country where the movie was produced: " + JSON.parse(body).Country, (err)=>{if (err) throw err;});
			fs.appendFile('log.txt', "Language of the movie: " + JSON.parse(body).Language, (err)=>{if (err) throw err;});
			fs.appendFile('log.txt', "Plot of the movie: " + JSON.parse(body).Plot, (err)=>{if (err) throw err;});
			fs.appendFile('log.txt', "Actors in the movie: " + JSON.parse(body).Actors, (err)=>{if (err) throw err;});
 	   }
  });
}


//Do-what-it-says function
function doWhat(){

	fs.readFile("random.txt", "utf8", function(error, data){
		var txt = data.split(',');

		command = txt[0]
		x = txt[1]
		console.log(command)
		searchBy(x)
	})	
}

searchBy()





