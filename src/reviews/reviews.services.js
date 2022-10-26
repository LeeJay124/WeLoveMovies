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

function read(reviewId){
    return knex("reviews")
    .select("*")
    .where({review_id:reviewId})
    .first();
}

function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview, ["content", "score"])
    .then((data)=> data[0]);
}
function destroy(review_id){
    return knex("reviews").where({review_id}).del();
}

module.exports = {
    list, reviewsForMovie, delete:destroy,
    read, update
}