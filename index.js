//Get all of the packages runnung
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const keyFile = require("./key.js");
require('dotenv').config(); // hide spotify keys

//Global variables go here////////////
let userChoice; //user category input, see prompt
let userInput; //user search input, see prompt


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
]);
//-----------------End of rpompts for user choices-------------------////

//Switch statement goes here

switch (cmd) {

    case 'Song':
        //write api call here for spotify

        break;

    case 'Movie':
        //Write api comand here for OMBD
        getMovie(userInput);

        break;

    case 'Concert':
    //write api call for Bands in town here


}




//Run appropriate API

//Spotify API call to the endpoint

// var spotify = new Spotify({
//     id: process.env.spotify_key,
//     secret: spotufy_secret
//   });
   
//   spotify
//     .search({ type: 'track', query: 'All the Small Things' })
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });



//Return data and write it in a

//API call to OMBD

const getMovie = (query) => {
    axios

        .get('http://www.omdbapi.com/?apikey=${process.env.ombd_key}&t=${query}')
        .then(response =>{
            console.log(reponse)
        })
        };
