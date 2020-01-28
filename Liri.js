//Get all of the packages runnung
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
// const keyFile = require("./key.js");
// require('dotenv').config(); // hide spotify keys

//Global variables go here////////////
let userChoice; //user category input, see prompt
let userInput; //user search input, see prompt
let todaysDate = moment().format("YYYY-MM-DD"); //Todays date for concert search

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

    let url = "http://www.omdbapi.com/?apikey=trilogy&t=" + str;
    console.log(url);
    // let url = 'http://img.omdbapi.com/?apikey=4f53e692&t=${str}';
    // let url = `http://img.omdbapi.com/?apikey=4f53e692&t=${str}`;
    axios
        .get(url)
        .then((response) => {
            console.log(response);
        
        },
            (error) => {
                console.log(error);
            });

};


// Spotify API
var getSong = (str)=> {
    var spotify = new Spotify({
        id:"625bbe361130488db88e6dc369d02114",
        secret: "c508605df74c4d64be80c4546ddb3348"
      });
       
      spotify
      .search({ type: 'track', query: str })
      .then(function(response) {
        // console.log(response.);
        console.log(response.tracks.items[0].name)
        console.log(response.tracks.items[0].album.artists[0].name)
        // console.log(response.tracks)//need to work on this one
      })
      .catch(function(err) {
        console.log(err);
      });


      //Bands in town API


     const getConcert = (str) => {
         let endDate =  moment().add(15,'days').format('YYYY-MM-DD')// to add 15 days to current date..
        let url = `https://rest.bandsintown.com/artists/${str}/events?app_id=81b0bfbbc09c1d598267b30e8fdf3514`;
        
        axios
        .get(url)
        .then((response) => {
            console.log(response);
        
        },
            (error) => {
                console.log(error);
            });

     } 
}
