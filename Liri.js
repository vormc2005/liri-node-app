//Get all of the packages runnung
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const keys = require("./keys");
require('dotenv').config(); // hide spotify keys

//Global variables go here////////////
let userChoice; //user category input, see prompt
let userInput; //user search input, see prompt
let todaysDate = moment().format("YYYY-MM-DD"); //Todays date for concert search

console.log(process.env)

//1. Capture request and create a switch statemnt

inquirer
    .prompt([   //list of choices for the user
        {
            type: "list",
            message: "Pease choose catgory for you search",
            name: "userChoice",
            choices: ["Song", "Movie", "Concert"]
        },

        {
            type: "input",
            message: "Please type what are you looking for",
            name: "userInput",


        }
    ])
    //-----------------End of rpompts for user choices-------------------////
    .then(function (response) {

        console.log(response.userChoice);
        console.log(response.userInput);
        let userChoice = response.userChoice;
        let userInput = response.userInput.toLowerCase();

        switch (userChoice) {
            case "Movie":
                if (userInput != "") {
                    getMovie(userInput);
                    console.log(response);
                } else getMovie("Transformers"); //Default movie

                break;

            case "Song":
                if (userInput != "") {
                    getSong(userInput);

                } else getSong("Hotel California");// Default song

                break;

            case "Concert":
                if (userInput != "") {
                    getConcert(userInput);
                } else getConcert("Ramstein"); //Default Concert


        }
        // console.log(response)
    });




//API call to OMBD

var getMovie = (str) => {

    // let url = "http://www.omdbapi.com/?apikey=4f53e692&t=" + str;
    // let url = "http://www.omdbapi.com/"+process.env.OMDB_apikey+"=" + str;

    let url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_apikey}&t=${str}`
    // console.log(url);
    // let url = `http://img.omdbapi.com/?apikey=${process.env.OMDB_apikey}&t=${str}`;
    axios
        .get(url)
        .then((response) => {

            //Logging responses to a console//
            // console.log(response);
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.Rated);
            console.log("Rotten tomatoes value: " + response.data.Ratings[1].Value);
            console.log("Actors: " + response.data.Actors);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);

 // Creating array to be pushed to a log.txt
            var moviearr = ["Title: " + response.data.Title, "Year: " + response.data.Year, "Year: " + response.data.Rated, "Rotten tomatoes value: " + response.data.Ratings[1].Value, "Actors: " + response.data.Actors, "Country: " + response.data.Country, "Language: " + response.data.Language, "Plot: " + response.data.Plot]

 //Write answer to a text file//
            // fs.writeFile("log.txt", "Title: " + response.data.Title,  function(err) {
            //     if (err) {
            //       return console.log(err);
            //     }              
            //     console.log("Success!");gi              
            //   });   

            fs.writeFile("log.txt", moviearr, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("See log.txt");
            });

        },
            (error) => {
                console.log(error);
            });



};


// Spotify API call/////////////////
var getSong = (str) => {
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotify
        .search({ type: 'track', query: str })
        .then(function (response) {


 //logging information to a console//

            // console.log(response.tracks.items[0]);
            console.log("Song name: " + response.tracks.items[0].name)
            console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
            console.log("Follow the link to listen: " + response.tracks.items[0].external_urls.spotify);
            console.log("Album name: " + response.tracks.items[0].album.name);
 //Creaqting array with song information// 
            var songarr = ["Song name: " + response.tracks.items[0].name, "Artist: " + response.tracks.items[0].album.artists[0].name, "Follow the link to listen: " + response.tracks.items[0].external_urls.spotify, "Album name: " + response.tracks.items[0].album.name];

  //Writing information to a text file//
            fs.writeFile("log.txt", songarr, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("See log.txt");
            });


        })
        .catch(function (err) {
            console.log(err);
        });


    //Bands in town API
}

const getConcert = (str) => {
    //  let endDate =  moment().add(15,'days').format('YYYY-MM-DD')// to add 15 days to current date..
    let Url = `https://rest.bandsintown.com/artists/${str}/events?app_id=${process.env.API_ID}`;

    axios
        .get(Url)
        .then((response) => {
            // console.log(response);
            console.log(`Venue: ${response.data[0].venue.name}`);
            console.log(`Venue location:  ${response.data[0].venue.city}, ${response.data[0].venue.country}`);
            console.log(`Date of the soonest concert: ${response.data[0].datetime}`)
//Creating array with concert information///
            var concertarr = [`Venue: ${response.data[0].venue.name}`, `Venue location:  ${response.data[0].venue.city}, ${response.data[0].venue.country}`, `Date of the soonest concert: ${response.data[0].datetime}`]
//Writing data to a log.txt///
            fs.writeFile("log.txt", concertarr, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("See log.txt");
            });

        },
            (error) => {
                console.log(error);
            });

}


//ENd of Code//