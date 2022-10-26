const knex = require("../db/connection");

function list(){
    return knex("theaters").select("*");
}

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