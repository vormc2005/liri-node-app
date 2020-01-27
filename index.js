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



    ])
    //-----------------End of rpompts for user choices-------------------////
    .then(function (response) {
        switch (userChoice) {
            case "Movie":
                if (userInput != "") {
                    getMovie(userInput);
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
    });






//Spotify API call to the endpoint

const getSong = str => {

}
//Return data and write it in a

//API call to OMBD

var getMovie = str => {

    let url = "http://img.omdbapi.com/?apikey=4f53e692&t=${str}"
    axios
        .get(url)
        .then((response) => {
            console.log(response);
        },
            (error) => {
                console.log(error);
            });

};
