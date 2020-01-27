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
        let userInput = response.userInput;

        switch (userChoice) {
            case "Movie":
                if (userInput != "") {
                    getMovie(userInput);
                    console.log(response);
                } else getMovie("Transformers"); //Default movie

                break;

            case "Song":
                if (userInput = "") {
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






//Spotify API call to the endpoint

// const getSong = str => {

// }
//Return data and write it in a

//API call to OMBD

var getMovie = (str) => {

    let url = "http://www.omdbapi.com/?apikey=trilogy&t=" + str;
    console.log(url);
    // let url = 'http://img.omdbapi.com/?apikey=4f53e692&t=${str}';
    // let url = `http://img.omdbapi.com/?apikey=4f53e692&t=${str}`;
    axios
        .get(url)
        .then((response) => {
            console.log(response.data.Title);
        
        },
            (error) => {
                console.log(error);
            });

};

var getSong = (str)=> {
    var spotify = new Spotify({
        id:"625bbe361130488db88e6dc369d02114",
        secret: "c508605df74c4d64be80c4546ddb3348"
      });
       
      spotify
      .search({ type: 'track', query: str })
      .then(function(response) {
        console.log(response.items);
      })
      .catch(function(err) {
        console.log(err);
      });
}
