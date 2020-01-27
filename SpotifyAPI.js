const Spotify = require("node-spotify-api");

const spotifySearch3 = async (str) => {
    const data =await spotifySearch3.search({ type:'track', query:str})
    let artist =(data.tracks.items[0].artists.name)
}
spotifySearch3("Hotel California")



