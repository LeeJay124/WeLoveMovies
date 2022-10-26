const knex = require("../db/connection");

function list(){
    return knex("reviews").select("*");
}
function reviewsForMovie(movieId){
    return knex
    .select("*")
    .from("reviews")
    .join("critics", "critics.critic_id", "=", "reviews.critic_id")
    .where({"reviews.movie_id": movieId});
}


module.exports = {
    list, reviewsForMovie,
}