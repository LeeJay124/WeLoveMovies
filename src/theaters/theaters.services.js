const knex = require("../db/connection");


//Knex query to list theaters with movie content
function list(){
    return knex("theaters").select("theaters.*", "movies.title", "movies.rating", "movies.runtime_in_minutes")
    .join("movies_theaters", "movies_theaters.theater_id", "=", "theaters.theater_id")
    .join("movies", "movies.movie_id", "=", "movies_theaters.movie_id");
}
//Knex query to list theaters for a specific movie using movide id provided
function theatersForMovie(movieId){
    return knex
    .select("*")
    .from("movies_theaters")
    .join("theaters", "theaters.theater_id", "=", "movies_theaters.theater_id")
    .where({"movies_theaters.movie_id":movieId});
}


module.exports = {
    list, theatersForMovie
}